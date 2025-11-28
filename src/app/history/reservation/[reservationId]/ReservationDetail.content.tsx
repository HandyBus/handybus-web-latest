'use client';

import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useGetUserReservation } from '@/services/reservation.service';
import Content from './components/Content';
import KakaoMapScript from '@/components/kakao-map/KakaoMapScript';
import { useState } from 'react';
import FirstVisitModal from './components/FirstVisitModal';
import { useRouter } from 'next/navigation';
import { useGetReservationTransferRequestWithReservationId } from '@/services/reservationTransferRequest.service';
import Header from '@/components/header/Header';

interface Props {
  reservationId: string;
}

const ReservationDetail = ({ reservationId }: Props) => {
  const router = useRouter();

  const [isKakaoScriptLoaded, setIsKakaoScriptLoaded] = useState(false);

  const { data: reservationDetail, isLoading: isReservationDetailLoading } =
    useGetUserReservation(reservationId);
  const {
    data: reservationTransferRequests,
    isLoading: isReservationTransferRequestLoading,
  } = useGetReservationTransferRequestWithReservationId(reservationId);
  const reservation = reservationDetail?.reservation;
  const payment = reservationDetail?.payment;

  const isLoading =
    isReservationDetailLoading || isReservationTransferRequestLoading;

  if (!isLoading && !reservation && !payment && !reservationTransferRequests) {
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
        {reservation &&
          payment &&
          event &&
          reservationTransferRequests &&
          isKakaoScriptLoaded && (
            <>
              <Content
                reservation={reservation}
                payment={payment}
                event={event}
                reservationTransferRequests={reservationTransferRequests}
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

export default ReservationDetail;
