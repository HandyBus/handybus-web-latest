import Article from '@/components/article/Article';
import RedirectButton from '@/components/buttons/redirect-button/RedirectButton';
import DemandView from './components/DemandView';
import dynamic from 'next/dynamic';
import { getEvents } from '@/services/shuttle-operation.service';
const Empty = dynamic(() => import('@/app/demand/components/Empty'));

const Page = () => (
  <Article richTitle="수요 확인 중인 행사" showMore="/demand">
    <SubPage />
    <div className="w-full p-16">
      <RedirectButton
        description="찾고 있는 셔틀이 없나요?"
        href={process.env.NEXT_PUBLIC_NEW_SHUTTLE_FORM_URL}
      >
        원하는 셔틀 요청하기
      </RedirectButton>
    </div>
  </Article>
);

export default Page;

const SubPage = async () => {
  const events = await getEvents('OPEN');
  if (events.length === 0) {
    return <Empty />;
  }

  const sortedEvents = events
    .slice(0, 5)
    .sort((a, b) => a.eventName.localeCompare(b.eventName));

  return (
    <div className="flex flex-col">
      {sortedEvents.map((event) => (
        <DemandView key={event.eventId} event={event} />
      ))}
    </div>
  );
};
