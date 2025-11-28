'use client';

import ReviewWriteForm from './components/ReviewWriteForm';
import { useGetUserReservation } from '@/services/reservation.service';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useRouter } from 'next/navigation';
import { EventsViewEntity } from '@/types/event.type';
import { ReservationsViewEntity } from '@/types/reservation.type';
import { dateString } from '@/utils/dateString.util';
import { getHubText } from '@/utils/event.util';
import { checkIsReviewWritingPeriod } from '@/utils/review.util';
import Header from '@/components/header/Header';

interface Props {
  reservationId: string;
}

const WriteReview = ({ reservationId }: Props) => {
  const { data, isLoading } = useGetUserReservation(reservationId);
  const event = data?.reservation.shuttleRoute.event;
  const reservation = data?.reservation;
  const { replace } = useRouter();

  const { isReviewWritingPeriod } = reservation
    ? checkIsReviewWritingPeriod(reservation)
    : { isReviewWritingPeriod: false };

  if (data?.reservation.reviewId) {
    replace('/mypage/reviews');
    return;
  }
  if (reservation && !isReviewWritingPeriod) {
    replace('/mypage/reviews');
    return;
  }

  return (
    <>
      <Header />
      <main>
        <DeferredSuspense
          fallback={<Loading style="screen" />}
          isLoading={isLoading}
        >
          {event && reservation && (
            <>
              <EventInfoCard event={event} reservation={reservation} />
              <Divider />
              <ReviewWriteForm reservation={reservation} />
            </>
          )}
        </DeferredSuspense>
      </main>
    </>
  );
};

export default WriteReview;

const Divider = () => {
  return <div className="h-[8px] w-full bg-basic-grey-50" />;
};

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
