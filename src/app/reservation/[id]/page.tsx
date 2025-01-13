import Footer from '@/components/footer/Footer';
import { NOTICE_TYPE } from '@/components/notice-section/NoticeSection';
import NoticeSection from '@/components/notice-section/NoticeSection';
import ReservationForm from './components/ReservationForm';
import EventInfo from '@/components/event/components/EventInfo';
import EventImage from '@/components/event/components/EventImage';
import KakaoMap from '@/components/kakao-map/KakaoMap';
import BackButton from '@/components/buttons/back-button/BackButton';
import { getShuttleRoute } from '@/services/v2-temp/shuttle-operation.service';

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
  const shuttleRoute = await getShuttleRoute(
    Number(params.id),
    dailyShuttleId,
    shuttleRouteId,
  );

  return (
    <main className="relative overflow-y-hidden">
      <BackButton />
      <EventImage image={shuttleRoute.event.eventImageUrl} />
      <EventInfo
        event={shuttleRoute.event}
        status={shuttleRoute.status}
        type="ROUTE"
      />
      <KakaoMap
        placeName={shuttleRoute.toDestinationShuttleRouteHubs?.[0]?.name ?? ''}
        latitude={
          shuttleRoute.toDestinationShuttleRouteHubs?.[0]?.latitude ?? 0
        }
        longitude={
          shuttleRoute.toDestinationShuttleRouteHubs?.[0]?.longitude ?? 0
        }
      />
      <ReservationForm
        event={shuttleRoute.event}
        initialDailyEventId={dailyShuttleId}
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
