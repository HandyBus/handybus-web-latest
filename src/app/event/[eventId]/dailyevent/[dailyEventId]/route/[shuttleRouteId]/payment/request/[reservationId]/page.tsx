'use client';

import Button from '@/components/buttons/button/Button';
import usePreventScroll from '@/hooks/usePreventScroll';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { PAYMENT_PARAMS_KEYS } from '../../payment.const';
import SuccessBusIcon from '../icons/bus-success.svg';
import {
  useGetUserReservation,
  useGetUserReservations,
} from '@/services/reservation.service';
import Loading from '@/components/loading/Loading';
import { useReservationTracking } from '@/hooks/analytics/useReservationTracking';
import { ReservationsViewEntity } from '@/types/reservation.type';
import { useEffect } from 'react';
// import { toast } from 'react-toastify';
// import { useReferralTracking } from '@/hooks/analytics/useReferralTracking';
// import { useIgnoreTracking } from '@/hooks/analytics/useIgnoreTracking';
// import dayjs from 'dayjs';

interface Props {
  params: {
    eventId: string;
    reservationId: string;
  };
  searchParams: {
    [PAYMENT_PARAMS_KEYS.referralCode]?: string;
  };
}

// deprecated, 대신 /history/reservation/[reservationId] 로 직접 리디렉트 되도록 변경되었음.
const PaymentsCompleted = ({ params }: Props) => {
  usePreventScroll();
  const { reservationId } = params;
  const { data, isLoading, isError } = useGetUserReservation(reservationId);
  const searchParams = useSearchParams();
  const reservationStartTime = searchParams.get(
    PAYMENT_PARAMS_KEYS.reservationStartTime,
  );
  const referralCode = searchParams.get(PAYMENT_PARAMS_KEYS.referralCode);

  if (isLoading) return <Loading />;
  if (isError || !data) throw new Error('예약 정보를 불러오는데 실패했습니다.');
  return (
    <PaymentsCompletedPage
      reservation={data.reservation}
      eventId={params.eventId}
      reservationStartTime={reservationStartTime ?? undefined}
      referralCode={referralCode ?? undefined}
    />
  );
};

interface PaymentsCompletedPageProps {
  reservation: ReservationsViewEntity;
  eventId: string;
  reservationStartTime?: string;
  referralCode?: string;
}

const PaymentsCompletedPage = ({
  reservation,
  eventId,
  reservationStartTime,
  referralCode,
}: PaymentsCompletedPageProps) => {
  const dailyEventId = reservation.shuttleRoute.dailyEventId;

  const eventName = reservation.shuttleRoute.event.eventDisplayName;
  // const eventDate =
  //   (reservation.shuttleRoute.event.dailyEvents ?? []).find(
  //     (dailyEvent) => dailyEvent.dailyEventId === dailyEventId,
  //   )?.date ?? '';
  const reservationId = reservation.reservationId;

  // const { trackShareReferralCode, trackIgnoreInvitePaybackEvent } =
  //   useReferralTracking({
  //     eventId,
  //     eventName,
  //     eventDate,
  //   });

  // const startTime = useRef(dayjs());

  // const { ref, handleClick } = useIgnoreTracking({
  //   onIgnore: () => {
  //     const totalMs = dayjs().diff(startTime.current);
  //     trackIgnoreInvitePaybackEvent('success_page', totalMs);
  //   },
  //   onClick: () => handleShareReferralCode(),
  // });

  useCompleteReservationTracking({
    eventId,
    eventName,
    reservation,
    dailyEventId,
    reservationStartTime,
    paymentId: reservation.paymentId ?? undefined,
    referralCode: referralCode ?? undefined,
  });

  // const handleShareReferralCode = () => {
  //   const referralCodeUrl = `${window.location.origin}/open?path=/event/${eventId}?${PAYMENT_PARAMS_KEYS.referralCode}=${referralCode}`;
  //   navigator.clipboard.writeText(referralCodeUrl);
  //   toast.success('초대링크가 복사되었습니다.');
  //   trackShareReferralCode(referralCode);
  // };

  return (
    <>
      <main className="relative grow">
        <section className="absolute left-1/2 top-180 flex -translate-x-1/2 flex-col items-center whitespace-nowrap break-keep">
          <h1 className="pb-4 text-22 font-700">셔틀 예약이 완료되었어요</h1>
          <p className="pb-24 text-center text-16 font-500 text-basic-grey-600">
            탑승권은 마이페이지에서 확인할 수 있습니다.
          </p>
          <SuccessBusIcon />
        </section>
        <div className="fixed-centered-layout bottom-0 flex flex-col gap-8 p-16">
          {/* referralCode && (
            <>
              <section className="flex flex-col items-center justify-center gap-8 rounded-8 bg-basic-grey-50 py-16 pl-[50px] pr-[49px] ">
                <h2 className="text-14 font-600 leading-[140%]">
                  💵 페이백 이벤트 진행 중 💵
                </h2>
                <p className="text-12 font-500 leading-[160%] text-basic-grey-700">
                  지금 바로 링크를 공유하고, 결제 금액을 돌려받으세요!
                </p>
              </section>
              <div ref={ref}>
                <Button onClick={handleClick}>초대 링크 공유하기</Button>
              </div>
            </>
          )} */}
          <Link href={`/history/reservation/${reservationId}`} replace={true}>
            <Button variant="secondary">완료</Button>
          </Link>
        </div>
      </main>
    </>
  );
};

