import Footer from '@/components/footer/Footer';
import { getShuttle } from '@/services/shuttleOperation';
import DemandForm from './components/DemandForm';
import EventInfo from '@/components/event/components/EventInfo';
import EventImage from '@/components/event/components/EventImage';
import KakaoMap from '@/components/kakao-map/KakaoMap';
import BackButton from '@/components/buttons/back-button/BackButton';

interface Props {
  params: { id: string };
}

const Demand = async ({ params }: Props) => {
  const shuttle = await getShuttle(Number(params.id));

  return (
    <main className="relative overflow-y-hidden">
      <BackButton />
      <EventImage image={shuttle.image} />
      <EventInfo shuttle={shuttle} status={shuttle.status} type="SHUTTLE" />
      <KakaoMap
        placeName={shuttle.destination.name}
        latitude={shuttle.destination.latitude}
        longitude={shuttle.destination.longitude}
      />
      <DemandForm shuttle={shuttle} />
      <Footer />
      <div className="h-120" />
    </main>
  );
};

export default Demand;
