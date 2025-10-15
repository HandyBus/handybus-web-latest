'use client';

import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useGetUserReservation } from '@/services/reservation.service';
import Header from '@/components/header/Header';
import Content from './components/Content';
import KakaoMapScript from '@/components/kakao-map/KakaoMapScript';

import { useState } from 'react';
import useAppRouter from '@/hooks/useAppRouter';
import FirstVisitModal from './components/FirstVisitModal';

interface Props {
  params: {
    reservationId: string;
  };
}

const Page = ({ params }: Props) => {
  const { reservationId } = params;
  const router = useAppRouter();

  const [isKakaoScriptLoaded, setIsKakaoScriptLoaded] = useState(false);

  const { data: reservationDetail, isLoading } =
    useGetUserReservation(reservationId);
  const reservation = reservationDetail?.reservation;
  const payment = reservationDetail?.payment;

  if (!isLoading && !reservation && !payment) {
    router.replace('/history?type=reservation');
    return;
  }

  const event = reservation?.shuttleRoute.event;

  const isTransferredReservation =
    reservation?.userId !== reservation?.originalUserId;

  return (
    <>
      <Header />
      <DeferredSuspense
        fallback={<Loading style="grow" />}
        isLoading={isLoading}
      >
        {reservation && payment && event && isKakaoScriptLoaded && (
          <>
            <Content
              reservation={reservation}
              payment={payment}
              event={event}
            />
            <FirstVisitModal
              reservationId={reservationId}
              isHidden={!isTransferredReservation}
            />
          </>
        )}
      </DeferredSuspense>
      <KakaoMapScript
        libraries={['services']}
        onReady={() => setIsKakaoScriptLoaded(true)}
      />
    </>
  );
};

export default Page;
