import TrendEventCard from './components/TrendEventCard';
import PinnedEventCard from './components/PinnedEventCard';
import { getEvents, getTopRecommendedEvents } from '@/services/event.service';
import { EventsViewEntity } from '@/types/event.type';

const Page = async () => {
  const recommendedEvents = await getTopRecommendedEvents(10);

  const pinnedEvents = await getEvents({
    status: 'OPEN,CLOSED',
    eventIsPinned: true,
  });

  const filteredEventsByStatus = (events: EventsViewEntity[]) =>
    events?.filter((event) =>
      event.eventStatus === 'CLOSED' && event.eventMinRoutePrice === null
        ? false
        : true,
    ) ?? [];

  const filteredRecommendedEvents = filteredEventsByStatus(recommendedEvents);
  const filteredPinnedEvents = filteredEventsByStatus(pinnedEvents);

  return (
    <>
      <TrendEventCard events={filteredRecommendedEvents} />
      <PinnedEventCard events={filteredPinnedEvents} />
    </>
  );
};

export default Page;
