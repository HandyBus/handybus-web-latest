import Article from '@/components/article/Article';
import DemandView from './components/DemandView';
import dynamic from 'next/dynamic';
import { getEvents } from '@/services/event.service';
import { toSorted } from '@/app/demand/utils/toSorted.util';
import ChevronRightEm from 'public/icons/chevron-right-em.svg';
import Link from 'next/link';
const Empty = dynamic(() => import('@/app/demand/components/Empty'));

const Page = () => (
  <section className="flex flex-col gap-12">
    <Article
      richTitle="수요조사 진행 중"
      titleClassName="text-20"
      showMore="/demand"
    >
      <SubPage />
    </Article>
    <Link
      href="/demand"
      className="mx-[16px] flex h-44 w-[calc(100%-32px)] flex-row items-center justify-center gap-[2px] whitespace-nowrap rounded-full bg-grey-50 p-12 py-8 text-center text-16 font-500 leading-[25.6px] text-grey-700 active:bg-grey-100 "
    >
      모든 수요조사 보기
      <ChevronRightEm className="h-16 w-16 stroke-2" />
    </Link>
  </section>
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
