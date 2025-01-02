'use client';

import AppBar from '@/components/app-bar/AppBar';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import Link from 'next/link';
import ReviewIcon from 'public/icons/review.svg';
import DetailedReview from '@/app/help/reviews/components/DetailedReview';
import { useGetUserReviews } from '@/services/reviews';

const Reviews = () => {
  const { data: reviews, isFetching } = useGetUserReviews();
  return (
    <>
      <AppBar>작성한 후기 조회</AppBar>
      <DeferredSuspense fallback={<Loading />} isLoading={isFetching}>
        <main className="px-16 pb-16">
          <div className="py-8 text-14 font-400 text-grey-500">
            후기 ({reviews.length})
          </div>
          <ul className="flex flex-col gap-16">
            {reviews.length === 0 ? (
              <NoReview />
            ) : (
              reviews.map((review) => (
                <DetailedReview
                  key={review.reviewId}
                  review={review}
                  showCreatedAt
                />
              ))
            )}
          </ul>
        </main>
      </DeferredSuspense>
    </>
  );
};

export default Reviews;

const NoReview = () => {
  return (
    <div className="flex w-full flex-col items-center gap-4 py-44">
      <ReviewIcon />
      <span className="text-16 font-400 text-grey-300">
        작성한 후기가 없어요
      </span>
      <Link
        href="/"
        className="text-14 font-500 text-grey-600-sub underline underline-offset-[3px]"
      >
        지난 콘서트 보러가기
      </Link>
    </div>
  );
};
