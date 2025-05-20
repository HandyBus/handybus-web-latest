import { ReservationsViewEntity } from '@/types/reservation.type';
import { ReviewsViewEntity } from '@/types/review.type';
import Link from 'next/link';
import ArrowRightIcon from '../../icons/arrow-right.svg';
import useTextAndStyleForReview from './hooks/useTextAndStyleForReview';
import { dateString } from '@/utils/dateString.util';
import dayjs from 'dayjs';
import ReviewButton from './ReviewButton';
import useEventText from './hooks/useEventText';

interface Props {
  reservation: ReservationsViewEntity;
  review?: ReviewsViewEntity;
}

const ReservationCardForReview = ({ reservation, review }: Props) => {
  const event = reservation.shuttleRoute.event;
  const dailyEvent = event.dailyEvents.find(
    (dailyEvent) =>
      dailyEvent.dailyEventId === reservation.shuttleRoute.dailyEventId,
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

  const isWritingReviewPeriod = !!(
    dailyEvent?.date &&
    dayjs()
      .tz('Asia/Seoul')
      .isBefore(dayjs(dailyEvent.date).tz('Asia/Seoul').add(7, 'day'))
  );

  const textAndStyle = useTextAndStyleForReview({
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
            </div>
            <ReviewButton
              isWritingReviewPeriod={isWritingReviewPeriod}
              reservationId={reservation.reservationId}
              reviewId={review?.reviewId}
            />
          </div>
          {textAndStyle?.description.text && (
            <p className="text-14 font-500 leading-[160%] text-basic-grey-700">
              {textAndStyle.description.text}
            </p>
          )}
          <p className="text-12 font-500 leading-[160%] text-basic-grey-400">
            {formattedReservationDate} 예약
          </p>
        </div>
        <div className="h-[1.5px] w-full bg-basic-grey-100" />
        <div>
          <div className="flex items-center">
            <h6 className="line-clamp-1 grow text-16 font-600">{eventName}</h6>
            <ArrowRightIcon className="shrink-0" />
          </div>
          <p className="text-12 font-500 leading-[160%] text-basic-grey-700">
            {eventLocationName}
          </p>
          <p className="text-12 font-500 leading-[160%] text-basic-grey-700">
            {formattedEventDate}
          </p>
          <p className="text-12 font-500 leading-[160%] text-basic-grey-700">
            {hubText}
          </p>
          <p className="text-14 font-500 leading-[160%]">
            {formattedPaymentAmount} 원
          </p>
        </div>
      </article>
      <div className="h-8 w-full bg-basic-grey-50" />
    </Link>
  );
};

export default ReservationCardForReview;
