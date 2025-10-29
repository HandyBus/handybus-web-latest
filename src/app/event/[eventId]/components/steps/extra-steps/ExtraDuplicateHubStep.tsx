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
    return hubsWithInfoForDuplicates.sort((a, b) => {
      return dayjs(a.arrivalTime).diff(dayjs(b.arrivalTime));
    });
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
        return (
          <Hub
            key={hubWithInfo.shuttleRouteId}
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
  onClick: () => void;
  toExtraSeatAlarmStep: () => void;
  hubWithInfo: HubWithInfo;
  route: ShuttleRoutesViewEntity;
}

const Hub = ({
  onClick,
  toExtraSeatAlarmStep,
  hubWithInfo,
  route,
}: HubProps) => {
  const isToDestinationSoldOut = hubWithInfo.remainingSeat.TO_DESTINATION === 0;
  const isFromDestinationSoldOut =
    hubWithInfo.remainingSeat.FROM_DESTINATION === 0;
  const isAllSoldOut = isToDestinationSoldOut && isFromDestinationSoldOut;

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
    <div className="relative w-full">
      <button
        type="button"
        onClick={onClick}
        disabled={isAllSoldOut}
        className="flex w-full flex-col gap-8 rounded-8 border border-basic-grey-200 px-12 py-[10px] text-left active:bg-basic-grey-100"
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
                  hubWithInfo.remainingSeat.TO_DESTINATION <=
                    DANGER_SEAT_THRESHOLD && (
                    <span className="text-12 font-500 leading-[160%] text-basic-red-400">
                      매진 임박
                    </span>
                  )}
              </div>
              <div
                className={`flex-1 text-12 font-500 leading-[160%] ${isToDestinationSoldOut ? 'text-basic-grey-300' : 'text-basic-grey-700'}`}
              >
                {toDestinationArrivalTime} 도착
              </div>
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
                  hubWithInfo.remainingSeat.FROM_DESTINATION <=
                    DANGER_SEAT_THRESHOLD && (
                    <span className="text-12 font-500 leading-[160%] text-basic-red-400">
                      매진 임박
                    </span>
                  )}
              </div>
              <div
                className={`flex-1 text-12 font-500 leading-[160%] ${isFromDestinationSoldOut ? 'text-basic-grey-300' : 'text-basic-grey-700'}`}
              >
                {fromDestinationDepartureTime} 출발
              </div>
            </div>
          </div>
        )}
      </button>
      {isToDestinationSoldOut && (
        <div className="absolute right-16 top-16 flex items-center gap-8">
          <RequestSeatAlarmButton
            toStep={toExtraSeatAlarmStep}
            hubWithInfo={hubWithInfo}
          />
        </div>
      )}
      {isFromDestinationSoldOut && (
        <div className="absolute bottom-16 right-16 flex items-center gap-8">
          <RequestSeatAlarmButton
            toStep={toExtraSeatAlarmStep}
            hubWithInfo={hubWithInfo}
          />
        </div>
      )}
    </div>
  );
};
