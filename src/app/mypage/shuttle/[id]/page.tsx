'use client';

import AppBar from '@/components/app-bar/AppBar';
import ReservationCard from '../components/ReservationCard';
import ReservationInfoSection from './components/sections/ReservationInfoSection';
import HandySection from './components/sections/HandySection';
import ShuttleInfoSection from './components/sections/ShuttleInfoSection';
// import PaymentInfoSection from './components/sections/PaymentInfoSection';
import RefundSection from './components/sections/RefundSection';
import TermsSection from './components/sections/TermsSection';
import RefundInfoSection from './components/sections/RefundInfoSection';
import RefundGuideSection from './components/sections/RefundGuideSection';
import RouteSection from './components/sections/RouteSection';
import { useGetUserDashboard } from '@/services/users';
import { useRouter } from 'next/navigation';

interface Props {
  params: {
    id: string;
  };
}

const ShuttleDetail = ({ params }: Props) => {
  const { id } = params;
  const router = useRouter();
  const { data, isLoading } = useGetUserDashboard();
  const reservation = data?.reservations.current.find(
    (reservation) => reservation.reservationId === Number(id),
  );

  const isShuttleAssigned = !(
    reservation?.shuttleBus === undefined && reservation?.shuttleBus === null
  );
  const isHandy = reservation?.handyStatus === 'ACCEPTED';
  const isCanceled = reservation?.cancelStatus === 'CANCEL_COMPLETE';

  if (isLoading) {
    return <div className="h-[100dvh]" />;
  }
  if (!reservation) {
    router.replace('/mypage/shuttle?type=current');
    return <div className="h-[100dvh]" />;
  }

  return (
    <>
      <AppBar>예약 상세 보기</AppBar>
      <main className="grow">
        <ReservationCard reservation={reservation} />
        {!isShuttleAssigned && (
          <section className="m-16 rounded-[10px] bg-primary-50 p-16 text-14 font-400 text-grey-800">
            <p>
              현재 셔틀 정보, 기사님 정보, 핸디 정보 등을 결정하고 있어요.
              확정되면 알림톡을 전송해드릴게요.
            </p>
          </section>
        )}
        {!isCanceled ? (
          <>
            {isHandy && (
              <HandySection id={id} name={reservation.passengers?.[0].name} />
            )}
            {reservation.shuttleBus && (
              <ShuttleInfoSection
                name={reservation.shuttleBus.name}
                busNumber={reservation.shuttleBus.number}
                openChatLink={reservation.shuttleBus.openChatLink}
              />
            )}
            <ReservationInfoSection
              trip={reservation.type}
              shuttle={reservation.shuttle}
              passengers={reservation.passengers}
              handyStatus={reservation.handyStatus}
              isShuttleAssigned={isShuttleAssigned}
            />
            <RouteSection />
            {/* TODO: 결제 연동된 이후에 주석 해제 */}
            {/* <PaymentInfoSection
              price={reservation.payment.principalAmount}
              discount={reservation.payment.discountAmount}
              finalPrice={reservation.payment.paymentAmount}
              passengerCount={reservation.passengers.length}
            /> */}
            <RefundSection id={id} />
            <TermsSection />
          </>
        ) : (
          <>
            <RefundInfoSection
              requestedDate={reservation.payment.refundRequests[0].createdAt}
              resolvedDate={reservation.payment.refundRequests[0].refundAt}
              price={reservation.payment.paymentAmount}
              refundPrice={reservation.payment.refundRequests[0].refundAmount}
            />
            <ReservationInfoSection
              isExpandable
              trip={reservation.type}
              shuttle={reservation.shuttle}
              passengers={reservation.passengers}
              handyStatus={reservation.handyStatus}
              isShuttleAssigned={isShuttleAssigned}
            />
            <RefundGuideSection />
          </>
        )}
      </main>
    </>
  );
};

export default ShuttleDetail;
