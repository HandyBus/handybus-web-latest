'use client';

import Badge from '@/components/badge/Badge';
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

  const toDestinationDepartureTime = toDestinationExists
    ? dateString(
        route.toDestinationShuttleRouteHubs?.find(
          (hub) => hub.regionHubId === hubWithInfo.regionHubId,
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
        className="flex w-full flex-col gap-12 rounded-8 bg-basic-grey-50 p-16 text-left active:bg-basic-grey-100"
      >
        {toDestinationExists && (
          <div
            className={`flex h-[31px] w-full items-center gap-8 ${
              isToDestinationSoldOut && 'pr-124'
            }`}
          >
            <Badge className="bg-basic-white text-basic-grey-700">
              가는 편
            </Badge>
            <div className="flex-1 text-14 font-500 text-basic-grey-700">
              {toDestinationDepartureTime} 출발
            </div>
            {!isToDestinationSoldOut && (
              <div className="shrink-0 text-14 font-500 text-basic-grey-500">
                {hubWithInfo.remainingSeat.TO_DESTINATION >
                DANGER_SEAT_THRESHOLD ? (
                  <span className="text-basic-grey-500">여유</span>
                ) : (
                  <span className="text-basic-red-400">
                    {hubWithInfo.remainingSeat.TO_DESTINATION}석 남음
                  </span>
                )}
              </div>
            )}
          </div>
        )}
        {fromDestinationExists && (
          <div
            className={`flex h-[31px] w-full items-center gap-8 ${
              isFromDestinationSoldOut && 'pr-124'
            }`}
          >
            <Badge className="bg-basic-grey-200 text-basic-grey-700">
              오는 편
            </Badge>
            <div className="flex-1 text-14 font-500 text-basic-grey-700">
              {fromDestinationDepartureTime} 출발
            </div>
            {!isFromDestinationSoldOut && (
              <div className="shrink-0 text-14 font-500 text-basic-grey-500">
                {hubWithInfo.remainingSeat.FROM_DESTINATION >
                DANGER_SEAT_THRESHOLD ? (
                  <span className="text-basic-grey-500">여유</span>
                ) : (
                  <span className="text-basic-red-400">
                    {hubWithInfo.remainingSeat.FROM_DESTINATION}석 남음
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </button>
      {isToDestinationSoldOut && (
        <div className="absolute right-16 top-16 flex items-center gap-8">
          <RequestSeatAlarmButton
            toStep={toExtraSeatAlarmStep}
            hubWithInfo={hubWithInfo}
          />
          <span className="text-14 font-500 text-basic-grey-500">매진</span>
        </div>
      )}
      {isFromDestinationSoldOut && (
        <div className="absolute bottom-16 right-16 flex items-center gap-8">
          <RequestSeatAlarmButton
            toStep={toExtraSeatAlarmStep}
            hubWithInfo={hubWithInfo}
          />
          <span className="text-14 font-500 text-basic-grey-500">매진</span>
        </div>
      )}
    </div>
  );
};
