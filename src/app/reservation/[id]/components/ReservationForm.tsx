'use client';

import Select from '@/components/select/Select';
import { compareToNow, dateString } from '@/utils/dateString.util';
import { SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import RouteVisualizer from '@/components/route-visualizer/RouteVisualizer';
import BottomBar from './BottomBar';
import PriceStats from './PriceStats';
import { useGetShuttleRoutesOfDailyEvent } from '@/services/shuttleRoute.service';
import { ShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';
import {
  EventsViewEntity,
  DailyEventsInEventsViewEntity,
} from '@/types/event.type';
import dayjs from 'dayjs';
import useAuthRouter from '@/hooks/useAuthRouter';

export const RESERVATION_DETAIL_FORM_ID = 'reservation-form';

interface Props {
  event: EventsViewEntity;
  initialDailyEventId: string;
  initialRouteId: string;
}

const ReservationForm = ({
  event,
  initialDailyEventId,
  initialRouteId,
}: Props) => {
  const [selectedDailyEvent, setSelectedDailyEvent] =
    useState<DailyEventsInEventsViewEntity>();
  const [selectedRoute, setSelectedRoute] = useState<ShuttleRoutesViewEntity>();
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const { data: routes } = useGetShuttleRoutesOfDailyEvent(
    event.eventId,
    selectedDailyEvent?.dailyEventId ?? initialDailyEventId,
    {
      status: 'OPEN',
    },
  );

  useEffect(() => {
    if (selectedDailyEvent || selectedRoute || !routes) {
      return;
    }
    setIsInitialLoading(false);
    setSelectedDailyEvent(
      event.dailyEvents.find(
        (dailyEvent) => dailyEvent.dailyEventId === initialDailyEventId,
      ),
    );
    setSelectedRoute(
      routes.find((route) => route.shuttleRouteId === initialRouteId),
    );
  }, [routes]);

  const router = useRouter();
  const authRouter = useAuthRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (!selectedDailyEvent || !selectedRoute) {
      return;
    }
    const params = new URLSearchParams(searchParams.toString());
    params.set('dailyEventId', selectedDailyEvent.dailyEventId.toString());
    params.set('shuttleRouteId', selectedRoute?.shuttleRouteId.toString());

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [selectedRoute]);

  const filteredRoutes = useMemo(
    () =>
      routes?.filter(
        (route) => route.dailyEventId === selectedDailyEvent?.dailyEventId,
      ),
    [routes, selectedDailyEvent],
  );

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({
      dailyEventId: selectedDailyEvent?.dailyEventId?.toString() ?? '',
      shuttleRouteId: selectedRoute?.shuttleRouteId?.toString() ?? '',
    });
    authRouter.push(`/reservation/${event.eventId}/write?${query}`);
  };

  const sortedToDestinationHubs = useMemo(
    () =>
      selectedRoute?.toDestinationShuttleRouteHubs?.sort(
        (a, b) => a.sequence - b.sequence,
      ) ?? [],
    [selectedRoute],
  );

  return (
    <form onSubmit={handleSubmit} id={RESERVATION_DETAIL_FORM_ID}>
      <section className="flex flex-col gap-16 p-16">
        <h5 className="text-16 font-400 text-grey-600">일자를 선택해주세요</h5>
        <Select
          options={event.dailyEvents}
          value={selectedDailyEvent}
          setValue={(value) => {
            setSelectedDailyEvent(value);
            setSelectedRoute(undefined);
          }}
          renderValue={(value) => dateString(value.date)}
          placeholder="일자"
          bottomSheetTitle="일자 선택"
          isUnderLined
          sort
          sortBy={(a, b) => dayjs(a.date).diff(dayjs(b.date))}
        />
      </section>
      <section className="flex flex-col gap-16 p-16">
        <h5 className="text-16 font-400 text-grey-600">
          노선 종류를 선택해주세요
        </h5>
        <Select
          options={filteredRoutes ?? []}
          value={selectedRoute}
          setValue={(value) => {
            setSelectedRoute(value);
          }}
          renderValue={(value) => value.name}
          disabled={!selectedDailyEvent}
          placeholder="노선 종류"
          bottomSheetTitle="노선 종류 선택"
          isUnderLined
          defaultText="예약 가능한 노선이 없어요."
        />
      </section>
      <div id="divider" className="my-16 h-[8px] bg-grey-50" />
      {selectedRoute && (
        <>
          <div className="px-16 py-20">
            <RouteVisualizer
              type="ROUND_TRIP"
              isSelected={false}
              toDestinationHubs={
                selectedRoute.toDestinationShuttleRouteHubs ?? []
              }
              fromDestinationHubs={
                selectedRoute.fromDestinationShuttleRouteHubs ?? []
              }
            />
          </div>
          <PriceStats
            region={sortedToDestinationHubs[0].name}
            destination={
              sortedToDestinationHubs[sortedToDestinationHubs.length - 1].name
            }
            regularPrice={{
              toDestination: selectedRoute.regularPriceToDestination,
              fromDestination: selectedRoute.regularPriceFromDestination,
              roundTrip: selectedRoute.regularPriceRoundTrip,
            }}
            isEarlybird={Boolean(
              selectedRoute.hasEarlybird &&
                selectedRoute.earlybirdDeadline &&
                compareToNow(selectedRoute.earlybirdDeadline, (a, b) => a > b),
            )}
            earlybirdDeadline={selectedRoute.earlybirdDeadline}
            earlybirdPrice={{
              toDestination: selectedRoute.earlybirdPriceToDestination ?? 0,
              fromDestination: selectedRoute.earlybirdPriceFromDestination ?? 0,
              roundTrip: selectedRoute.earlybirdPriceRoundTrip ?? 0,
            }}
            remainingSeat={{
              toDestination:
                selectedRoute.maxPassengerCount -
                selectedRoute.toDestinationCount,
              fromDestination:
                selectedRoute.maxPassengerCount -
                selectedRoute.fromDestinationCount,
            }}
          />
        </>
      )}
      <BottomBar
        isSelected={!!selectedRoute}
        isNotOpen={selectedRoute && selectedRoute.status !== 'OPEN'}
        eventName={event.eventName}
        isLoading={isInitialLoading}
        isSeatFull={selectedRoute?.remainingSeatCount === 0}
        selectedRoute={selectedRoute}
      />
    </form>
  );
};

export default ReservationForm;
