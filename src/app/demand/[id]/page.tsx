import Footer from '@/components/footer/Footer';
import DemandForm from './components/DemandForm';
import EventInfo from '@/components/event/components/EventInfo';
import EventImage from '@/components/event/components/EventImage';
import KakaoMap from '@/components/kakao-map/KakaoMap';
import BackButton from '@/components/buttons/back-button/BackButton';
import { getEvent } from '@/services/v2-temp/shuttle-operation.service';

interface Props {
  params: { id: string };
}

const Demand = async ({ params }: Props) => {
  const event = await getEvent(Number(params.id));

  return (
    <main className="relative overflow-y-hidden">
      <BackButton />
      <EventImage image={event.eventImageUrl} />
      <EventInfo event={event} status={event.eventStatus} type="EVENT" />
      <KakaoMap
        placeName={event.eventLocationName}
        latitude={event.eventLocationLatitude}
        longitude={event.eventLocationLongitude}
      />
      <DemandForm event={event} />
      <Footer />
      <div className="h-120" />
    </main>
  );
};

export default Demand;
