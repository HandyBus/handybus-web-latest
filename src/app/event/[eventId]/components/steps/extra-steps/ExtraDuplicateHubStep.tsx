'use client';

import RequestSeatAlarmButton from '../components/RequestSeatAlarmButton';
import { useFormContext } from 'react-hook-form';
import { dateString } from '@/utils/dateString.util';
import { useAtomValue, useSetAtom } from 'jotai';
import { ShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';
import { EventFormValues } from '../../../form.type';
import { dailyEventIdsWithRoutesAtom } from '../../../store/dailyEventIdsWithRoutesAtom';
import {
  getRouteOfHubWithInfo,
  HubWithInfo,
} from '../../../store/dailyEventIdsWithHubsAtom';
import { isCheckRouteDetailViewFlowAtom } from '../../../store/selectedHubWithInfoForDetailViewAtom';
import { selectedHubWithInfoForDetailViewAtom } from '../../../store/selectedHubWithInfoForDetailViewAtom';
import { DANGER_SEAT_THRESHOLD } from '../../../form.const';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import { checkExistingTripType, checkIsSoldOut } from '@/utils/event.util';
import { GD_FANMEETING_EVENT_ID } from '../../event-content/components/ShuttleScheduleView';
import { eventAtom } from '../../../store/eventAtom';

interface Props {
  toReservationTripTypeStep: () => void;
  toExtraSeatAlarmStep: () => void;
  closeBottomSheet: () => void;
}

const ExtraDuplicateHubStep = ({
  toReservationTripTypeStep,
  toExtraSeatAlarmStep,
  closeBottomSheet,
}: Props) => {
  const { getValues, setValue } = useFormContext<EventFormValues>();
  const [hubsWithInfoForDuplicates, dailyEvent] = getValues([
    'hubsWithInfoForDuplicates',
    'dailyEvent',
  ]);
  const dailyEventIdsWithRoutes = useAtomValue(dailyEventIdsWithRoutesAtom);

  const sortedHubsWithInfoForDuplicates = useMemo(() => {
    if (!hubsWithInfoForDuplicates) {
      return [];
    }
    const toDestinationOnlyHubs = hubsWithInfoForDuplicates
      .filter(
        (hub) =>
          hub.remainingSeat.TO_DESTINATION !== null &&
          hub.remainingSeat.FROM_DESTINATION === null &&
          hub.remainingSeat.ROUND_TRIP === null,
      )
      .sort((a, b) => {
        return dayjs(a.arrivalTime).diff(dayjs(b.arrivalTime));
      });
    const fromDestinationOnlyHubs = hubsWithInfoForDuplicates
      .filter(
        (hub) =>
          hub.remainingSeat.FROM_DESTINATION !== null &&
          hub.remainingSeat.TO_DESTINATION === null &&
          hub.remainingSeat.ROUND_TRIP === null,
      )
      .sort((a, b) => {
        return dayjs(a.arrivalTime).diff(dayjs(b.arrivalTime));
      });
    const otherHubs = hubsWithInfoForDuplicates
      .filter(
        (hub) =>
          !toDestinationOnlyHubs.includes(hub) &&
          !fromDestinationOnlyHubs.includes(hub),
      )
      .sort((a, b) => {
        return dayjs(a.arrivalTime).diff(dayjs(b.arrivalTime));
      });

    return [...toDestinationOnlyHubs, ...fromDestinationOnlyHubs, ...otherHubs];
  }, [hubsWithInfoForDuplicates]);

  const setSelectedHubWithInfoForDetailViewAtom = useSetAtom(
    selectedHubWithInfoForDetailViewAtom,
  );
  const isCheckRouteDetailViewFlow = useAtomValue(
    isCheckRouteDetailViewFlowAtom,
  );

  const handleHubClick = (hubWithInfo: HubWithInfo) => {
    setValue('selectedHubWithInfo', hubWithInfo);
    setSelectedHubWithInfoForDetailViewAtom({
      hubWithInfo,
      dailyEvent,
    });

    if (!isCheckRouteDetailViewFlow) {
      toReservationTripTypeStep();
      return;
    }

    closeBottomSheet();
  };

  const event = useAtomValue(eventAtom);
  const eventId = event?.eventId ?? '';

  return (
    <section className="flex w-full flex-col gap-8">
      {sortedHubsWithInfoForDuplicates.map((hubWithInfo) => {
        const route = getRouteOfHubWithInfo({
          hubWithInfo,
          dailyEventIdsWithRoutes,
          dailyEventId: dailyEvent.dailyEventId,
        });
        if (!route) {
          return null;
        }

        const { toDestinationExists, fromDestinationExists, roundTripExists } =
          checkExistingTripType(route);

        // 왕복만 존재하는 노선인 경우 별도로 처리
        if (roundTripExists && !toDestinationExists && !fromDestinationExists) {
          return (
            <RoundTripOnlyHub
              key={hubWithInfo.shuttleRouteId}
              eventId={eventId}
              onClick={() => handleHubClick(hubWithInfo)}
              toExtraSeatAlarmStep={toExtraSeatAlarmStep}
              route={route}
              hubWithInfo={hubWithInfo}
            />
          );
        }

        return (
          <Hub
            key={hubWithInfo.shuttleRouteId}
            eventId={eventId}
            onClick={() => handleHubClick(hubWithInfo)}
            toExtraSeatAlarmStep={toExtraSeatAlarmStep}
            route={route}
            hubWithInfo={hubWithInfo}
          />
        );
      })}
    </section>
  );
};

export default ExtraDuplicateHubStep;

interface HubProps {
  eventId: string;
  onClick: () => void;
  toExtraSeatAlarmStep: () => void;
  hubWithInfo: HubWithInfo;
  route: ShuttleRoutesViewEntity;
}

const Hub = ({
  eventId,
  onClick,
  toExtraSeatAlarmStep,
  hubWithInfo,
  route,
}: HubProps) => {
  const { toDestinationExists, fromDestinationExists } =
    checkExistingTripType(route);
  const isToDestinationSoldOut = !!(
    toDestinationExists &&
    hubWithInfo.remainingSeat.TO_DESTINATION !== null &&
    hubWithInfo.remainingSeat.TO_DESTINATION === 0
  );
  const isFromDestinationSoldOut = !!(
    fromDestinationExists &&
    hubWithInfo.remainingSeat.FROM_DESTINATION !== null &&
    hubWithInfo.remainingSeat.FROM_DESTINATION === 0
  );
  const isAllSoldOut = checkIsSoldOut(hubWithInfo.remainingSeat);

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
    <div className="relative w-full">
      <button
        type="button"
        onClick={onClick}
        disabled={isAllSoldOut}
        className="flex w-full flex-col gap-8 rounded-8 border border-basic-grey-200 px-12 py-[10px] text-left active:[&:not(:disabled)]:bg-basic-grey-100"
      >
        {toDestinationExists && (
          <div
            className={`flex w-full items-center gap-8 ${
              isToDestinationSoldOut && 'pr-124'
            }`}
          >
            <div className="flex flex-col items-start gap-[2px]">
              <div className="flex items-center gap-8">
                <span
                  className={`text-14 font-600 leading-[160%]  ${isToDestinationSoldOut ? 'text-basic-grey-300' : 'text-basic-grey-700'}`}
                >
                  행사장행
                </span>
                {isToDestinationSoldOut && (
                  <span className="text-12 font-500 leading-[160%] text-basic-grey-600">
                    매진
                  </span>
                )}
                {!isToDestinationSoldOut &&
                  hubWithInfo.remainingSeat.TO_DESTINATION !== null &&
                  hubWithInfo.remainingSeat.TO_DESTINATION > 0 &&
                  hubWithInfo.remainingSeat.TO_DESTINATION <=
                    DANGER_SEAT_THRESHOLD && (
                    <span className="text-12 font-500 leading-[160%] text-basic-red-400">
                      매진 임박
                    </span>
                  )}
              </div>
              {eventId !== GD_FANMEETING_EVENT_ID && (
                <div
                  className={`flex-1 text-12 font-500 leading-[160%] ${isToDestinationSoldOut ? 'text-basic-grey-300' : 'text-basic-grey-700'}`}
                >
                  {toDestinationArrivalTime} 도착
                </div>
              )}
            </div>
          </div>
        )}
        {toDestinationExists && fromDestinationExists && (
          <div className="h-1 w-full border border-basic-grey-100" />
        )}
        {fromDestinationExists && (
          <div
            className={`flex w-full items-center gap-8 ${
              isFromDestinationSoldOut && 'pr-124'
            }`}
          >
            <div className="flex flex-col items-start gap-[2px]">
              <div className="flex items-center gap-8">
                <span
                  className={`text-14 font-600 leading-[160%]  ${isFromDestinationSoldOut ? 'text-basic-grey-300' : 'text-basic-grey-700'}`}
                >
                  귀가행
                </span>
                {isFromDestinationSoldOut && (
                  <span className="text-12 font-500 leading-[160%] text-basic-grey-600">
                    매진
                  </span>
                )}
                {!isFromDestinationSoldOut &&
                  hubWithInfo.remainingSeat.FROM_DESTINATION !== null &&
                  hubWithInfo.remainingSeat.FROM_DESTINATION > 0 &&
                  hubWithInfo.remainingSeat.FROM_DESTINATION <=
                    DANGER_SEAT_THRESHOLD && (
                    <span className="text-12 font-500 leading-[160%] text-basic-red-400">
                      매진 임박
                    </span>
                  )}
              </div>
              {eventId !== GD_FANMEETING_EVENT_ID && (
                <div
                  className={`flex-1 text-12 font-500 leading-[160%] ${isFromDestinationSoldOut ? 'text-basic-grey-300' : 'text-basic-grey-700'}`}
                >
                  {fromDestinationDepartureTime} 출발
                </div>
              )}
            </div>
          </div>
        )}
      </button>
      {isToDestinationSoldOut && (
        <div className="absolute right-16 top-20 flex items-center gap-8">
          <RequestSeatAlarmButton
            toStep={toExtraSeatAlarmStep}
            hubWithInfo={hubWithInfo}
          />
        </div>
      )}
      {isFromDestinationSoldOut && (
        <div className="absolute bottom-20 right-16 flex items-center gap-8">
          <RequestSeatAlarmButton
            toStep={toExtraSeatAlarmStep}
            hubWithInfo={hubWithInfo}
          />
        </div>
      )}
    </div>
  );
};

