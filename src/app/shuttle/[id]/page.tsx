import { fetchAllShuttles } from '../util/fetch.util';
import { ShuttleRoute } from '@/types/shuttle.types';
import Spacer from '@/components/shuttle-detail/components/Spacer';
import { dateFormatter } from '@/components/shuttle-detail/shuttleDetailPage.utils';
import ShuttleImage from '@/components/shuttle-detail/components/ShuttleImage';
import KakaoMap from '@/components/shuttle-detail/components/KakaoMap';
import BackButton from '@/components/shuttle-detail/components/BackButton';
import { ShuttleInfoReservation } from '@/components/shuttle-detail/components/ShuttleInfo';
import ShuttleForm from '@/components/shuttle-detail/components/ShuttleForm';
import Footer from '@/components/footer/Footer';
import { NOTICE_TYPE } from '@/components/notice-section/NoticeSection';
import NoticeSection from '@/components/notice-section/NoticeSection';

interface Props {
  params: {
    id: number;
  };
}

const Shuttle = async ({ params }: Props) => {
  const data = await fetchAllShuttles();
  const reservData: ShuttleRoute[] = data.filter(
    (v) => v.shuttleId === Number(params.id),
  );
  const infoData = reservData[0]?.shuttle;

  return (
    <main className="relative overflow-y-hidden">
      <BackButton />
      <ShuttleImage image={infoData.image} />
      <ShuttleInfoReservation
        shuttleData={reservData}
        title={infoData.name}
        artist={infoData.participants.map((v) => v.name).join(', ')}
        date={dateFormatter(infoData.dailyShuttles)}
        location={infoData.destination.name}
      />
      <KakaoMap
        placeName={infoData.destination.name}
        latitude={infoData.destination.latitude}
        longitude={infoData.destination.longitude}
      />
      <ShuttleForm
        shuttleId={infoData.shuttleId}
        type={'RESERVATION'}
        data={infoData}
        reservData={reservData}
      />
      <NoticeSection type={NOTICE_TYPE.CANCELLATION_AND_REFUND} />
      <NoticeSection type={NOTICE_TYPE.TERM_AND_CONDITION} />
      <Footer />
      <Spacer />
    </main>
  );
};

export default Shuttle;
