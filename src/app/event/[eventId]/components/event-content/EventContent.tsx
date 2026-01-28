'use client';

import { EventsViewEntity } from '@/types/event.type';
import EventForm from '../event-form/EventForm';
import { Provider as JotaiProvider } from 'jotai';
import { useGetShuttleRoutesOfEventWithPagination } from '@/services/shuttleRoute.service';
import { useMemo } from 'react';
import ShuttleScheduleView from './components/ShuttleScheduleView';
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

  const shuttleRoutesOpen = useMemo(
    () => shuttleRoutes.filter((route) => route.status === 'OPEN'),
    [shuttleRoutes],
  );

  return (
    <JotaiProvider>
      <EventForm event={event} shuttleRoutesOpen={shuttleRoutesOpen} />
      {event.eventMinRoutePrice !== null && (
        <ShuttleScheduleView event={event} shuttleRoutes={shuttleRoutes} />
      )}
    </JotaiProvider>
  );
};

export default EventContent;
