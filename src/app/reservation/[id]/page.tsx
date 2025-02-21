import { NOTICE_TYPE } from '@/components/notice-section/NoticeSection';
import NoticeSection from '@/components/notice-section/NoticeSection';
import ReservationForm from './components/ReservationForm';
import KakaoMap from '@/components/kakao-map/KakaoMap';
import { getShuttleRoute } from '@/services/shuttle-operation.service';
import RouteInfo from './components/RouteInfo';
import EventImage from '@/components/event-image/EventImage';
import Header from '@/components/header/Header';

interface Props {
  params: {
    id: string; // eventId
  };
  searchParams: {
    dailyEventId: string;
    shuttleRouteId: string;
  };
}

const Page = async ({ params, searchParams }: Props) => {
  const dailyEventId = searchParams.dailyEventId;
  const shuttleRouteId = searchParams.shuttleRouteId;
  const shuttleRoute = await getShuttleRoute(
    params.id,
    dailyEventId,
    shuttleRouteId,
  );

  return (
    <>
      <Header />
      <main className="relative overflow-y-hidden">
        <EventImage image={shuttleRoute.event.eventImageUrl} />
        <RouteInfo route={shuttleRoute} />
        <KakaoMap
          placeName={
            shuttleRoute.toDestinationShuttleRouteHubs?.[0]?.name ?? ''
          }
          latitude={
            shuttleRoute.toDestinationShuttleRouteHubs?.[0]?.latitude ?? 0
          }
          longitude={
            shuttleRoute.toDestinationShuttleRouteHubs?.[0]?.longitude ?? 0
          }
        />
        <ReservationForm
          event={shuttleRoute.event}
          initialDailyEventId={dailyEventId}
          initialRouteId={shuttleRouteId}
        />
        <NoticeSection type={NOTICE_TYPE.CANCELLATION_AND_REFUND} />
        <NoticeSection type={NOTICE_TYPE.TERM_AND_CONDITION} />
        <div className="h-120" />
      </main>
    </>
  );
};

export default Page;
