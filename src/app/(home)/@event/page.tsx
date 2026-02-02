import TrendEventCard from './components/TrendEventCard';
import PinnedEventCard from './components/PinnedEventCard';
import { getEvents, getTopRecommendedEvents } from '@/services/event.service';
import { EventsViewEntity } from '@/types/event.type';

const Page = async () => {
  const recommendedEvents = await getTopRecommendedEvents(10);

  // TODO: @jujeon - 임시로 OPEN,CLOSED -> STAND_BY,OPEN 로 변경 - 추후 자세한 검토 필요
  const pinnedEvents = await getEvents({
    status: 'STAND_BY,OPEN',
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
