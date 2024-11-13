'use client';

import DetailedReview from './components/DetailedReview';
import { useGetReviews } from '@/services/reviews';
import { useLoaderRef } from '@/hooks/useLoaderRef';
import LoadingCircle from 'public/icons/loading-circle.svg';

const ReviewPage = () => {
  const { data, fetchNextPage, isFetching, hasNextPage } = useGetReviews();

  const bottomRef = useLoaderRef(fetchNextPage);

  return (
    <>
      <div className="flex flex-col gap-16">
        <div className="mt-8 w-full text-center text-16 font-500 text-grey-600-sub">
          총 후기 <span className="font-800 text-primary-main">1,350</span>개
        </div>
        <div className="flex flex-col gap-16">
          {data?.map((review, idx) => (
            <DetailedReview key={idx} review={review} />
          ))}
        </div>
        {(isFetching || hasNextPage) && (
          <div ref={bottomRef} className="flex flex-col items-center py-28">
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
