import Header from '@/components/header/Header';
import EventImage from './components/EventImage';
import EventInfo from './components/EventInfo';
import EventForm from './components/EventForm';
import EventGuidelines from './components/EventGuidelines';
import { getEvent } from '@/services/event.service';
import { getShuttleRoutesOfEvent } from '@/services/shuttleRoute.service';

interface Props {
  params: {
    eventId: string;
  };
}

const Page = async ({ params }: Props) => {
  const event = await getEvent(params.eventId);
  const { shuttleRoutes } = event.hasOpenRoute
    ? await getShuttleRoutesOfEvent({
        eventId: params.eventId,
        status: 'OPEN',
      })
    : { shuttleRoutes: [] };

  return (
    <>
      <Header />
      <main>
        <EventImage
          eventImageUrl={event.eventImageUrl}
          eventName={event.eventName}
        />
        <EventInfo event={event} />
        <EventForm event={event} routes={shuttleRoutes} />
        <EventGuidelines />
        <div className="h-100 bg-basic-grey-50" />
      </main>
    </>
  );
};

export default Page;
