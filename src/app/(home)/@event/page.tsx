import ArticleV2 from '@/components/article/ArticleV2';
import EventsSwiperView from './EventsSwiperView';
import dayjs from 'dayjs';

const Page = () => {
  return (
    <>
      <TrendShuttleCard />
      <div className="my-16 h-8 w-full bg-basic-grey-50" />
      <RecommendedEventCard />
      <div className="my-16 h-8 w-full bg-basic-grey-50" />
    </>
  );
};

export default Page;

const TrendShuttleCard = () => {
  const isLoading = false;

  return (
    <section>
      <ArticleV2
        richTitle="실시간 인기 셔틀"
        titleClassName="text-20 leading-[140%]"
        showMore={'/event'}
      >
        {isLoading ? (
          <div className="h-408" />
        ) : (
          <div className="">
            <EventsSwiperView events={mock_event_data} type="TREND" />
          </div>
        )}
      </ArticleV2>
    </section>
  );
};

const RecommendedEventCard = () => {
  const isLoading = false;

  return (
    <section>
      <ArticleV2
        richTitle={`${dayjs().format('M')}월 추천 행사`}
        titleClassName="text-20 leading-[140%]"
        showMore={'/event'}
      >
        {isLoading ? (
          <div className="h-408" />
        ) : (
          <div className="">
            <EventsSwiperView events={mock_event_data} type="RECOMMAND" />
          </div>
        )}
      </ArticleV2>
    </section>
  );
};

const mock_event_data = [
  {
    id: 1,
    title: 'ATEEZ 2024 FANMEETING 〈ATINY&apos;S VOYAGE FROM A TO Z〉',
    date: '2024-03-20',
    location: '서울 강남구',
    price: '15,000원~',
    isSaleStarted: true,
    order: 1,
  },
  {
    id: 2,
    title: 'ATEEZ 2024 FANMEETING 〈ATINY&apos;S VOYAGE FROM A TO Z〉',
    date: '2024-03-21',
    location: '서울 송파구',
    price: '20,000원~',
    isSaleStarted: true,
    order: 2,
  },
  {
    id: 3,
    title: 'ATEEZ 2024 FANMEETING 〈ATINY&apos;S VOYAGE FROM A TO Z〉',
    date: '2024-03-22',
    location: '서울 마포구',
    price: '18,000원~',
    isSaleStarted: false,
    order: 3,
  },
  {
    id: 4,
    title: 'ATEEZ 2024 FANMEETING 〈ATINY&apos;S VOYAGE FROM A TO Z〉',
    date: '2024-03-23',
    location: '서울 서초구',
    price: '22,000원~',
    isSaleStarted: true,
    order: 4,
  },
  {
    id: 5,
    title: 'ATEEZ 2024 FANMEETING 〈ATINY&apos;S VOYAGE FROM A TO Z〉',
    date: '2024-03-24',
    location: '서울 영등포구',
    price: '17,000원~',
    isSaleStarted: false,
    order: 5,
  },
];
