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
  const { data, fetchNextPage, isFetching, hasNextPage } =
    useGetReviewsWithPagination();

  const ref = useInfiniteScroll(fetchNextPage);

  const [sort, setSort] = useState<ReviewSortType>('DATE_DESC');

  const sortedReviews = useMemo(() => {
    return data.reviews.sort((a, b) => {
      if (sort === 'RATING_ASC') {
        return a.rating - b.rating;
      }
      if (sort === 'RATING_DESC') {
        return b.rating - a.rating;
      }
      return b.createdAt.localeCompare(a.createdAt);
    });
  }, [sort, data.reviews]);

  return (
    <>
      <Image src={ReviewBanner} alt="핸디버스 후기" />
      <ReviewStatistics />
      <div className="h-8 bg-basic-grey-50" />
      <section className="mt-32 flex flex-col gap-16 px-16">
        <FilterButton sort={sort} onSort={setSort} />
        {sortedReviews.map((review) => (
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
