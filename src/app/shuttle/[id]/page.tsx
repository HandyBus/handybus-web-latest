import Spacer from '@/components/shuttle-detail/components/Spacer';
import ShuttleImage from '@/components/shuttle-detail/components/ShuttleImage';
import KakaoMap from '@/components/shuttle-detail/components/KakaoMap';
import BackButton from '@/components/shuttle-detail/components/BackButton';
import ShuttleForm from '@/components/shuttle-detail/components/ShuttleForm';
import Footer from '@/components/footer/Footer';
import { NOTICE_TYPE } from '@/components/notice-section/NoticeSection';
import NoticeSection from '@/components/notice-section/NoticeSection';
import { getRoute, getRoutes } from '@/services/shuttleOperation';
import { ShuttleInfo } from '@/components/shuttle-detail/components/ShuttleInfo';

interface Props {
  params: {
    id: string;
  };
  searchParams: {
    dailyShuttleId: string;
    shuttleRouteId: string;
  };
}

const Shuttle = async ({ params, searchParams }: Props) => {
  const route = await getRoute({
    shuttleId: Number(params.id),
    dailyShuttleId: Number(searchParams.dailyShuttleId),
    shuttleRouteId: Number(searchParams.shuttleRouteId),
  });

  const routes = await getRoutes(
    Number(params.id),
    Number(searchParams.dailyShuttleId),
  );

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
      <ShuttleForm
        shuttleId={route.shuttle.shuttleId}
        type={'RESERVATION'}
        shuttle={route.shuttle}
        routes={routes}
      />
      <NoticeSection type={NOTICE_TYPE.CANCELLATION_AND_REFUND} />
      <NoticeSection type={NOTICE_TYPE.TERM_AND_CONDITION} />
      <Footer />
      <Spacer />
    </main>
  );
};

export default Shuttle;
