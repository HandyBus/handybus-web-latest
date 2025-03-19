import Header from '@/components/header/Header';
import { MOCK_EVENT } from './mock.const';
import EventImage from './components/EventImage';
import EventInfo from './components/EventInfo';
import EventForm from './components/EventForm';

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
      </main>
    </>
  );
};

export default Page;
