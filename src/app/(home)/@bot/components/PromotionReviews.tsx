import Rating from '@/components/rating/Rating';
import { getReviewsWithPagination } from '@/services/review.service';
import { STATIC_REVIEWS } from '@/app/help/reviews/review';
import { DEFAULT_SSG_REVALIDATE_TIME } from '@/constants/common';
import ArticleV2 from '@/components/article/ArticleV2';
import { ReviewsViewEntity } from '@/types/review.type';
import Image from 'next/image';

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
    <ArticleV2 richTitle="솔직한 이용 후기" showMore="/help/reviews">
      {top3.map((review: ReviewsViewEntity) => (
        <div key={review.reviewId} className="flex flex-col gap-[10px] p-8">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[6px]">
                {review.userProfileImage ? (
                  <Image
                    src={review.userProfileImage}
                    alt={review.userNickname}
                    fill
                    className="rounded-full"
                  />
                ) : (
                  <div className="h-24 w-24 rounded-full bg-basic-grey-50">
                    {review.userNickname.slice(0, 1)}
                  </div>
                )}
                <p className="text-12 font-500 leading-[160%] text-basic-black">
                  {review.userNickname}
                </p>
              </div>
              <Rating size="medium" value={review.rating} />
            </div>
          </div>
          <p>예약과정 매우 만족스러워요 | 탑승 매우 만족스러워요</p>
          <p className="line-clamp-2 overflow-hidden text-14 font-500 leading-[160%] text-basic-grey-600">
            {review.content}
          </p>
          <p className="text-12 font-500 leading-[160%] text-basic-black">
            {review.eventName}
          </p>
          <div className="flex w-full items-center justify-end gap-4">
            <div className="rounded-[42px] bg-basic-grey-50 px-8 py-4 text-10 font-600 leading-[160%] text-basic-grey-700">
              이달의 후기
            </div>
            <p className="text-12 font-500 leading-[160%] text-basic-grey-500">
              {review.createdAt}
            </p>
          </div>
        </div>
      ))}
    </ArticleV2>
  );
};

export default PromotionReview;
