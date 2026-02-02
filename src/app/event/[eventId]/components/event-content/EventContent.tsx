'use client';

import { useMemo } from 'react';
import { EventsViewEntity } from '@/types/event.type';
import EventForm from '../event-form/EventForm';
import { Provider as JotaiProvider } from 'jotai';
import { useGetShuttleRoutesOfEventWithPagination } from '@/services/shuttleRoute.service';
import ShuttleScheduleView from './components/ShuttleScheduleView';
import CheerUpDiscountInfo from '../cheer-up/CheerUpDiscountInfo';
import { EVENT_CHEER_UP_TEST_EVENT_ID } from '../cheer-up/cheer-up.const';

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
