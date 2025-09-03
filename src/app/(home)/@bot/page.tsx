import Help from './components/Help';
import AnnouncementPreview from './components/AnnouncementPreview';

const Page = () => (
  <>
    <Help />
    <Divider />
    <AnnouncementPreview />
  </>
);

export default Page;

const Divider = () => {
  return <div className="my-16 h-8 w-full bg-basic-grey-50" />;
};
