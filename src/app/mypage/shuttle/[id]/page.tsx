'use client';

import AppBar from '@/components/app-bar/AppBar';
import ReservationCard from '../components/ReservationCard';
import ReservationInfoSection from './components/sections/ReservationInfoSection';
import HandySection from './components/sections/HandySection';
import ShuttleInfoSection from './components/sections/ShuttleInfoSection';
import PaymentInfoSection from './components/sections/PaymentInfoSection';
import RefundSection from './components/sections/RefundSection';
import TermsSection from './components/sections/TermsSection';
import RefundInfoSection from './components/sections/RefundInfoSection';
import RefundGuideSection from './components/sections/RefundGuideSection';
import RouteSection from './components/sections/RouteSection';
import { useRouter } from 'next/navigation';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useGetUserReservation } from '@/services/reservation';

interface Props {
  params: {
    id: string;
  };
}

const ShuttleDetail = ({ params }: Props) => {
  const { id } = params;
  const router = useRouter();
  const {
    data: reservation,
    isLoading,
    isSuccess,
  } = useGetUserReservation(Number(id));

  const isShuttleBusAssigned = Boolean(reservation?.shuttleBus);
  const isHandy = reservation?.handyStatus === 'ACCEPTED';
  const isCanceled = reservation?.cancelStatus === 'CANCEL_COMPLETE';

  if (isSuccess && !reservation) {
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
        {reservation && (
          <main className="grow">
            <ReservationCard reservation={reservation} />
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
                    name={reservation.passengers?.[0].name}
                  />
                )}
                {reservation.shuttleBus && (
                  <ShuttleInfoSection
                    type={reservation.shuttleBus.type}
                    name={reservation.shuttleBus.name}
                    busNumber={reservation.shuttleBus.number}
                    openChatLink={reservation.shuttleBus.openChatLink}
                  />
                )}
                <ReservationInfoSection
                  reservationId={reservation.reservationId}
                  trip={reservation.type}
                  shuttle={reservation.shuttle}
                  passengers={reservation.passengers}
                  handyStatus={reservation.handyStatus}
                  isShuttleBusAssigned={isShuttleBusAssigned}
                />
                <RouteSection
                  isShuttleBusAssigned={isShuttleBusAssigned}
                  reservationId={reservation.reservationId}
                  tripType={reservation.type}
                  hubs={reservation.shuttle.route.hubs}
                />
                <PaymentInfoSection
                  price={reservation.payment.principalAmount}
                  discount={reservation.payment.discountAmount}
                  finalPrice={reservation.payment.paymentAmount}
                  passengerCount={reservation.passengers.length}
                />
                <RefundSection id={id} />
                <TermsSection />
              </>
            ) : (
              <>
                <RefundInfoSection
                  requestedDate={
                    reservation.payment.refundRequests[0].createdAt
                  }
                  resolvedDate={reservation.payment.refundRequests[0].refundAt}
                  price={reservation.payment.paymentAmount}
                  refundPrice={
                    reservation.payment.refundRequests[0].refundAmount
                  }
                />
                <ReservationInfoSection
                  isExpandable
                  reservationId={reservation.reservationId}
                  trip={reservation.type}
                  shuttle={reservation.shuttle}
                  passengers={reservation.passengers}
                  handyStatus={reservation.handyStatus}
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
