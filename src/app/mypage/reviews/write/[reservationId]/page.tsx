'use client';

import Header from '@/components/header/Header';
import EventInfoCard from '../../components/review-form/components/EventInfoCard';
import ReviewWriteForm from './components/ReviewWriteForm';
import { useGetUserReservation } from '@/services/reservation.service';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useRouter } from 'next/navigation';

interface Props {
  params: {
    reservationId: string;
  };
}

const WriteReviewPage = ({ params }: Props) => {
  const { reservationId } = params;
  const { data, isLoading } = useGetUserReservation(reservationId);
  const event = data?.reservation.shuttleRoute.event;
  const reservation = data?.reservation;
  const { replace } = useRouter();

  if (data?.reservation.reviewId) replace(`/mypage/reviews/`);
  return (
    <main>
      <Header />
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
  );
};

export default WriteReviewPage;

const Divider = () => {
  return <div className="h-[8px] w-full bg-basic-grey-50" />;
};
