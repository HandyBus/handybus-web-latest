'use client';

import Button from '@/components/buttons/button/Button';
import PinIcon from '../../../icons/pin-circle.svg';
import Tooltip from '@/components/tooltip/Tooltip';
import RequestSeatAlarmButton from '../components/RequestSeatAlarmButton';
import { DANGER_SEAT_THRESHOLD } from '../../../form.const';
import { useAtomValue, useSetAtom } from 'jotai';
import { useFormContext } from 'react-hook-form';
import { useMemo } from 'react';
import { checkIsSoldOut, getPriorityRemainingSeat } from '@/utils/event.util';
import { EventFormValues } from '../../../form.type';
import {
  dailyEventIdsWithHubsAtom,
  getRouteOfHubWithInfo,
  HubWithInfo,
} from '../../../store/dailyEventIdsWithHubsAtom';
import {
  getRecentlyViewedHubId,
  setRecentlyViewedHubId,
} from '@/utils/localStorage';
import {
  isCheckRouteDetailViewFlowAtom,
  selectedHubWithInfoForDetailViewAtom,
} from '../../../store/selectedHubWithInfoForDetailViewAtom';
import { HANDY_PARTY_PREFIX } from '@/constants/common';
import { dailyEventIdsWithRoutesAtom } from '../../../store/dailyEventIdsWithRoutesAtom';
import { ShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';
import { dateString } from '@/utils/dateString.util';

interface Props {
  toReservationTripTypeStep: () => void;
  toExtraDuplicateHubStep: () => void;
  toExtraSeatAlarmStep: () => void;
  toDemandHubsStep: () => void;
  closeBottomSheet: () => void;
}

const ReservationHubsStep = ({
  toReservationTripTypeStep,
  toExtraDuplicateHubStep,
  toExtraSeatAlarmStep,
  toDemandHubsStep,
  closeBottomSheet,
}: Props) => {
  const { getValues, setValue } = useFormContext<EventFormValues>();
  const dailyEventIdsWithHubs = useAtomValue(dailyEventIdsWithHubsAtom);
  const [dailyEvent, sido, openSido] = getValues([
    'dailyEvent',
    'sido',
    'openSido',
  ]);
  const dailyEventIdsWithRoutes = useAtomValue(dailyEventIdsWithRoutesAtom);
  const gungusWithHubs = useMemo(() => {
    const prioritySido = openSido ?? sido;
    const gungusWithHubsAsObject =
      dailyEventIdsWithHubs?.[dailyEvent.dailyEventId]?.[prioritySido] ?? {};

    const gungusWithFilteredHubsAsArray = Object.entries(gungusWithHubsAsObject)
      .map(([gungu, hubs]) => {
        // 핸디팟 노선 제외
        const filteredHubs = hubs.filter((hubsOfRoute) =>
          hubsOfRoute.some((hub) => !hub.name.includes(HANDY_PARTY_PREFIX)),
        );
        const sortedHubs = filteredHubs.sort((a, b) =>
          a[0].name.localeCompare(b[0].name),
        );
        return {
          gungu,
          hubs: sortedHubs,
        };
      })
      .sort((a, b) => a.gungu.localeCompare(b.gungu));

    // 정류장이 존재하지 않는 시군구 제거
    const filteredGungusWithHubsAsArray = gungusWithFilteredHubsAsArray.filter(
      (gunguWithHubs) => gunguWithHubs.hubs.length > 0,
    );
    return filteredGungusWithHubsAsArray;
  }, [dailyEventIdsWithHubs]);

  const setSelectedHubWithInfoForDetailViewAtom = useSetAtom(
    selectedHubWithInfoForDetailViewAtom,
  );
  const isCheckRouteDetailViewFlow = useAtomValue(
    isCheckRouteDetailViewFlowAtom,
  );

  const handleHubClick = (hubsWithInfo: HubWithInfo[]) => {
    setRecentlyViewedHubId(hubsWithInfo[0].regionHubId);
    if (hubsWithInfo.length === 1) {
      setValue('selectedHubWithInfo', hubsWithInfo[0]);
      setValue('hubsWithInfoForDuplicates', undefined);
      setSelectedHubWithInfoForDetailViewAtom({
        hubWithInfo: hubsWithInfo[0],
        dailyEvent,
      });

      if (!isCheckRouteDetailViewFlow) {
        toReservationTripTypeStep();
        return;
      }

      closeBottomSheet();
    } else {
      setValue('hubsWithInfoForDuplicates', hubsWithInfo);
      toExtraDuplicateHubStep();
    }
  };

  const recentlyViewedHubId = getRecentlyViewedHubId();
  const recentlyViewedPossibleHubs = useMemo(() => {
    return gungusWithHubs
      .flatMap((gunguWithHubs) => gunguWithHubs.hubs)
      .find((hubs) =>
        hubs.some((hub) => hub.regionHubId === recentlyViewedHubId),
      );
  }, [gungusWithHubs, recentlyViewedHubId]);

  const isDemandPossible = dailyEvent.status === 'OPEN';

  const recentlyViewedRoute = useMemo(() => {
    if (!recentlyViewedPossibleHubs) return;
    return getRouteOfHubWithInfo({
      hubWithInfo: recentlyViewedPossibleHubs[0],
      dailyEventIdsWithRoutes,
      dailyEventId: dailyEvent.dailyEventId,
    });
  }, [recentlyViewedPossibleHubs, dailyEventIdsWithRoutes, dailyEvent]);

  return (
    <section>
      {!1 && recentlyViewedPossibleHubs && recentlyViewedRoute && (
        <>
          <div className="flex flex-col gap-12 pt-4">
            <p className="text-14 font-600 text-basic-grey-700">
              최근에 본 정류장
            </p>
            <Hub
              possibleHubs={recentlyViewedPossibleHubs}
              handleHubClick={() => handleHubClick(recentlyViewedPossibleHubs)}
              toExtraSeatAlarmStep={toExtraSeatAlarmStep}
              route={recentlyViewedRoute}
            />
          </div>
          <div className="my-24 h-[1px] w-full bg-basic-grey-100" />
        </>
      )}
      <div className="flex flex-col gap-24">
        {gungusWithHubs.map((gunguWithHubs) => (
          <article key={gunguWithHubs.gungu}>
            <div className="mb-12 flex items-center">
              <h6 className="text-14 font-600 text-basic-grey-700">
                {gunguWithHubs.gungu}
              </h6>
            </div>
            <ul className="flex flex-col gap-12">
              {gunguWithHubs.hubs.map((possibleHubs) => {
                const route = getRouteOfHubWithInfo({
                  hubWithInfo: possibleHubs[0],
                  dailyEventIdsWithRoutes,
                  dailyEventId: dailyEvent.dailyEventId,
                });

                if (!route) return null;
                return (
                  <Hub
                    key={possibleHubs[0].regionHubId}
                    possibleHubs={possibleHubs}
                    handleHubClick={() => handleHubClick(possibleHubs)}
                    toExtraSeatAlarmStep={toExtraSeatAlarmStep}
                    route={route}
                  />
                );
              })}
            </ul>
          </article>
        ))}
      </div>
      <div className="my-12 h-[1px] w-full bg-basic-grey-100" />
      {isDemandPossible && (
        <div className="flex items-center justify-between gap-8 pb-12 pt-12">
          <div className="flex h-[26px] items-center gap-4">
            <span className="text-16 font-600 text-basic-grey-700">
              찾는 정류장이 없나요?
            </span>
            <Tooltip content="원하는 지역이 보이지 않는다면, 해당 정류장은 수요조사가 진행 중이에요. 셔틀이 열릴 수 있도록 수요조사에 참여해 보세요." />
          </div>
          <Button
            onClick={toDemandHubsStep}
            variant="tertiary"
            size="small"
            type="button"
          >
            요청하기
          </Button>
        </div>
      )}
    </section>
  );
};

export default ReservationHubsStep;

interface HubProps {
  possibleHubs: HubWithInfo[];
  handleHubClick: (hubsWithInfo: HubWithInfo[]) => void;
  toExtraSeatAlarmStep: () => void;
  route: ShuttleRoutesViewEntity;
}

const Hub = ({
  possibleHubs,
  handleHubClick,
  toExtraSeatAlarmStep,
  route,
}: HubProps) => {
  const isDuplicate = possibleHubs.length > 1;
  const isSoldOut = possibleHubs.every((hub) =>
    checkIsSoldOut(hub.remainingSeat),
  );
  const isSoldOutForToDestination = possibleHubs
    .filter((hub) => hub.type === 'TO_DESTINATION')
    .every((hub) => checkIsSoldOut(hub.remainingSeat));
  const isSoldOutForFromDestination = possibleHubs
    .filter((hub) => hub.type === 'FROM_DESTINATION')
    .every((hub) => checkIsSoldOut(hub.remainingSeat));

  const hub = possibleHubs[0];
  const remainingSeat = getPriorityRemainingSeat(hub.remainingSeat);
  const remainingSeatCount = remainingSeat?.count ?? 0;

  const toDestinationExists =
    !!route.toDestinationShuttleRouteHubs &&
    route.toDestinationShuttleRouteHubs.length > 0;
  const fromDestinationExists =
    !!route.fromDestinationShuttleRouteHubs &&
    route.fromDestinationShuttleRouteHubs.length > 0;

  const toDestinationArrivalTime = toDestinationExists
    ? dateString(
        route.toDestinationShuttleRouteHubs?.find(
          (hub) => hub.role === 'DESTINATION',
        )?.arrivalTime,
        {
          showYear: false,
          showDate: false,
          showWeekday: false,
          showTime: true,
        },
      )
    : null;

  const fromDestinationDepartureTime = fromDestinationExists
    ? dateString(route.fromDestinationShuttleRouteHubs?.[0]?.arrivalTime, {
        showYear: false,
        showDate: false,
        showWeekday: false,
        showTime: true,
      })
    : null;

  return (
    <div key={hub.regionHubId} className="relative flex w-full items-center">
      <button
        type="button"
        onClick={() => handleHubClick(possibleHubs)}
        disabled={isSoldOut}
        className={`group flex w-full flex-col justify-between gap-8 rounded-8 border border-basic-grey-200 px-12 py-[10px] text-left ${isSoldOut && 'pb-[49px]'}`}
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex w-[calc(100%-50px)] items-center gap-[6px]">
            <PinIcon className="shrink-0" />
            <span className="overflow-x-auto whitespace-nowrap text-16 font-600 text-basic-grey-700 scrollbar-hidden group-disabled:text-basic-grey-300">
              {hub.name}
            </span>
          </div>
          {!isDuplicate && isSoldOut ? (
            <span className="whitespace-nowrap break-keep text-14 font-600 text-basic-grey-300">
              매진
            </span>
          ) : (
            remainingSeatCount <= DANGER_SEAT_THRESHOLD && (
              <span className="text-12 font-500 leading-[160%] text-basic-red-400">
                매진 임박
              </span>
            )
          )}
        </div>
        <div className="flex pl-[29px] text-12 font-500 leading-[160%] text-basic-grey-600">
          {toDestinationArrivalTime && (
            <div
              className={`${isSoldOutForToDestination && 'text-basic-grey-300'}`}
            >
              행사장행: {toDestinationArrivalTime} 도착 {isDuplicate && ' 외'}
            </div>
          )}
          {toDestinationArrivalTime && fromDestinationDepartureTime && (
            <div
              className={`${(isSoldOutForToDestination || isSoldOutForFromDestination) && 'text-basic-grey-300'}`}
            >
              &nbsp;|&nbsp;
            </div>
          )}
          {fromDestinationDepartureTime && (
            <div
              className={`${isSoldOutForFromDestination && 'text-basic-grey-300'}`}
            >
              귀가행: {fromDestinationDepartureTime} 출발 {isDuplicate && ' 외'}
            </div>
          )}
        </div>
      </button>
      {!isDuplicate && isSoldOut && (
        <div className="absolute bottom-[10px] left-1/2 -translate-x-1/2 transform">
          <RequestSeatAlarmButton
            toStep={toExtraSeatAlarmStep}
            hubWithInfo={hub}
          />
        </div>
      )}
    </div>
  );
};
