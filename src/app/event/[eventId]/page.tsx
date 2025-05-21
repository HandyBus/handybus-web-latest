import Header from '@/components/header/Header';
import EventImage from './components/EventImage';
import EventInfo from './components/EventInfo';
import EventForm from './components/event-form/EventForm';
import EventGuidelines from './components/EventGuidelines';
import { getEvent } from '@/services/event.service';

interface Props {
  params: {
    eventId: string;
  };
}

const Page = async ({ params }: Props) => {
  const event = await getEvent(params.eventId);

  return (
    <>
      <Header />
      <main>
        <EventImage
          eventImageUrl={event.eventImageUrl}
          eventName={event.eventName}
        />
        <EventInfo event={event} />
        <EventForm event={event} />
        <EventGuidelines />
        <div className="h-100 bg-basic-grey-50" />
      </main>
    </>
  );
};

export default Page;
