import TrendEventCard from './components/TrendEventCard';
import RecommendedEventCard from './components/RecommendedEventCard';

const Page = () => {
  return (
    <>
      <TrendEventCard />
      <div className="my-16 h-8 w-full bg-basic-grey-50" />
      <RecommendedEventCard />
      <div className="my-16 h-8 w-full bg-basic-grey-50" />
    </>
  );
};

export default Page;
