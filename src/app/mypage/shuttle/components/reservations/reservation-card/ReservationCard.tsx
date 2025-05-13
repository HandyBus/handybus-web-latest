'use client';

import { dateString } from '@/utils/dateString.util';
import { ReservationsViewEntity } from '@/types/reservation.type';
import { useGetShuttleBus } from '@/services/shuttleBus.service';
import useReservationProgress from '../../../hooks/useReservationProgress';
import useTextAndStyle from './hooks/useTextAndStyle';
import useEventText from './hooks/useEventText';
import ArrowRightIcon from '../../../icons/arrow-right.svg';
import Link from 'next/link';
import HandyBadge from '../HandyBadge';
import ShuttleBusBadge from '../ShuttleBusBadge';
import ChatButton from '../ChatButton';

interface Props {
  reservation: ReservationsViewEntity;
}

// NOTE: 비활성화 된 예약은 처리하지 않음. 무산된 행사는 예약 취소로 처리.
const ReservationCard = ({ reservation }: Props) => {
  const event = reservation.shuttleRoute.event;
  const dailyEvent = event.dailyEvents.find(
    (dailyEvent) =>
      dailyEvent.dailyEventId === reservation.shuttleRoute.dailyEventId,
  );
  const { data: shuttleBus } = useGetShuttleBus(
    reservation.shuttleRoute.eventId,
    reservation.shuttleRoute.dailyEventId,
    reservation.shuttleRoute.shuttleRouteId,
    reservation.shuttleBusId ?? '',
  );

  const formattedReservationDate = dateString(reservation.createdAt, {
    showYear: true,
    showDate: true,
    showTime: true,
    showWeekday: true,
  });
  const formattedPaymentAmount = reservation.paymentAmount
    ? reservation.paymentAmount.toLocaleString()
    : '0';

  const {
    reservationProgress,
    handyStatus,
    isOpenChatLinkCreated,
    isWritingReviewPeriod,
    hasReview,
  } = useReservationProgress({
    reservation,
    dailyEvent,
    shuttleBus,
  });

  const textAndStyle = useTextAndStyle({
    reservationProgress,
    handyStatus,
    isOpenChatLinkCreated,
    isWritingReviewPeriod,
  });

  const { eventName, eventLocationName, formattedEventDate, hubText } =
    useEventText({
      reservation,
      event,
      dailyEvent,
    });

  return (
    <Link href={`/mypage/shuttle/${reservation.reservationId}`}>
      <article className="flex flex-col gap-16 px-16 py-24">
        <div>
          <div className="flex h-32 items-center justify-between">
            <div className="flex items-center gap-8 pb-[6px]">
              <h5
                className={`text-18 font-600 ${textAndStyle?.title.className}`}
              >
                {textAndStyle?.title.text}
              </h5>
              {reservationProgress !== 'reservationCanceled' &&
                reservationProgress !== 'shuttleEnded' && (
                  <>
                    <HandyBadge handyStatus={handyStatus} />
                    <ShuttleBusBadge shuttleBus={shuttleBus} />
                  </>
                )}
            </div>
            <ChatButton
              reservationProgress={reservationProgress}
              handyStatus={handyStatus}
              isOpenChatLinkCreated={isOpenChatLinkCreated}
              isWritingReviewPeriod={isWritingReviewPeriod}
              hasReview={hasReview}
              openChatLink={shuttleBus?.openChatLink}
              reservationId={reservation.reservationId}
            />
          </div>
          {textAndStyle?.description.text && (
            <p className="text-14 font-500 text-basic-grey-700">
              {textAndStyle.description.text}
            </p>
          )}
          <p className="text-12 font-500 text-basic-grey-400">
            {formattedReservationDate} 예약
          </p>
          <p className="text-14 font-500">{formattedPaymentAmount} 원</p>
        </div>
        <div className="h-[1.5px] w-full bg-basic-grey-100" />
        <div>
          <div className="flex items-center">
            <h6 className="line-clamp-1 grow text-16 font-600">{eventName}</h6>
            <ArrowRightIcon className="shrink-0" />
          </div>
          <p className="text-12 font-500 text-basic-grey-700">
            {eventLocationName}
          </p>
          <p className="text-12 font-500 text-basic-grey-700">
            {formattedEventDate}
          </p>
          <p className="text-12 font-500 text-basic-grey-700">{hubText}</p>
        </div>
      </article>
      <div className="h-8 w-full bg-basic-grey-50" />
    </Link>
  );
};

export default ReservationCard;
