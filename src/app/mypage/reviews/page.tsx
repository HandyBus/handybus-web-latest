'use client';

import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import Link from 'next/link';
import ReviewIcon from 'public/icons/review.svg';
import DetailedReview from '@/app/reviews/components/DetailedReview';
import { useGetUserReviews } from '@/services/review.service';
import Header from '@/components/header/Header';

const Reviews = () => {
  const { data: reviews, isFetching } = useGetUserReviews();
  return (
    <>
      <Header />
      <DeferredSuspense fallback={<Loading />} isLoading={isFetching}>
        {reviews && (
          <main className="px-16 pb-16">
            <div className="py-8 text-14 font-400 text-basic-grey-500">
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
        )}
      </DeferredSuspense>
    </>
  );
};

export default Reviews;

const NoReview = () => {
  return (
    <div className="flex w-full flex-col items-center gap-4 py-44">
      <ReviewIcon />
      <span className="text-16 font-400 text-basic-grey-300">
        작성한 후기가 없어요
      </span>
      <Link
        href="/mypage/shuttle?type=past"
        className="text-14 font-500 text-basic-grey-600 underline underline-offset-[3px]"
      >
        지난 콘서트 보러가기
      </Link>
    </div>
  );
};
