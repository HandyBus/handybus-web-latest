import Header from '@/components/header/Header';
import { MOCK_EVENT } from './mock.const';
import EventImage from './components/EventImage';
import EventInfo from './components/EventInfo';
import EventForm from './components/EventForm';
import EventGuidelines from './components/EventGuidelines';

const Page = () => {
  const event = MOCK_EVENT;

  return (
    <>
      <Header />
      <main>
        <EventImage
          eventImageUrl={event.eventImageUrl}
          eventName={event.eventName}
        />
        <EventInfo event={event} />
        <EventForm />
        <EventGuidelines />
        <div className="h-100 bg-basic-grey-50" />
      </main>
    </>
  );
};

export default Page;
