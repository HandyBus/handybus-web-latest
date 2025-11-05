'use client';

import { EventsViewEntity } from '@/types/event.type';
import EventForm from '../event-form/EventForm';
import { Provider as JotaiProvider } from 'jotai';
import { useGetShuttleRoutesOfEventWithPagination } from '@/services/shuttleRoute.service';
import { useMemo } from 'react';
import ShuttleScheduleView from './components/ShuttleScheduleView';

interface Props {
  event: EventsViewEntity;
}

const EventContent = ({ event }: Props) => {
  const { data: shuttleRoutesPages } = useGetShuttleRoutesOfEventWithPagination(
    {
      eventId: event.eventId,
    },
  );
  const shuttleRoutes = useMemo(
    () => shuttleRoutesPages?.pages.flatMap((page) => page.shuttleRoutes) ?? [],
    [shuttleRoutesPages],
  );

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