interface RoundTripOnlyHubProps {
  eventId: string;
  onClick: () => void;
  toExtraSeatAlarmStep: () => void;
  hubWithInfo: HubWithInfo;
  route: ShuttleRoutesViewEntity;
}

const RoundTripOnlyHub = ({
  eventId,
  onClick,
  toExtraSeatAlarmStep,
  hubWithInfo,
  route,
}: RoundTripOnlyHubProps) => {
  const { roundTripExists } = checkExistingTripType(route);
  const isRoundTripSoldOut = !!(
    roundTripExists &&
    hubWithInfo.remainingSeat.ROUND_TRIP !== null &&
    hubWithInfo.remainingSeat.ROUND_TRIP === 0
  );

  const toDestinationArrivalTime = dateString(
    route.toDestinationShuttleRouteHubs
      ?.sort((a, b) => a.sequence - b.sequence)
      .find((hub) => hub.role === 'DESTINATION')?.arrivalTime,
    {
      showYear: false,
      showDate: false,
      showWeekday: false,
      showTime: true,
    },
  );

  const fromDestinationDepartureTime = dateString(
    route.fromDestinationShuttleRouteHubs
      ?.sort((a, b) => a.sequence - b.sequence)
      .find((hub) => hub.role === 'DESTINATION')?.arrivalTime,
    {
      showYear: false,
      showDate: false,
      showWeekday: false,
      showTime: true,
    },
  );

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={onClick}
        disabled={isRoundTripSoldOut}
        className="flex w-full flex-col gap-8 rounded-8 border border-basic-grey-200 px-12 py-[10px] text-left active:[&:not(:disabled)]:bg-basic-grey-100"
      >
        <div
          className={`flex w-full items-center gap-8 ${
            isRoundTripSoldOut && 'pr-124'
          }`}
        >
          <div className="flex flex-col items-start gap-[2px]">
            <div className="flex items-center gap-8">
              <span
                className={`text-14 font-600 leading-[160%]  ${isRoundTripSoldOut ? 'text-basic-grey-300' : 'text-basic-grey-700'}`}
              >
                행사장행
              </span>
              {isRoundTripSoldOut && (
                <span className="text-12 font-500 leading-[160%] text-basic-grey-600">
                  매진
                </span>
              )}
              {!isRoundTripSoldOut &&
                hubWithInfo.remainingSeat.ROUND_TRIP !== null &&
                hubWithInfo.remainingSeat.ROUND_TRIP > 0 &&
                hubWithInfo.remainingSeat.ROUND_TRIP <=
                  DANGER_SEAT_THRESHOLD && (
                  <span className="text-12 font-500 leading-[160%] text-basic-red-400">
                    매진 임박
                  </span>
                )}
            </div>
            {eventId !== GD_FANMEETING_EVENT_ID && (
              <div
                className={`flex-1 text-12 font-500 leading-[160%] ${isRoundTripSoldOut ? 'text-basic-grey-300' : 'text-basic-grey-700'}`}
              >
                {toDestinationArrivalTime} 도착
              </div>
            )}
          </div>
        </div>
        <div className="h-1 w-full border border-basic-grey-100" />
        <div
          className={`flex w-full items-center gap-8 ${
            isRoundTripSoldOut && 'pr-124'
          }`}
        >
          <div className="flex flex-col items-start gap-[2px]">
            <div className="flex items-center gap-8">
              <span
                className={`text-14 font-600 leading-[160%]  ${isRoundTripSoldOut ? 'text-basic-grey-300' : 'text-basic-grey-700'}`}
              >
                귀가행
              </span>
              {isRoundTripSoldOut && (
                <span className="text-12 font-500 leading-[160%] text-basic-grey-600">
                  매진
                </span>
              )}
              {!isRoundTripSoldOut &&
                hubWithInfo.remainingSeat.ROUND_TRIP !== null &&
                hubWithInfo.remainingSeat.ROUND_TRIP > 0 &&
                hubWithInfo.remainingSeat.ROUND_TRIP <=
                  DANGER_SEAT_THRESHOLD && (
                  <span className="text-12 font-500 leading-[160%] text-basic-red-400">
                    매진 임박
                  </span>
                )}
            </div>
            {eventId !== GD_FANMEETING_EVENT_ID && (
              <div
                className={`flex-1 text-12 font-500 leading-[160%] ${isRoundTripSoldOut ? 'text-basic-grey-300' : 'text-basic-grey-700'}`}
              >
                {fromDestinationDepartureTime} 출발
              </div>
            )}
          </div>
        </div>
      </button>
      {isRoundTripSoldOut && (
        <div className="absolute right-16 top-20 flex items-center gap-8">
          <RequestSeatAlarmButton
            toStep={toExtraSeatAlarmStep}
            hubWithInfo={hubWithInfo}
          />
        </div>
      )}
      {isRoundTripSoldOut && (
        <div className="absolute bottom-20 right-16 flex items-center gap-8">
          <RequestSeatAlarmButton
            toStep={toExtraSeatAlarmStep}
            hubWithInfo={hubWithInfo}
          />
        </div>
      )}
    </div>
  );
};
