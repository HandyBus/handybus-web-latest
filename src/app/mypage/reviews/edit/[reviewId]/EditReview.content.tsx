'use client';

import { useGetUserReservation } from '@/services/reservation.service';
import { useGetReview } from '@/services/review.service';
import ReviewEditForm from './components/ReviewEditForm';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useFlow } from '@/stacks';
import { checkIsReviewWritingPeriod } from '@/utils/review.util';
import { EventsViewEntity } from '@/types/event.type';
import { ReservationsViewEntity } from '@/types/reservation.type';
import { dateString } from '@/utils/dateString.util';
import { getHubText } from '@/utils/event.util';
import Header from '@/components/header/Header';

interface Props {
  reviewId: string;
}

const EditReview = ({ reviewId }: Props) => {
  const flow = useFlow();
  const { data, isLoading, isError } = useGetReview(reviewId);
  const reservationId = data?.reservationId;

  const {
    data: reservationData,
    isLoading: isReservationLoading,
    isError: isReservationError,
  } = useGetUserReservation(reservationId ?? '', {
    enabled: !!reservationId,
  });
  const reservation = reservationData?.reservation;

  const { isReviewWritingPeriod } = reservation
    ? checkIsReviewWritingPeriod(reservation)
    : { isReviewWritingPeriod: false };

  if (reservation && !isReviewWritingPeriod) {
    flow.replace('Reviews', {}, { animate: false });
    return;
  }
  if (isError || isReservationError) {
    throw new Error('리뷰 데이터를 찾을 수 없습니다.');
  }

  return (
    <>
      <Header />
      <main>
        <DeferredSuspense
          fallback={<Loading style="screen" />}
          isLoading={isLoading || isReservationLoading}
        >
          {reservationId && data && (
            <>
              <EditEventInfoCard reservationId={reservationId} />
              <Divider />
              <ReviewEditForm review={data} />
            </>
          )}
        </DeferredSuspense>
      </main>
    </>
  );
};

export default EditReview;

interface EventInfoCardProps {
  event: EventsViewEntity;
  reservation: ReservationsViewEntity;
}

const EventInfoCard = ({ event, reservation }: EventInfoCardProps) => {
  const dailyEvent = event.dailyEvents.find(
    (dailyEvent) =>
      dailyEvent.dailyEventId === reservation.shuttleRoute.dailyEventId,
  );
  const formattedEventDate = dateString(dailyEvent?.date, {
    showYear: true,
    showDate: true,
    showTime: false,
    showWeekday: false,
  });
  const hubText = getHubText(reservation);

  return (
    <section className="px-16 pb-[26px] pt-16">
      <h6 className="line-clamp-1 grow text-16 font-600">{event.eventName}</h6>
      <p className="text-12 font-500 text-basic-grey-700">
        {event.eventLocationName}
      </p>
      <p className="text-12 font-500 text-basic-grey-700">
        {formattedEventDate}
      </p>
      <p className="text-14 font-500">{hubText}</p>
    </section>
  );
};

interface EventInfoCardForEditProps {
  reservationId: string;
}

const EditEventInfoCard = ({ reservationId }: EventInfoCardForEditProps) => {
  const { data } = useGetUserReservation(reservationId);
  const event = data?.reservation.shuttleRoute.event;
  const reservation = data?.reservation;

  if (!event || !reservation) return <div className="h-[123px] w-full" />;
  return <EventInfoCard event={event} reservation={reservation} />;
};

const Divider = () => {
  return <div className="h-[8px] w-full bg-basic-grey-50" />;
};
