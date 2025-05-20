import TrendEventCard from './components/TrendEventCard';
import RecommendedEventCard from './components/RecommendedEventCard';
import { getEvents } from '@/services/event.service';

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

  return (
    <>
      <TrendEventCard events={popularEvents} />
      <div className="my-16 h-8 w-full bg-basic-grey-50" />
      <RecommendedEventCard events={recommendedEvents} />
      <div className="my-16 h-8 w-full bg-basic-grey-50" />
    </>
  );
};

export default Page;
