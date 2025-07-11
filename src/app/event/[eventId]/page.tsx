import Header from '@/components/header/Header';
import EventImage from './components/EventImage';
import EventInfo from './components/EventInfo';
import EventGuidelines from './components/EventGuidelines';
import { getEvent } from '@/services/event.service';
import EventContent from './components/EventContent';
import EventOverview from './components/EventOverview';
import EventModal from './components/EventModal';

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
        <EventContent event={event} />
        <EventOverview />
        <EventGuidelines />
        <EventModal eventId={params.eventId} />
        <div className="h-100 bg-basic-grey-50" />
      </main>
    </>
  );
};

export default Page;
