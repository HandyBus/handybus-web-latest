import Spacer from '@/components/shuttle-detail/components/Spacer';
import ShuttleImage from '@/components/shuttle-detail/components/ShuttleImage';
import KakaoMap from '@/components/shuttle-detail/components/KakaoMap';
import BackButton from '@/components/shuttle-detail/components/BackButton';
import Footer from '@/components/footer/Footer';
import { NOTICE_TYPE } from '@/components/notice-section/NoticeSection';
import NoticeSection from '@/components/notice-section/NoticeSection';
import { getRoute } from '@/services/shuttleOperation';
import { ShuttleInfo } from '@/components/shuttle-detail/components/ShuttleInfo';
import ReservationForm from './components/ReservationForm';

interface Props {
  params: {
    id: string; // shuttleId
  };
  searchParams: {
    dailyShuttleId: string;
    shuttleRouteId: string;
  };
}

const Page = async ({ params, searchParams }: Props) => {
  const dailyShuttleId = Number(searchParams.dailyShuttleId);
  const shuttleRouteId = Number(searchParams.shuttleRouteId);
  const route = await getRoute({
    shuttleId: Number(params.id),
    dailyShuttleId,
    shuttleRouteId,
  });

  return (
    <main className="relative overflow-y-hidden">
      <BackButton />
      <ShuttleImage image={route.shuttle.image} />
      <ShuttleInfo shuttle={route.shuttle} status={route.status} type="ROUTE" />
      <KakaoMap
        placeName={route.shuttle.destination.name}
        latitude={route.shuttle.destination.latitude}
        longitude={route.shuttle.destination.longitude}
      />
      <ReservationForm
        shuttle={route.shuttle}
        initialDailyShuttleId={dailyShuttleId}
        initialRouteId={shuttleRouteId}
      />
      <NoticeSection type={NOTICE_TYPE.CANCELLATION_AND_REFUND} />
      <NoticeSection type={NOTICE_TYPE.TERM_AND_CONDITION} />
      <Footer />
      <Spacer />
    </main>
  );
};

export default Page;
