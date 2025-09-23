'use client';

import { useRouter } from 'next/navigation';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useGetUserReservation } from '@/services/reservation.service';
import Header from '@/components/header/Header';
import Content from './components/Content';
import KakaoMapScript from '@/components/kakao-map/KakaoMapScript';
import FirstVisitModal from '@/app/mypage/shuttle/reservation/[reservationId]/components/FirstVisitModal';
import { useState } from 'react';

interface Props {
  params: {
    reservationId: string;
  };
}

const Page = ({ params }: Props) => {
  const { reservationId } = params;
  const router = useRouter();

  const [isKakaoScriptLoaded, setIsKakaoScriptLoaded] = useState(false);

  const { data: reservationDetail, isLoading } =
    useGetUserReservation(reservationId);
  const reservation = reservationDetail?.reservation;
  const payment = reservationDetail?.payment;

  const isShuttleRouteEnded = Boolean(
    reservation?.shuttleRoute.status === 'ENDED' ||
      reservation?.shuttleRoute.status === 'CANCELLED' ||
      reservation?.shuttleRoute.status === 'INACTIVE',
  );
  const isReservationCanceled = Boolean(
    reservation?.reservationStatus === 'CANCEL',
  );

  if (!isLoading && !reservation && !payment) {
    router.replace('/mypage/shuttle?type=reservation');
    return;
  }

  const event = reservation?.shuttleRoute.event;
  const dailyEvent = event?.dailyEvents.find(
    (dailyEvent) =>
      dailyEvent.dailyEventId === reservation?.shuttleRoute.dailyEventId,
  );

  return (
    <>
      <Header />
      <DeferredSuspense
        fallback={<Loading style="grow" />}
        isLoading={isLoading}
      >
        {reservation &&
          payment &&
          event &&
          dailyEvent &&
          isKakaoScriptLoaded && (
            <Content
              reservation={reservation}
              payment={payment}
              event={event}
              dailyEvent={dailyEvent}
            />
          )}
      </DeferredSuspense>
      <KakaoMapScript
        libraries={['services']}
        onReady={() => setIsKakaoScriptLoaded(true)}
      />
      <FirstVisitModal
        reservationId={reservationId}
        isHidden={isShuttleRouteEnded || isReservationCanceled}
      />
    </>
  );
};

export default Page;
