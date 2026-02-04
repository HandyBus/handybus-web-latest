import TrendEventCard from './components/TrendEventCard';
import PinnedEventCard from './components/PinnedEventCard';
import { getEvents, getTopRecommendedEvents } from '@/services/event.service';

const Page = async () => {
  const recommendedEvents = await getTopRecommendedEvents(10);

  const pinnedEvents = await getEvents({
    status: 'STAND_BY,OPEN',
    eventIsPinned: true,
  });

  return (
    <>
      <TrendEventCard events={recommendedEvents} />
      <PinnedEventCard events={pinnedEvents} />
    </>
  );
};

export default Page;
