import Rating from '@/components/rating/Rating';
import Article from '@/components/article/Article';
import { getReviewsWithPagination } from '@/services/review.service';
import { STATIC_REVIEWS } from '@/app/help/reviews/review';
import { DEFAULT_SSG_REVALIDATE_TIME } from '@/constants/common';

export const revalidate = DEFAULT_SSG_REVALIDATE_TIME;

const PromotionReview = async () => {
  const paginatedReviews = await getReviewsWithPagination({
    revalidate: DEFAULT_SSG_REVALIDATE_TIME,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const top3 = (paginatedReviews.reviews as any[])
    .concat(STATIC_REVIEWS)
    .slice(0, 10)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <Article
      richTitle="핸디버스의 생생한 후기"
      titleClassName="text-20"
      showMore="/help/reviews"
    >
      {top3.map((review) => (
        <div
          key={review.reviewId}
          className="mx-16 mt-8 flex flex-col gap-[10px] rounded-[16px] bg-grey-50 p-16"
        >
          <Rating size="medium" value={review.rating} />
          <p className="line-clamp-2 overflow-hidden text-14 font-500 text-grey-600">
            {review.content}
          </p>
        </div>
      ))}
    </Article>
  );
};

export default PromotionReview;
