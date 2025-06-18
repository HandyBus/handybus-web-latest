'use client';

import ReviewItem from './ReviewItem';
import ReviewStatistics from './ReviewStatistics';
import Image from 'next/image';
import ReviewBanner from 'public/images/reviews/review-banner.png';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useGetReviewsWithPagination } from '@/services/review.service';
import FilterButton from './FilterButton';
import { useMemo, useState } from 'react';

export type ReviewSortType = 'DATE_DESC' | 'RATING_DESC' | 'RATING_ASC';

const ReviewList = () => {
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
  const reviews = useMemo(() => {
    return reviewPages?.pages.flatMap((page) => page.reviews) ?? [];
  }, [reviewPages]);

  const ref = useInfiniteScroll(fetchNextPage);

  return (
    <>
      <Image src={ReviewBanner} alt="핸디버스 후기" />
      <ReviewStatistics />
      <div className="h-8 bg-basic-grey-50" />
      <section className="mt-32 flex flex-col gap-16 px-16">
        <FilterButton sort={sort} onSort={setSort} />
        {reviews.map((review) => (
          <ReviewItem key={review.reviewId} review={review} />
        ))}
        {!isFetching && hasNextPage && (
          <div ref={ref} className="flex flex-col items-center py-28" />
        )}
      </section>
    </>
  );
};

export default ReviewList;
