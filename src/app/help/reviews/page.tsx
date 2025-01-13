'use client';

import DetailedReview from './components/DetailedReview';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useGetReviewsWithPagination } from '@/services/shuttle-operation.service';
import LoadingCircle from 'public/icons/loading-circle.svg';

const ReviewPage = () => {
  const {
    data: reviews,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = useGetReviewsWithPagination();

  const ref = useInfiniteScroll(fetchNextPage);

  return (
    <>
      <div className="flex flex-col gap-16">
        <div className="mt-8 w-full text-center text-16 font-500 text-grey-600-sub">
          총 후기{' '}
          <span className="font-800 text-primary-main">
            {reviews.totalCount}
          </span>
          개
        </div>
        <div className="flex flex-col gap-16">
          {reviews.reviews.map((review, idx) => (
            <DetailedReview key={idx} review={review} showUser />
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
