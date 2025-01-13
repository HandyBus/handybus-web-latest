'use client';

import AppBar from '@/components/app-bar/AppBar';
import ReservationCard from '../components/ReservationCard';
import ReservationInfoSection from './components/sections/ReservationInfoSection';
import HandySection from './components/sections/HandySection';
import BusInfoSection from './components/sections/BusInfoSection';
import PaymentInfoSection from './components/sections/PaymentInfoSection';
import RefundSection from './components/sections/RefundSection';
import TermsSection from './components/sections/TermsSection';
import RefundInfoSection from './components/sections/RefundInfoSection';
import RefundGuideSection from './components/sections/RefundGuideSection';
import RouteSection from './components/sections/RouteSection';
import { useRouter } from 'next/navigation';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useGetUserReservation } from '@/services/v2-temp/user-management.service';
import { useGetShuttleBus } from '@/services/v2-temp/shuttle-operation.service';

interface Props {
  params: {
    id: string;
  };
}

const ShuttleDetail = ({ params }: Props) => {
  const { id } = params;
  const router = useRouter();
  const { data, isLoading, isSuccess } = useGetUserReservation(Number(id));
  const { data: shuttleBus } = useGetShuttleBus(
    data?.reservation.shuttleRoute.eventId ?? 0,
    data?.reservation.shuttleRoute.dailyEventId ?? 0,
    data?.reservation.shuttleRoute.shuttleRouteId ?? 0,
    data?.reservation.shuttleBusId ?? 0,
  );

  const isShuttleBusAssigned = Boolean(data?.reservation?.shuttleBusId);
  const isHandy = data?.reservation?.handyStatus === 'ACCEPTED';
  const isCanceled = data?.reservation?.cancelStatus === 'CANCEL_COMPLETE';

  if (isSuccess && !data) {
    router.replace('/mypage/shuttle?type=current');
    return <div className="h-[100dvh]" />;
  }

  return (
    <>
      <AppBar>예약 상세 보기</AppBar>
      <DeferredSuspense
        fallback={<Loading style="grow" />}
        isLoading={isLoading}
      >
        {data && (
          <main className="grow">
            <ReservationCard reservation={data.reservation} />
            {!isShuttleBusAssigned && (
              <section className="m-16 rounded-[10px] bg-primary-50 p-16 text-14 font-400 text-grey-800">
                <p>
                  현재 셔틀 정보, 기사님 정보, 핸디 정보 등을 결정하고 있어요.
                  확정되면 알림톡을 전송해드릴게요.
                </p>
              </section>
            )}
            {!isCanceled ? (
              <>
                {isShuttleBusAssigned && isHandy && (
                  <HandySection
                    id={id}
                    name={data.reservation.passengers?.[0].passengerName ?? ''}
                  />
                )}
                {data.reservation?.shuttleBusId && shuttleBus && (
                  <BusInfoSection shuttleBus={shuttleBus} />
                )}
                <ReservationInfoSection
                  reservation={data.reservation}
                  isShuttleBusAssigned={isShuttleBusAssigned}
                />
                <RouteSection
                  isShuttleBusAssigned={isShuttleBusAssigned}
                  reservationId={data.reservation.reservationId}
                  tripType={data.reservation.type}
                  toDestinationHubs={
                    data.reservation.shuttleRoute
                      .toDestinationShuttleRouteHubs ?? []
                  }
                  fromDestinationHubs={
                    data.reservation.shuttleRoute
                      .fromDestinationShuttleRouteHubs ?? []
                  }
                  toDestinationHubId={
                    data.reservation.toDestinationShuttleRouteHubId ?? 0
                  }
                  fromDestinationHubId={
                    data.reservation.fromDestinationShuttleRouteHubId ?? 0
                  }
                />
                <PaymentInfoSection
                  price={data.reservation.paymentPrincipalAmount ?? 0}
                  discount={data.reservation.paymentDiscountAmount ?? 0}
                  finalPrice={data.reservation.paymentAmount ?? 0}
                  passengerCount={data.reservation.passengers?.length ?? 0}
                />
                <RefundSection id={id} />
                <TermsSection />
              </>
            ) : (
              <>
                <RefundInfoSection
                  requestedDate={data.payment.refundRequests?.[0].createdAt}
                  resolvedDate={data.payment.refundRequests?.[0].refundAt}
                  price={data.payment.paymentAmount}
                  refundPrice={
                    data.payment.refundRequests?.[0].afterRefundableAmount ?? 0
                  }
                />
                <ReservationInfoSection
                  reservation={data.reservation}
                  isExpandable
                  isShuttleBusAssigned={isShuttleBusAssigned}
                />
                <RefundGuideSection />
              </>
            )}
          </main>
        )}
      </DeferredSuspense>
    </>
  );
};

export default ShuttleDetail;
