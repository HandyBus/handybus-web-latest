import Header from '@/components/header/Header';
import ReviewListWithMyReview from './components/ReviewListWithMyReview';

interface Props {
  params: {
    reviewId: string;
  };
}

const ReviewPage = ({ params }: Props) => {
  const { reviewId } = params;

  return (
    <main>
      <Header />
      <ReviewListWithMyReview reviewId={reviewId} />
    </main>
  );
};

export default ReviewPage;
