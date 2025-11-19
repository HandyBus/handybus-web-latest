'use client';

import TrendEventCard from './components/TrendEventCard';
import PinnedEventCard from './components/PinnedEventCard';
import { EventsViewEntity } from '@/types/event.type';
import { useGetTopRecommendedEvents } from '@/services/event.service';
import { useGetEvents } from '@/services/event.service';

const EventSection = () => {
  const { data: recommendedEvents } = useGetTopRecommendedEvents();
  const { data: pinnedEvents } = useGetEvents({
    status: 'OPEN,CLOSED',
    eventIsPinned: true,
  });
  const filteredEventsByStatus = (events: EventsViewEntity[]) =>
    events?.filter((event) =>
      event.eventStatus === 'CLOSED' && event.eventMinRoutePrice === null
        ? false
        : true,
    ) ?? [];

  const filteredRecommendedEvents = filteredEventsByStatus(
    recommendedEvents || [],
  );
  const filteredPinnedEvents = filteredEventsByStatus(pinnedEvents || []);

  return (
    <>
      <TrendEventCard events={filteredRecommendedEvents} />
      <PinnedEventCard events={filteredPinnedEvents} />
    </>
  );
};

export default EventSection;
