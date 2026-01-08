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
  isCheckRouteDetailViewFlowAtom,
  selectedHubWithInfoForDetailViewAtom,
} from '../../../store/selectedHubWithInfoForDetailViewAtom';
import { HANDY_PARTY_PREFIX } from '@/constants/common';
import { dailyEventIdsWithRoutesAtom } from '../../../store/dailyEventIdsWithRoutesAtom';
import { ShuttleRouteHubsInShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';
import { dateString } from '@/utils/dateString.util';
import { userDemandsAtom } from '../../../store/userDemandsAtom';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

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

  const isDemandPossible = dailyEvent.status === 'OPEN';

  const userDemands = useAtomValue(userDemandsAtom);
  const handleDemandClick = () => {
    const isDemandSubmitted = userDemands?.some(
      (demand) => demand.dailyEventId === dailyEvent.dailyEventId,
    );
    if (isDemandSubmitted) {
      toast.error('이미 참여한 일자예요.');
      return;
    }
    toDemandHubsStep();
  };

  return (
    <section>
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
                const routes = possibleHubs.map((hub) =>
                  getRouteOfHubWithInfo({
                    hubWithInfo: hub,
                    dailyEventIdsWithRoutes,
                    dailyEventId: dailyEvent.dailyEventId,
                  }),
                );

                if (
                  !routes.every(
                    (route) => route !== null && route !== undefined,
                  )
                ) {
                  return null;
                }

                const fastestArrivalTimeToDestinationHub =
                  routes
                    .filter(
                      (route) =>
                        route &&
                        route.toDestinationShuttleRouteHubs &&
                        route.toDestinationShuttleRouteHubs.length > 0 &&
                        ((route.regularPriceToDestination !== null &&
                          route.regularPriceToDestination > 0) ||
                          (route.regularPriceRoundTrip !== null &&
                            route.regularPriceRoundTrip > 0)),
                    )
                    .sort((a, b) => {
                      if (!a || !b) {
                        return 0;
                      }
                      return dayjs(
                        a.toDestinationShuttleRouteHubs?.find(
                          (hub) => hub.role === 'DESTINATION',
                        )?.arrivalTime,
                      ).diff(
                        dayjs(
                          b.toDestinationShuttleRouteHubs?.find(
                            (hub) => hub.role === 'DESTINATION',
                          )?.arrivalTime,
                        ),
                      );
                    })?.[0]
                    ?.toDestinationShuttleRouteHubs?.find(
                      (hub) => hub.role === 'DESTINATION',
                    ) ?? null;

                const fastestArrivalTimeFromDestinationHub =
                  routes
                    .filter(
                      (route) =>
                        route &&
                        route.fromDestinationShuttleRouteHubs &&
                        route.fromDestinationShuttleRouteHubs.length > 0 &&
                        ((route.regularPriceFromDestination !== null &&
                          route.regularPriceFromDestination > 0) ||
                          (route.regularPriceRoundTrip !== null &&
                            route.regularPriceRoundTrip > 0)),
                    )
                    .sort((a, b) => {
                      if (!a || !b) {
                        return 0;
                      }
                      return dayjs(
                        a.fromDestinationShuttleRouteHubs?.find(
                          (hub) => hub.role === 'DESTINATION',
                        )?.arrivalTime,
                      ).diff(
                        dayjs(
                          b.fromDestinationShuttleRouteHubs?.find(
                            (hub) => hub.role === 'DESTINATION',
                          )?.arrivalTime,
                        ),
                      );
                    })?.[0]
                    ?.fromDestinationShuttleRouteHubs?.find(
                      (hub) => hub.role === 'DESTINATION',
                    ) ?? null;

                return (
                  <Hub
                    key={possibleHubs[0].regionHubId}
                    possibleHubs={possibleHubs}
                    handleHubClick={() => handleHubClick(possibleHubs)}
                    toExtraSeatAlarmStep={toExtraSeatAlarmStep}
                    fastestArrivalTimeToDestinationHub={
                      fastestArrivalTimeToDestinationHub
                    }
                    fastestArrivalTimeFromDestinationHub={
                      fastestArrivalTimeFromDestinationHub
                    }
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
            <Tooltip
              position="top"
              content="원하는 지역이 보이지 않는다면, 해당 정류장은 수요조사가 진행 중이에요. 셔틀이 열릴 수 있도록 수요조사에 참여해 보세요."
            />
          </div>
          <Button
            onClick={handleDemandClick}
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
  fastestArrivalTimeToDestinationHub: ShuttleRouteHubsInShuttleRoutesViewEntity | null;
  fastestArrivalTimeFromDestinationHub: ShuttleRouteHubsInShuttleRoutesViewEntity | null;
}

const Hub = ({
  possibleHubs,
  handleHubClick,
  toExtraSeatAlarmStep,
  fastestArrivalTimeToDestinationHub,
  fastestArrivalTimeFromDestinationHub,
}: HubProps) => {
  const hub = possibleHubs[0];

  const isToDestinationDuplicate =
    possibleHubs.filter((hub) => hub.remainingSeat.TO_DESTINATION !== null)
      .length > 1;
  const isFromDestinationDuplicate =
    possibleHubs.filter((hub) => hub.remainingSeat.FROM_DESTINATION !== null)
      .length > 1;

  const isSoldOut = possibleHubs.every((hub) =>
    checkIsSoldOut(hub.remainingSeat),
  );
  const isSoldOutForToDestination =
    possibleHubs.filter((hub) => hub.remainingSeat.TO_DESTINATION !== null)
      .length > 0 &&
    possibleHubs
      .filter((hub) => hub.remainingSeat.TO_DESTINATION !== null)
      .every((hub) => hub.remainingSeat.TO_DESTINATION === 0);
  const isSoldOutForFromDestination =
    possibleHubs.filter((hub) => hub.remainingSeat.FROM_DESTINATION !== null)
      .length > 0 &&
    possibleHubs
      .filter((hub) => hub.remainingSeat.FROM_DESTINATION !== null)
      .every((hub) => hub.remainingSeat.FROM_DESTINATION === 0);

  const isUnderDangerSeatThreshold = possibleHubs.every((hub) => {
    const remainingSeat = getPriorityRemainingSeat(hub.remainingSeat);
    return (
      remainingSeat &&
      remainingSeat.count !== null &&
      remainingSeat.count > 0 &&
      remainingSeat.count <= DANGER_SEAT_THRESHOLD
    );
  });

  const toDestinationArrivalTime = fastestArrivalTimeToDestinationHub
    ? dateString(fastestArrivalTimeToDestinationHub.arrivalTime, {
        showYear: false,
        showDate: false,
        showWeekday: false,
        showTimeWithoutAmPm: true,
      })
    : null;

  const fromDestinationDepartureTime = fastestArrivalTimeFromDestinationHub
    ? dateString(fastestArrivalTimeFromDestinationHub.arrivalTime, {
        showYear: false,
        showDate: false,
        showWeekday: false,
        showTimeWithoutAmPm: true,
      })
    : null;

  return (
    <div key={hub.regionHubId} className="relative flex w-full items-center">
      <button
        type="button"
        onClick={() => handleHubClick(possibleHubs)}
        disabled={isSoldOut}
        className={`group flex w-full flex-col justify-between gap-8 rounded-8 border border-basic-grey-200 px-12 py-[10px] text-left`}
      >
        <div className="flex w-full justify-between gap-16">
          <div className="flex w-full gap-[6px]">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center">
              <PinIcon />
            </div>
            <span className="text-16 font-600 text-basic-grey-700 group-disabled:text-basic-grey-400">
              {hub.name}
            </span>
          </div>
          {isSoldOut ? (
            <div className="flex h-[23px] w-[83px] shrink-0 items-center">
              <span className="text-12 font-500 text-basic-grey-500">매진</span>
            </div>
          ) : (
            isUnderDangerSeatThreshold && (
              <span className="shrink-0 whitespace-nowrap break-keep text-12 font-500 leading-[160%] text-basic-red-400">
                매진 임박
              </span>
            )
          )}
        </div>
        <div className="flex pl-[29px] text-12 font-500 leading-[160%] text-basic-grey-600">
          {fastestArrivalTimeToDestinationHub ? (
            <div
              className={`${isSoldOutForToDestination && 'text-basic-grey-300'}`}
            >
              행사장행 {toDestinationArrivalTime} 도착{' '}
              {isToDestinationDuplicate && ' 외'}
            </div>
          ) : (
            <div className="text-basic-grey-300">행사장행 미운행</div>
          )}
          <div className="text-basic-grey-200">&nbsp;|&nbsp;</div>
          {fastestArrivalTimeFromDestinationHub ? (
            <div
              className={`${isSoldOutForFromDestination && 'text-basic-grey-300'}`}
            >
              귀가행 {fromDestinationDepartureTime} 출발{' '}
              {isFromDestinationDuplicate && ' 외'}
            </div>
          ) : (
            <div className="text-basic-grey-300">귀가행 미운행</div>
          )}
        </div>
      </button>
      {isSoldOut && (
        <div className="absolute right-[12px] top-[10px]">
          <RequestSeatAlarmButton
            toStep={toExtraSeatAlarmStep}
            hubWithInfo={hub}
          />
        </div>
      )}
    </div>
  );
};
