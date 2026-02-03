'use client';

import { useMemo } from 'react';
import { EventsViewEntity } from '@/types/event.type';
import EventForm from '../event-form/EventForm';
import { Provider as JotaiProvider } from 'jotai';
import { useGetShuttleRoutesOfEventWithPagination } from '@/services/shuttleRoute.service';
import ShuttleScheduleView from './components/ShuttleScheduleView';
import CheerUpDiscountInfo from '../cheer-up/CheerUpDiscountInfo';
import { useGetEventCheerCampaignByEventId } from '@/services/cheer.service';

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

  const { data: cheerCampaign } = useGetEventCheerCampaignByEventId(
    event.eventId,
  );

  // STAND_BY 상태이고 캠페인이 있을 때만 응원 UI 표시
  const shouldShowCheerCampaign =
    event.eventStatus === 'STAND_BY' && !!cheerCampaign;

  return (
    <JotaiProvider>
      {shouldShowCheerCampaign && (
        <CheerUpDiscountInfo eventId={event.eventId} />
      )}
      <EventForm event={event} shuttleRoutesOpen={shuttleRoutesOpen} />
      {event.eventMinRoutePrice !== null && (
        <ShuttleScheduleView event={event} shuttleRoutes={shuttleRoutes} />
      )}
    </JotaiProvider>
  );
};

export default EventContent;
