'use client';

import { useRouter } from 'next/navigation';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useGetUserReservation } from '@/services/reservation.service';
import { useGetShuttleBus } from '@/services/shuttleBus.service';
import Header from '@/components/header/Header';
import Content from './components/Content';

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
    isSuccess: isSuccessReservation,
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

  if (isSuccessReservation && !reservationDetail) {
    router.replace('/mypage/shuttle?type=reservation');
    return <div className="h-[100dvh]" />;
  }

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
    </>
  );
};

export default Page;
