'use client';

import ReviewItem from './ReviewItem';
import ReviewStatistics from './ReviewStatistics';
import Image from 'next/image';
import ReviewBanner from 'public/images/reviews/review-banner.png';
import ChevronRightEmIcon from 'public/icons/chevron-right-em.svg';
import { CircleLoader } from 'react-spinners';
import { STATIC_REVIEWS } from '../../../constants/review.const';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { convertStaticToReviewEntity } from '../convertStaticToReviewEntity.util';
import { useGetReviewsWithPagination } from '@/services/review.service';
import FilterButton from './FilterButton';
import { useMemo, useState } from 'react';

export type ReviewSortType = 'DATE_ASC' | 'RATING_ASC' | 'RATING_DESC';

const ReviewList = () => {
  const {
    data: reviews,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = useGetReviewsWithPagination();

  const ref = useInfiniteScroll(fetchNextPage);

  const [sort, setSort] = useState<ReviewSortType>('DATE_ASC');

  const sortedReviews = useMemo(() => {
    return STATIC_REVIEWS.sort((a, b) => {
      // return reviews.reviews.sort((a, b) => {
      if (sort === 'RATING_ASC') {
        return a.rating - b.rating;
      }
      if (sort === 'RATING_DESC') {
        return b.rating - a.rating;
      }
      return a.createdAt.localeCompare(b.createdAt);
    });
  }, [sort, reviews.reviews]);

  const reviewTotalCount = reviews.totalCount;

  return (
    <>
      <Image src={ReviewBanner} alt="핸디버스 후기" />
      <ReviewStatistics reviewTotalCount={reviewTotalCount} />
      <div className="h-8 bg-basic-grey-50" />
      <section className="mt-32 flex flex-col gap-16 px-16">
        {/* <div className="flex items-center justify-between">
          <h1 className="w-full text-20 font-700 leading-[140%] ">이용 후기</h1>
          <button className="flex h-[38px] items-center gap-8 break-keep rounded-8 border-[1px] border-basic-grey-200 px-12 py-8 text-14 font-600 leading-[160%] text-basic-grey-600 active:bg-basic-grey-50">
            최신순
            <ChevronRightEmIcon className="h-16 w-16 rotate-90 stroke-2 text-basic-grey-300" />
          </button>
        </div> */}
        <FilterButton sort={sort} onSort={setSort} />
        {sortedReviews.map((review) => (
          <ReviewItem key={review.reviewId} review={review} />
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

export default ReviewList;
