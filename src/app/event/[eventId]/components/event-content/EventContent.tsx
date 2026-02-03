'use client';

import { useMemo } from 'react';
import { EventsViewEntity } from '@/types/event.type';
import EventForm from '../event-form/EventForm';
import { useAtomValue } from 'jotai';
import { useGetShuttleRoutesOfEventWithPagination } from '@/services/shuttleRoute.service';
import ShuttleScheduleView from './components/ShuttleScheduleView';
import CheerDiscountInfo from '../cheer/CheerDiscountInfo';
import { isCheerCampaignRunningAtom } from '../../store/cheerAtom';

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

  const openShuttleRoutes = useMemo(
    () => shuttleRoutes.filter((route) => route.status === 'OPEN'),
    [shuttleRoutes],
  );

  const isCheerCampaignRunning = useAtomValue(isCheerCampaignRunningAtom);

  return (
    <>
      {isCheerCampaignRunning && <CheerDiscountInfo />}
      <EventForm event={event} openShuttleRoutes={openShuttleRoutes} />
      {event.eventMinRoutePrice !== null && (
        <ShuttleScheduleView event={event} shuttleRoutes={shuttleRoutes} />
      )}
    </>
  );
};

export default EventContent;
