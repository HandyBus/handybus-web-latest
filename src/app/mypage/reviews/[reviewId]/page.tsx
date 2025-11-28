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
      <ReviewListWithMyReview reviewId={reviewId} />
    </main>
  );
};

export default ReviewPage;
