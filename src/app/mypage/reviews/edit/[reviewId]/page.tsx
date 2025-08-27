'use client';

import Header from '@/components/header/Header';
import EventInfoCard from '../../components/review-form/components/EventInfoCard';
import { useGetUserReservation } from '@/services/reservation.service';
import { useGetReview } from '@/services/review.service';
import ReviewEditForm from './components/ReviewEditForm';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';

interface Props {
  params: {
    reviewId: string;
  };
}

const EditReviewPage = ({ params }: Props) => {
  const { reviewId } = params;
  const { data, isLoading, isError } = useGetReview(reviewId);
  const reservationId = data?.reservationId;

  if (isError) throw new Error('리뷰 데이터를 찾을 수 없습니다.');
  return (
    <main>
      <Header />
      <DeferredSuspense
        fallback={<Loading style="screen" />}
        isLoading={isLoading}
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
  );
};

export default EditReviewPage;

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
