import Article from '@/components/article/Article';
import DemandView from './components/DemandView';
import dynamic from 'next/dynamic';
import { getEvents } from '@/services/event.service';
import { toSorted } from '@/app/demand/utils/toSorted.util';
const Empty = dynamic(() => import('@/app/demand/components/Empty'));

const Page = () => (
  <Article richTitle="수요조사 진행 중" showMore="/demand">
    <SubPage />
  </Article>
);

export default Page;

const SubPage = async () => {
  const events = await getEvents('OPEN');
  const sortedEvents = toSorted(events, '행사 임박순');
  const slicedEvents = sortedEvents.slice(0, 5);

  if (events.length === 0) {
    return <Empty />;
  }

  return (
    <div className="flex flex-col">
      {slicedEvents.map((event) => (
        <DemandView key={event.eventId} event={event} />
      ))}
    </div>
  );
};
