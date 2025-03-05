'use client';

import DetailedReview from './components/DetailedReview';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useGetReviewsWithPagination } from '@/services/review.service';
import LoadingCircle from 'public/icons/loading-circle.svg';
import { STATIC_REVIEWS } from './review';
import DetailedStaticReview from './components/DetailedStaticReview';

const ReviewPage = () => {
  const {
    data: reviews,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = useGetReviewsWithPagination();

  const ref = useInfiniteScroll(fetchNextPage);

  const reviewTotalCount = reviews.totalCount + STATIC_REVIEWS.length;

  return (
    <>
      <div className="flex flex-col gap-16">
        <div className="mt-8 w-full text-center text-16 font-500 text-grey-600-sub">
          총 후기{' '}
          <span className="font-800 text-primary-main">{reviewTotalCount}</span>
          개
        </div>
        <div className="flex flex-col gap-16">
          {reviews.reviews.map((review, idx) => (
            <DetailedReview key={idx} review={review} showUser />
          ))}
          {!hasNextPage &&
            STATIC_REVIEWS.map((review) => (
              <DetailedStaticReview key={review.id} review={review} />
            ))}
        </div>
        {(isFetching || hasNextPage) && (
          <div ref={ref} className="flex flex-col items-center py-28">
            <span className="inline-block animate-spin">
              <LoadingCircle />
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default ReviewPage;
