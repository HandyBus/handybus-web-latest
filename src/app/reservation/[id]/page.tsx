import Footer from '@/components/footer/Footer';
import { NOTICE_TYPE } from '@/components/notice-section/NoticeSection';
import NoticeSection from '@/components/notice-section/NoticeSection';
import { getRoute } from '@/services/shuttleOperation';
import ReservationForm from './components/ReservationForm';
import EventInfo from '@/components/event/components/EventInfo';
import EventImage from '@/components/event/components/EventImage';
import KakaoMap from '@/components/kakao-map/KakaoMap';
import BackButton from '@/components/buttons/back-button/BackButton';

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
      <EventImage image={route.shuttle.image} />
      <EventInfo shuttle={route.shuttle} status={route.status} type="ROUTE" />
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
      <div className="h-120" />
    </main>
  );
};

export default Page;
