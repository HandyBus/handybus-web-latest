import DemandForm from './components/DemandForm';
import KakaoMap from '@/components/kakao-map/KakaoMap';
import { getEvent } from '@/services/shuttle-operation.service';
import EventInfo from './components/EventInfo';
import EventImage from '@/components/event-image/EventImage';
import Header from '@/components/header/Header';

interface Props {
  params: { id: string };
}

const Demand = async ({ params }: Props) => {
  const event = await getEvent(params.id);

  return (
    <>
      <Header />
      <main className="relative overflow-y-hidden">
        <EventImage image={event.eventImageUrl} />
        <EventInfo event={event} />
        <KakaoMap
          placeName={event.eventLocationName}
          latitude={event.eventLocationLatitude}
          longitude={event.eventLocationLongitude}
        />
        <DemandForm event={event} />
        <div className="h-120" />
      </main>
    </>
  );
};

export default Demand;
