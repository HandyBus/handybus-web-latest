'use client';

import ReservationCard from '../components/ReservationCard';
import ReservationInfoSection from './components/sections/ReservationInfoSection';
import HandySection from './components/sections/HandySection';
import BusInfoSection from './components/sections/BusInfoSection';
import PaymentInfoSection from './components/sections/PaymentInfoSection';
import TermsSection from './components/sections/TermsSection';
import RefundInfoSection from './components/sections/RefundInfoSection';
import RefundGuideSection from './components/sections/RefundGuideSection';
import RouteSection from './components/sections/RouteSection';
import { useRouter } from 'next/navigation';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useGetUserReservation } from '@/services/reservation.service';
import { useGetShuttleBus } from '@/services/shuttleBus.service';
import Header from '@/components/header/Header';
import dayjs from 'dayjs';

interface Props {
  params: {
    id: string;
  };
}

const ShuttleDetail = ({ params }: Props) => {
  const { id } = params;
  const router = useRouter();
  const { data, isLoading, isSuccess } = useGetUserReservation(id);
  const { data: shuttleBus } = useGetShuttleBus(
    data?.reservation.shuttleRoute.eventId ?? '',
    data?.reservation.shuttleRoute.dailyEventId ?? '',
    data?.reservation.shuttleRoute.shuttleRouteId ?? '',
    data?.reservation.shuttleBusId ?? '',
  );

  const isShuttleBusAssigned = Boolean(data?.reservation?.shuttleBusId);
  const isCanceled = data?.reservation?.cancelStatus === 'CANCEL_COMPLETE';
  const isHandyAssigned = data?.reservation?.handyStatus === 'ACCEPTED';
  const date = data?.reservation?.shuttleRoute.event.dailyEvents.find(
    (dailyEvent) =>
      dailyEvent.dailyEventId === data?.reservation?.shuttleRoute.dailyEventId,
  )?.date;
  const parsedDate = date ? dayjs(date).tz() : null;

  if (isSuccess && !data) {
    router.replace('/mypage/shuttle?type=current');
    return <div className="h-[100dvh]" />;
  }

  return (
    <>
      <Header />
      <DeferredSuspense
        fallback={<Loading style="grow" />}
        isLoading={isLoading}
      >
        {data && (
          <main className="grow">
            <ReservationCard reservation={data.reservation} />
            {!isShuttleBusAssigned && !isCanceled && !isHandyAssigned && (
              <section className="m-16 rounded-[10px] bg-brand-primary-50 p-16 text-14 font-400 text-basic-grey-700">
                <p>
                  현재 셔틀 정보, 기사님 정보, 핸디 정보 등을 결정하고 있어요.
                  확정되면 알림톡을 전송해드릴게요.
                </p>
              </section>
            )}
            {!isCanceled ? (
              <>
                {isShuttleBusAssigned &&
                  shuttleBus?.openChatLink &&
                  shuttleBus && <BusInfoSection shuttleBus={shuttleBus} />}
                <ReservationInfoSection
                  reservation={data.reservation}
                  handyStatus={data.reservation.handyStatus}
                />
                <HandySection
                  reservationId={data.reservation.reservationId}
                  name={data.reservation.userNickname ?? ''}
                  handyStatus={data.reservation.handyStatus}
                />
                <RouteSection
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
                    data.reservation.toDestinationShuttleRouteHubId ?? ''
                  }
                  fromDestinationHubId={
                    data.reservation.fromDestinationShuttleRouteHubId ?? ''
                  }
                  date={parsedDate}
                />
                <PaymentInfoSection
                  price={data.reservation.paymentPrincipalAmount ?? 0}
                  discount={data.reservation.paymentDiscountAmount ?? 0}
                  finalPrice={data.reservation.paymentAmount ?? 0}
                  passengerCount={data.reservation.passengerCount ?? 0}
                />
                <TermsSection />
              </>
            ) : (
              <>
                <RefundInfoSection
                  requestedDate={
                    data.payment.refundRequests?.[0].createdAt
                      ? dayjs(data.payment.refundRequests[0].createdAt).tz()
                      : null
                  }
                  resolvedDate={
                    data.payment.refundRequests?.[0].refundAt
                      ? dayjs(data.payment.refundRequests[0].refundAt).tz()
                      : null
                  }
                  price={data.payment.paymentAmount}
                  refundPrice={
                    data.payment.refundRequests?.[0].afterRefundableAmount ?? 0
                  }
                />
                <ReservationInfoSection
                  reservation={data.reservation}
                  isExpandable
                  hideApplyHandy={true}
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