export default PaymentsCompleted;

// 커스텀 훅: 예약 완료 추적
interface UseCompleteReservationTrackingProps {
  eventId: string;
  eventName: string;
  reservation: ReservationsViewEntity;
  dailyEventId: string;
  reservationStartTime?: string;
  paymentId: string | undefined;
  referralCode: string | undefined;
}

const useCompleteReservationTracking = ({
  eventId,
  eventName,
  reservation,
  dailyEventId,
  reservationStartTime,
  paymentId,
  referralCode,
}: UseCompleteReservationTrackingProps) => {
  const eventDate = (reservation.shuttleRoute.event.dailyEvents ?? []).find(
    (dailyEvent) => dailyEvent.dailyEventId === dailyEventId,
  )?.dailyEventDate;

  const tripType = reservation.type;

  const selectedHubToDestination = reservation.toDestinationShuttleRouteHubId;
  const selectedHubFromDestination =
    reservation.fromDestinationShuttleRouteHubId;

  const selectedHubNameToDestination =
    reservation.shuttleRoute.toDestinationShuttleRouteHubs?.find(
      (hub) => hub.shuttleRouteHubId === selectedHubToDestination,
    )?.name;

  const selectedHubNameFromDestination =
    reservation.shuttleRoute.fromDestinationShuttleRouteHubs?.find(
      (hub) => hub.shuttleRouteHubId === selectedHubFromDestination,
    )?.name;

  const { data: userReservations } = useGetUserReservations({
    eventProgressStatus: 'PAST',
  });

  const hasOtherEventReservation = userReservations?.some(
    (reservation) => reservation.shuttleRoute.eventId !== eventId,
  );

  const { trackCompleteReservation } = useReservationTracking({
    eventId,
    eventName,
    isBottomSheetOpen: false,
    reservationStartTime,
    initialStep: 'success_payment',
  });

  // 완료 예약 추적 실행 - hasOtherEventReservation이 결정되면 한 번 실행
  useEffect(() => {
    if (hasOtherEventReservation !== undefined) {
      trackCompleteReservation(
        eventDate,
        selectedHubNameToDestination,
        selectedHubNameFromDestination,
        tripType,
        hasOtherEventReservation,
        paymentId,
        referralCode,
      );
    }
  }, [
    hasOtherEventReservation,
    trackCompleteReservation,
    eventDate,
    selectedHubNameToDestination,
    selectedHubNameFromDestination,
    tripType,
    paymentId,
  ]);

  return {
    trackingData: {
      eventDate,
      selectedHubNameToDestination,
      selectedHubNameFromDestination,
      tripType,
      hasOtherEventReservation,
    },
  };
};
