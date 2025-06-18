'use client';

import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useGetReviewsWithPagination } from '@/services/review.service';
import Image from 'next/image';
import MyReviewItem from './MyReviewItem';
import ReviewBanner from 'public/images/reviews/review-banner.png';
import ReviewItem from './ReviewItem';
import ReviewStatistics from './ReviewStatistics';
import { useMemo } from 'react';
import { useState } from 'react';
import FilterButton from './FilterButton';

export type ReviewSortType = 'DATE_DESC' | 'RATING_DESC' | 'RATING_ASC';

interface Props {
  reviewId?: string;
}

const ReviewListWithMyReview = ({ reviewId }: Props) => {
  const [sort, setSort] = useState<ReviewSortType>('RATING_DESC');
  const {
    data: reviewPages,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = useGetReviewsWithPagination({
    orderBy: sort === 'DATE_DESC' ? undefined : 'rating',
    additionalOrderOptions:
      sort === 'DATE_DESC'
        ? undefined
        : sort === 'RATING_DESC'
          ? 'DESC'
          : 'ASC',
  });

  const reviewListWithoutMyReview = useMemo(
    () =>
      reviewPages?.pages
        .flatMap((page) => page.reviews)
        .filter((review) => review.reviewId !== reviewId),
    [reviewPages, reviewId],
  );

  const ref = useInfiniteScroll(fetchNextPage);

  return (
    <>
      <Image src={ReviewBanner} alt="핸디버스 후기" />
      <ReviewStatistics />
      <div className="h-8 bg-basic-grey-50" />
      <section className="mt-32 flex flex-col gap-16 px-16">
        <FilterButton sort={sort} onSort={setSort} />
        {reviewId && <MyReviewItem reviewId={reviewId} />}
        {reviewListWithoutMyReview.map((review) => (
          <ReviewItem key={review.reviewId} review={review} />
        ))}
        {!isFetching && hasNextPage && (
          <div ref={ref} className="flex flex-col items-center py-28" />
        )}
      </section>
    </>
  );
};

export default ReviewListWithMyReview;
