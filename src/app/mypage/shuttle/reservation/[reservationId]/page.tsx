'use client';

import { useRouter } from 'next/navigation';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useGetUserReservation } from '@/services/reservation.service';
import { useGetShuttleBus } from '@/services/shuttleBus.service';
import Header from '@/components/header/Header';
import Content from './components/Content';
import KakaoMapScript from '@/components/kakao-map/KakaoMapScript';
import { createLoginRedirectPath } from '@/hooks/useAuthRouter';
import { getIsLoggedIn } from '@/utils/handleToken.util';
import { useEffect } from 'react';

interface Props {
  params: {
    reservationId: string;
  };
}

const Page = ({ params }: Props) => {
  const { reservationId } = params;
  const router = useRouter();
  const {
    data: reservationDetail,
    isLoading: isLoadingReservation,
    isError: isErrorReservation,
  } = useGetUserReservation(reservationId);
  const { data: shuttleBus, isLoading: isLoadingShuttleBus } = useGetShuttleBus(
    reservationDetail?.reservation.shuttleRoute.eventId ?? '',
    reservationDetail?.reservation.shuttleRoute.dailyEventId ?? '',
    reservationDetail?.reservation.shuttleRoute.shuttleRouteId ?? '',
    reservationDetail?.reservation.shuttleBusId ?? '',
  );

  const isLoading = !!(
    isLoadingReservation ||
    (reservationDetail &&
      reservationDetail.reservation.shuttleBusId &&
      isLoadingShuttleBus)
  );

  useEffect(() => {
    const isLoggedIn = getIsLoggedIn();

    if (!isLoggedIn) {
      const redirectUrl = createLoginRedirectPath(
        `/mypage/shuttle/reservation/${reservationId}`,
      );
      router.replace(redirectUrl);
      return;
    }

    if (isLoggedIn && !isLoading && !reservationDetail) {
      router.replace('/mypage/shuttle?type=reservation');
      return;
    }
  }, [isLoading, isErrorReservation, router, reservationId, reservationDetail]);

  return (
    <>
      <Header />
      <DeferredSuspense
        fallback={<Loading style="grow" />}
        isLoading={isLoading}
      >
        {reservationDetail && (
          <Content
            reservation={reservationDetail.reservation}
            payment={reservationDetail.payment}
            shuttleBus={shuttleBus}
          />
        )}
      </DeferredSuspense>
      <KakaoMapScript libraries={['services']} />
    </>
  );
};

export default Page;
