import Header from '@/components/header/Header';
import ReviewListWithMyReview from './components/ReviewListWithMyReview';

interface Props {
  params: {
    reviewId: string;
  };
}

const ReviewPage = ({ params }: Props) => {
  return (
    <main>
      <Header />
      <ReviewListWithMyReview reviewId={params.reviewId} />
    </main>
  );
};

export default ReviewPage;
