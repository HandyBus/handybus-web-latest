'use client';

import { useGetHubsWithPagination } from '@/services/hub.service';
import PinIcon from '../../../icons/pin-small.svg';
import { useMemo, useState } from 'react';
import { groupHubsByRegion } from '../../../store/dailyEventIdsWithHubsAtom';
import { ID_TO_REGION, REGION_TO_ID } from '@/constants/regions';
import { EventFormValues } from '../../../form.type';
import { useFormContext } from 'react-hook-form';
import { RegionHubsResponseModel } from '@/types/hub.type';
import { useGetDemandStats } from '@/services/demand.service';
import { eventAtom } from '../../../store/eventAtom';
import { useAtomValue } from 'jotai';
import {
  checkIsUserDemandAvailableInRegion,
  userDemandsAtom,
} from '../../../store/userDemandsAtom';
import {
  getRecentlyViewedHubId,
  setRecentlyViewedHubId,
} from '@/utils/localStorage';
import SadFaceIcon from '../../../icons/sad-face.svg';

interface Props {
  toNextStep: () => void;
  setDemandCount: (count: number) => void;
}

const DemandHubsStep = ({ toNextStep, setDemandCount }: Props) => {
  const event = useAtomValue(eventAtom);
  const userDemands = useAtomValue(userDemandsAtom);
  const { getValues, setValue } = useFormContext<EventFormValues>();
  const [dailyEvent, sido, openSido] = getValues([
    'dailyEvent',
    'sido',
    'openSido',
  ]);
  const enabled = !!sido && !!event?.eventId && !!dailyEvent.dailyEventId;
  const prioritySido = openSido ?? sido;

  const { data: regionsWithHubsPages } = useGetHubsWithPagination(
    {
      usageType: 'SHUTTLE_HUB',
      provinceFullName: prioritySido,
    },
    { enabled },
  );

  const { data: demandStats } = useGetDemandStats(
    {
      groupBy: 'CITY',
      eventId: event?.eventId,
      dailyEventId: dailyEvent.dailyEventId,
      provinceFullName: prioritySido,
    },
    { enabled },
  );

  const [isLoading, setIsLoading] = useState(true);
  const gungusWithHubs = useMemo(() => {
    const hubs = regionsWithHubsPages?.pages?.[0]?.regionHubs;
    if (!hubs || !demandStats) {
      return [];
    }
    setIsLoading(false);
    const hubsWithRegion = hubs.map((hub) => {
      const hubRegion = ID_TO_REGION[hub.regionId];
      return {
        ...hub,
        sido: hubRegion.bigRegion,
        gungu: hubRegion.smallRegion,
      };
    });
    const groupedHubs = groupHubsByRegion(hubsWithRegion);
    const gungusWithHubs = groupedHubs?.[prioritySido] ?? [];
    const gungusWithFlattenedHubs = Object.entries(gungusWithHubs)
      .map(([gungu, hubs]) => {
        return {
          gungu,
          hubs: hubs.flat().toSorted((a, b) => a.name.localeCompare(b.name)),
        };
      })
      .toSorted((a, b) => a.gungu.localeCompare(b.gungu));
    const gungusWithDemandStats = gungusWithFlattenedHubs.map((gungu) => {
      const demandStat = demandStats.find(
        (stat) => stat.cityFullName === gungu.gungu,
      );
      return {
        ...gungu,
        demandCount: demandStat?.totalCount ?? 0,
      };
    });
    return gungusWithDemandStats;
  }, [regionsWithHubsPages, demandStats, prioritySido]);

  const handleHubClick = (
    hub: RegionHubsResponseModel,
    currentDemandCount: number,
  ) => {
    setValue('selectedHubForDemand', hub);
    setRecentlyViewedHubId(hub.regionHubId);
    setDemandCount(currentDemandCount + 1);
    toNextStep();
  };

  const recentlyViewedHubId = getRecentlyViewedHubId();
  const recentlyViewedHub = useMemo(() => {
    if (!recentlyViewedHubId || !demandStats) {
      return null;
    }
    const hub = regionsWithHubsPages?.pages?.[0]?.regionHubs.find(
      (hub) => hub.regionHubId === recentlyViewedHubId,
    );
    if (!hub) {
      return null;
    }

    const gunguOfHub = ID_TO_REGION[hub.regionId].bigRegion;
    const demandStat = demandStats.find(
      (stat) => stat.cityFullName === gunguOfHub,
    );

    return { ...hub, demandCount: demandStat?.totalCount ?? 0 };
  }, [regionsWithHubsPages, recentlyViewedHubId, demandStats]);

  const isUserDemandAvailableForRecentlyViewedHub = useMemo(() => {
    if (!recentlyViewedHub || !event) {
      return false;
    }
    return checkIsUserDemandAvailableInRegion(userDemands, {
      eventId: event.eventId,
      dailyEventId: dailyEvent.dailyEventId,
      regionId: recentlyViewedHub.regionId,
    });
  }, [recentlyViewedHub, event, dailyEvent, userDemands]);

  return (
    <section>
      {recentlyViewedHub && (
        <button
          key={recentlyViewedHub.regionHubId}
          onClick={() => handleHubClick(recentlyViewedHub, recentlyViewedHub.demandCount)}
          disabled={isUserDemandAvailableForRecentlyViewedHub}
          type="button"
          className="group mb-16 flex h-[55px] w-full items-center gap-8 rounded-[12px] border border-basic-grey-100 px-16 py-12"
        >
          <div className="whitespace-nowrap rounded-[10px] bg-basic-grey-50 px-8 py-4 text-10 font-600 leading-[160%] text-basic-grey-700">
            최근 기록
          </div>
          <span className="text-16 font-600 text-basic-grey-700 group-disabled:text-basic-grey-300">
            {recentlyViewedHub.name}
          </span>
        </button>
      )}
      <div>
        {gungusWithHubs.map((gunguWithHubs, index) => {
          const regionId = REGION_TO_ID?.[prioritySido]?.[gunguWithHubs.gungu];
          if (!regionId || !event) {
            return null;
          }
          const isUserDemandAvailable = checkIsUserDemandAvailableInRegion(
            userDemands,
            {
              eventId: event.eventId,
              dailyEventId: dailyEvent.dailyEventId,
              regionId,
            },
          );
          return (
            <article key={gunguWithHubs.gungu}>
              <div className="mb-4 flex h-[26px] items-center gap-[2px]">
                <PinIcon />
                <h6 className="text-14 font-600 text-basic-grey-400">
                  {gunguWithHubs.gungu}
                </h6>
                <p className="ml-auto text-14 font-500">
                  {isUserDemandAvailable ? (
                    <span className="text-basic-red-400">
                      이미 요청한 지역이에요
                    </span>
                  ) : (
                    <span
                      className={`${
                        gunguWithHubs.demandCount > 0
                          ? 'text-brand-primary-400'
                          : 'text-basic-grey-500'
                      }`}
                    >
                      {/* {gunguWithHubs.demandCount}명이 요청했어요 */}
                    </span>
                  )}
                </p>
              </div>
              <ul className="flex flex-col gap-8 scrollbar-hidden">
                {gunguWithHubs.hubs.map((hub) => (
                  <button
                    key={hub.regionHubId}
                    onClick={() =>
                      handleHubClick(hub, gunguWithHubs.demandCount)
                    }
                    disabled={isUserDemandAvailable}
                    type="button"
                    className="group flex h-[55px] w-full items-center justify-between gap-8 py-12"
                  >
                    <span className="text-16 font-600 text-basic-grey-700 group-disabled:text-basic-grey-300">
                      {hub.name}
                    </span>
                  </button>
                ))}
              </ul>
              {index !== gungusWithHubs.length - 1 && (
                <div className="my-12 h-[1px] w-full bg-basic-grey-100" />
              )}
            </article>
          );
        })}
      </div>
      {isLoading && <div className="h-340" />}
      {!isLoading && gungusWithHubs.length === 0 && <EmptyView />}
    </section>
  );
};

export default DemandHubsStep;

const EmptyView = () => {
  return (
    <div className="w-fll flex flex-col items-center justify-center gap-8 py-16">
      <SadFaceIcon />
      <p className="text-14 font-600 text-basic-grey-500">
        아쉽게도 이 지역은 참여가 어려워요.
      </p>
    </div>
  );
};
