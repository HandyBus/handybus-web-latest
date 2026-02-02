'use client';

import { useMemo } from 'react';
import { EventsViewEntity } from '@/types/event.type';
import EventForm from '../event-form/EventForm';
import { Provider as JotaiProvider } from 'jotai';
import { useGetShuttleRoutesOfEventWithPagination } from '@/services/shuttleRoute.service';
import ShuttleScheduleView from './components/ShuttleScheduleView';
import CheerUpDiscountInfo from '../cheer-up/CheerUpDiscountInfo';
import { EVENT_CHEER_UP_TEST_EVENT_ID } from '../cheer-up/cheer-up.const';
import { MOCK_SHUTTLE_ROUTES } from './mock-shuttle-routes.const';

interface Props {
  event: EventsViewEntity;
}

const EventContent = ({ event }: Props) => {
  const { data: shuttleRoutesPages } = useGetShuttleRoutesOfEventWithPagination(
    {
      eventId: event.eventId,
    },
  );
  const shuttleRoutes = useMemo(() => {
    const mockShuttleRoutes = MOCK_SHUTTLE_ROUTES[event.eventId];
    if (!mockShuttleRoutes) {
      return [];
    }
    const apiShuttleRoutes =
      shuttleRoutesPages?.pages.flatMap((page) => page.shuttleRoutes) ?? [];

    const mergedShuttleRoutes = apiShuttleRoutes.map((route) => {
      const mockRoute = mockShuttleRoutes.find(
        (mockRoute) => mockRoute.shuttleRouteId === route.shuttleRouteId,
      );
      return {
        ...route,
        regularPriceToDestination: mockRoute?.regularPriceToDestination ?? null,
        regularPriceFromDestination:
          mockRoute?.regularPriceFromDestination ?? null,
        regularPriceRoundTrip: mockRoute?.regularPriceRoundTrip ?? null,
        earlybirdPriceToDestination:
          mockRoute?.earlybirdPriceToDestination ?? null,
        earlybirdPriceFromDestination:
          mockRoute?.earlybirdPriceFromDestination ?? null,
        earlybirdPriceRoundTrip: mockRoute?.earlybirdPriceRoundTrip ?? null,
      };
    });
    return mergedShuttleRoutes ?? [];
  }, [event.eventId, shuttleRoutesPages]);

  console.log(shuttleRoutes);

  const shuttleRoutesOpen = useMemo(
    () => shuttleRoutes.filter((route) => route.status === 'OPEN'),
    [shuttleRoutes],
  );

  const isCheerUpEvent = event.eventId === EVENT_CHEER_UP_TEST_EVENT_ID;

  return (
    <JotaiProvider>
      {isCheerUpEvent && <CheerUpDiscountInfo />}
      <EventForm event={event} shuttleRoutesOpen={shuttleRoutesOpen} />
      {event.eventMinRoutePrice !== null && (
        <ShuttleScheduleView event={event} shuttleRoutes={shuttleRoutes} />
      )}
    </JotaiProvider>
  );
};

export default EventContent;
