import { getOpenDemandings } from '../utils/fetch.util';
import Spacer from '@/components/shuttle-detail/components/Spacer';
import Footer from '@/components/footer/Footer';
import { ShuttleInfo } from '@/components/shuttle-detail/components/ShuttleInfo';
import BackButton from '@/components/shuttle-detail/components/BackButton';
import ShuttleImage from '@/components/shuttle-detail/components/ShuttleImage';
import KakaoMap from '@/components/shuttle-detail/components/KakaoMap';
import ShuttleForm from '@/components/shuttle-detail/components/ShuttleForm';

interface Props {
  params: { id: string };
}

const Demand = async ({ params }: Props) => {
  const data = await getOpenDemandings();
  const demandData = data.find((v) => v.shuttleId === Number(params.id));

  if (!demandData) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>; // NOTE: need to add error page
  }

  return (
    <main className="relative overflow-y-hidden">
      <BackButton />
      <ShuttleImage image={demandData.image} />
      <ShuttleInfo shuttle={demandData} status={demandData.status} />
      <KakaoMap
        placeName={demandData.destination.name}
        latitude={demandData.destination.latitude}
        longitude={demandData.destination.longitude}
      />
      <ShuttleForm
        shuttleId={demandData.shuttleId}
        type="DEMAND"
        data={demandData}
      />
      <Footer />
      <Spacer />
    </main>
  );
};

export default Demand;
