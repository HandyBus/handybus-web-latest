import Spacer from '@/components/shuttle-detail/components/Spacer';
import Footer from '@/components/footer/Footer';
import { ShuttleInfo } from '@/components/shuttle-detail/components/ShuttleInfo';
import BackButton from '@/components/shuttle-detail/components/BackButton';
import ShuttleImage from '@/components/shuttle-detail/components/ShuttleImage';
import KakaoMap from '@/components/shuttle-detail/components/KakaoMap';
import { getShuttle } from '@/services/shuttleOperation';
import DemandForm from './components/DemandForm';

interface Props {
  params: { id: string };
}

const Demand = async ({ params }: Props) => {
  const shuttle = await getShuttle(Number(params.id));

  return (
    <main className="relative overflow-y-hidden">
      <BackButton />
      <ShuttleImage image={shuttle.image} />
      <ShuttleInfo shuttle={shuttle} status={shuttle.status} type="SHUTTLE" />
      <KakaoMap
        placeName={shuttle.destination.name}
        latitude={shuttle.destination.latitude}
        longitude={shuttle.destination.longitude}
      />
      <DemandForm shuttle={shuttle} />
      <Footer />
      <Spacer />
    </main>
  );
};

export default Demand;
