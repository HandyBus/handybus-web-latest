import TrendEventCard from './components/TrendEventCard';
import RecommendedEventCard from './components/RecommendedEventCard';
import { getEvents } from '@/services/event.service';
import { EventWithRoutesViewEntity } from '@/types/event.type';

const Page = async () => {
  const popularEvents = await getEvents({
    status: 'OPEN,CLOSED',
    orderBy: 'eventRecommendationScore',
    additionalOrderOptions: 'DESC',
  });

  const recommendedEvents = await getEvents({
    status: 'OPEN,CLOSED',
    eventIsPinned: true,
  });

  const filteredEventsByStatus = (events: EventWithRoutesViewEntity[]) =>
    events?.filter((event) =>
      event.eventStatus === 'CLOSED' && !event.hasOpenRoute ? false : true,
    ) ?? [];

  const filteredPopularEvents = filteredEventsByStatus(popularEvents);
  const filteredRecommendedEvents = filteredEventsByStatus(recommendedEvents);

  return (
    <>
      <TrendEventCard events={filteredPopularEvents} />
      <div className="my-16 h-8 w-full bg-basic-grey-50" />
      <RecommendedEventCard events={filteredRecommendedEvents} />
      <div className="my-16 h-8 w-full bg-basic-grey-50" />
    </>
  );
};

export default Page;
