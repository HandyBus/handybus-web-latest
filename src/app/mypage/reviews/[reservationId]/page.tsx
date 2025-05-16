import Header from '@/components/header/Header';
import ReviewListWithMyReview from './components/ReviewListWithMyReview';

interface Props {
  params: {
    reservationId: string;
  };
}

const ReviewPage = ({ params }: Props) => {
  return (
    <main>
      <Header />
      <ReviewListWithMyReview reviewId={params.reservationId} />
    </main>
  );
};

export default ReviewPage;
