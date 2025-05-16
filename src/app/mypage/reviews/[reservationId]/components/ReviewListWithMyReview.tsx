'use client';

import { convertStaticToReviewEntity } from '@/app/reviews/convertStaticToReviewEntity.util';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useGetReviewsWithPagination } from '@/services/review.service';
import Image from 'next/image';
import MyReviewItem from './MyReviewItem';
import { CircleLoader } from 'react-spinners';
import ReviewBanner from 'public/images/reviews/review-banner.png';
import ChevronRightEmIcon from 'public/icons/chevron-right-em.svg';
import ReviewItem from './ReviewItem';
import { STATIC_REVIEWS } from '../review.const';
import ReviewStatistics from './ReviewStatistics';

interface Props {
  reviewId?: string;
}

const ReviewListWithMyReview = ({ reviewId }: Props) => {
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
      <Image src={ReviewBanner} alt="핸디버스 후기" />
      <ReviewStatistics reviewTotalCount={reviewTotalCount} />
      <div className="h-8 bg-basic-grey-50" />
      <section className="mt-32 flex flex-col gap-16 px-16">
        <div className="flex items-center justify-between">
          <h1 className="w-full text-20 font-700 leading-[140%] ">이용 후기</h1>
          <button className="flex h-[38px] items-center gap-8 break-keep rounded-8 border-[1px] border-basic-grey-200 px-12 py-8 text-14 font-600 leading-[160%] text-basic-grey-600 active:bg-basic-grey-50">
            최신순
            <ChevronRightEmIcon className="h-16 w-16 rotate-90 stroke-2 text-basic-grey-300" />
          </button>
        </div>
        {reviewId && <MyReviewItem />}
        {reviews.reviews.map((review) => (
          <ReviewItem key={review.reviewId} review={review} />
        ))}
        {!hasNextPage &&
          STATIC_REVIEWS.map((review) => (
            <ReviewItem
              key={review.id}
              review={convertStaticToReviewEntity(review)}
            />
          ))}
        {(isFetching || hasNextPage) && (
          <div ref={ref} className="flex flex-col items-center py-28">
            <span className="inline-block animate-spin">
              <CircleLoader />
            </span>
          </div>
        )}
      </section>
    </>
  );
};

export default ReviewListWithMyReview;
