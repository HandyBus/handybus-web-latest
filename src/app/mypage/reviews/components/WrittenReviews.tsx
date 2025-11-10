'use client';

import Loading from '@/components/loading/Loading';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import EmptyReview from './EmptyReview';
import { useGetUserReviews } from '@/services/review.service';
import ReviewCard from './ReviewCard';
import { useGetUserReservations } from '@/services/reservation.service';

const WrittenReviews = () => {
  const { data: reviews, isLoading: isLoadingReviews } = useGetUserReviews();
  const { data: reservations, isLoading: isLoadingReservations } =
    useGetUserReservations({
      reservationStatus: 'COMPLETE_PAYMENT',
    });

  const isLoading = isLoadingReviews || isLoadingReservations;

  return (
    <DeferredSuspense
      fallback={<Loading style="grow" className="pt-64" />}
      isLoading={isLoading}
    >
      {reviews &&
        reservations &&
        (reviews.length === 0 ? (
          <EmptyReview variant="written-review" />
        ) : (
          <ul className="flex flex-col gap-16 px-16 pb-16 pt-24">
            {reviews.map((review) => {
              const reservation = reservations.find(
                (reservation) =>
                  reservation.reservationId === review.reservationId,
              );
              if (!reservation) {
                return null;
              }
              return (
                <ReviewCard
                  key={review.reviewId}
                  review={review}
                  reservation={reservation}
                />
              );
            })}
          </ul>
        ))}
    </DeferredSuspense>
  );
};

export default WrittenReviews;
