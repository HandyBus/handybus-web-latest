'use client';

import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useGetReviewsWithPagination } from '@/services/review.service';
import Image from 'next/image';
import MyReviewItem from './MyReviewItem';
import { BeatLoader } from 'react-spinners';
import ReviewBanner from 'public/images/reviews/review-banner.png';
import ReviewItem from './ReviewItem';
import ReviewStatistics from './ReviewStatistics';
import { useMemo } from 'react';
import { useState } from 'react';
import FilterButton from './FilterButton';

export type ReviewSortType = 'DATE_ASC' | 'RATING_DESC' | 'RATING_ASC';

interface Props {
  reviewId?: string;
}

const ReviewListWithMyReview = ({ reviewId }: Props) => {
  const { data, fetchNextPage, isFetching, hasNextPage } =
    useGetReviewsWithPagination();

  const [sort, setSort] = useState<ReviewSortType>('DATE_ASC');
  const ref = useInfiniteScroll(fetchNextPage);
  const reviews = data.reviews;

  const reviewListWithoutMyReview = useMemo(
    () => reviews.filter((review) => review.reviewId !== reviewId),
    [reviews, reviewId],
  );

  const sortedReviews = useMemo(() => {
    return reviewListWithoutMyReview.sort((a, b) => {
      if (sort === 'RATING_ASC') {
        return a.rating - b.rating;
      }
      if (sort === 'RATING_DESC') {
        return b.rating - a.rating;
      }
      return a.createdAt.localeCompare(b.createdAt);
    });
  }, [sort, reviewListWithoutMyReview]);

  return (
    <>
      <Image src={ReviewBanner} alt="핸디버스 후기" />
      <ReviewStatistics />
      <div className="h-8 bg-basic-grey-50" />
      <section className="mt-32 flex flex-col gap-16 px-16">
        <FilterButton sort={sort} onSort={setSort} />
        {reviewId && <MyReviewItem reviewId={reviewId} />}
        {sortedReviews.map((review) => (
          <ReviewItem key={review.reviewId} review={review} />
        ))}
        {(isFetching || hasNextPage) && (
          <div ref={ref} className="flex flex-col items-center py-28">
            <Loading />
          </div>
        )}
      </section>
    </>
  );
};

export default ReviewListWithMyReview;

const Loading = () => {
  return (
    <div className="flex h-[50dvh] items-center justify-center">
      <BeatLoader color="#9edbcc" />
    </div>
  );
};
