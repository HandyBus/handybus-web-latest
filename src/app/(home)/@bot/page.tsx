import Help from './components/Help';
import AnnouncementPreview from './components/AnnouncementPreview';
import PromotionReview from './components/PromotionReviews';

const Page = () => (
  <>
    <Help />
    <Divider />
    <AnnouncementPreview />
    <Divider />
    <PromotionReview />
  </>
);

export default Page;

const Divider = () => {
  return <div className="my-16 h-8 w-full bg-basic-grey-50" />;
};
