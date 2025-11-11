'use client';

import { useGetHubsWithPagination } from '@/services/hub.service';
import PinIcon from '../../../icons/pin-circle.svg';
import { useMemo, useState } from 'react';
import { groupHubsByRegion } from '../../../store/dailyEventIdsWithHubsAtom';
import { ID_TO_REGION, REGION_TO_ID } from '@/constants/regions';
import { EventFormValues } from '../../../form.type';
import { useFormContext } from 'react-hook-form';
import { RegionHubsResponseModel } from '@/types/hub.type';
import { useGetDemandStats } from '@/services/demand.service';
import { eventAtom } from '../../../store/eventAtom';
import { useAtomValue } from 'jotai';
import SadFaceIcon from '../../../icons/sad-face.svg';

interface Props {
  toNextStep: () => void;
  setDemandCount: (count: number) => void;
}

const DemandHubsStep = ({ toNextStep, setDemandCount }: Props) => {
  const event = useAtomValue(eventAtom);
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
    setDemandCount(currentDemandCount + 1);
    toNextStep();
  };

  return (
    <section>
      <div>
        {gungusWithHubs.map((gunguWithHubs, index) => {
          const regionId = REGION_TO_ID?.[prioritySido]?.[gunguWithHubs.gungu];
          if (!regionId || !event) {
            return null;
          }
          return (
            <article key={gunguWithHubs.gungu}>
              <div className="mb-4 flex h-[26px] items-center gap-[2px]">
                <h6 className="text-14 font-600 leading-[160%] text-basic-grey-700">
                  {gunguWithHubs.gungu}
                </h6>
              </div>
              <ul className="flex flex-col gap-12 scrollbar-hidden">
                {gunguWithHubs.hubs.map((hub) => (
                  <button
                    key={hub.regionHubId}
                    onClick={() =>
                      handleHubClick(hub, gunguWithHubs.demandCount)
                    }
                    type="button"
                    className="group flex h-[55px] w-full items-center gap-[6px] rounded-[8px] border border-basic-grey-200 px-12 py-[14px] text-left"
                  >
                    <PinIcon />
                    <span className="block min-w-0 flex-1 overflow-x-auto whitespace-nowrap text-16 font-600 text-basic-grey-700 scrollbar-hidden group-disabled:text-basic-grey-300">
                      {hub.name}
                    </span>
                  </button>
                ))}
              </ul>
              {index !== gungusWithHubs.length - 1 && <div className="h-24" />}
            </article>
          );
        })}
      </div>
      {isLoading && (
        <div
          className={`${gungusWithHubs.length === 0 ? 'h-[455px]' : 'h-[340px]'}`}
        />
      )}
      {!isLoading && gungusWithHubs.length === 0 && <EmptyView />}
    </section>
  );
};

export default DemandHubsStep;

const EmptyView = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 py-16">
      <SadFaceIcon />
      <p className="text-14 font-600 text-basic-grey-500">
        아쉽게도 이 지역은 참여가 어려워요.
      </p>
    </div>
  );
};
