import Header from '@/components/header/Header';
import ReviewList from '@/app/reviews/components/ReviewList';

interface Props {
  params: {
    reservationId: string;
  };
}

const ReviewPage = ({ params }: Props) => {
  return (
    <main>
      <Header />
      <ReviewList reviewId={params.reservationId} />
    </main>
  );
};

export default ReviewPage;
