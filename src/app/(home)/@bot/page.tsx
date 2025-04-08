import Help from './components/Help';
import NoticeBoard from './components/NoticeBoard';
import PromotionReview from './components/PromotionReviews';

const Page = () => (
  <>
    <Help />
    <div className="my-16 h-8 w-full bg-basic-grey-50" />
    <NoticeBoard />
    <PromotionReview />
  </>
);

export default Page;
