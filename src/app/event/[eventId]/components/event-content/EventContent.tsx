'use client';

import { useMemo } from 'react';
import { EventsViewEntity } from '@/types/event.type';
import EventForm from '../event-form/EventForm';
import { useGetShuttleRoutesOfEventWithPagination } from '@/services/shuttleRoute.service';
import ShuttleScheduleView from './components/ShuttleScheduleView';

interface Props {
  event: EventsViewEntity;
}

const EventContent = ({ event }: Props) => {
  const { data: shuttleRoutesPages, isLoading } =
    useGetShuttleRoutesOfEventWithPagination({
      eventId: event.eventId,
    });
  const shuttleRoutes = useMemo(
    () => shuttleRoutesPages?.pages.flatMap((page) => page.shuttleRoutes) ?? [],
    [shuttleRoutesPages],
  );

  const openShuttleRoutes = useMemo(
    () => shuttleRoutes.filter((route) => route.status === 'OPEN'),
    [shuttleRoutes],
  );

  if (event.eventStatus === 'STAND_BY') {
    return null;
  }

  return (
    <>
      <EventForm
        event={event}
        openShuttleRoutes={openShuttleRoutes}
        isLoading={isLoading}
      />
      {event.eventMinRoutePrice !== null && (
        <ShuttleScheduleView
          event={event}
          shuttleRoutes={shuttleRoutes}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default EventContent;
