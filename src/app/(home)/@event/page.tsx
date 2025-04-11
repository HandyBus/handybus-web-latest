import TrendShuttleCard from './components/TrendShuttleCard';
import RecommendedEventCard from './components/RecommendedEventCard';

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
