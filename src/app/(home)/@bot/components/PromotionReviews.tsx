import Rating from '@/components/rating/Rating';
import { getReviewsWithPagination } from '@/services/review.service';
import { DEFAULT_SSG_REVALIDATE_TIME } from '@/constants/common';
import Article from '@/components/article/Article';
import { ReviewsViewEntity } from '@/types/review.type';
import UserProfile from '@/components/header/UserProfile';
import { dateString } from '@/utils/dateString.util';
import ReviewProperty from '@/components/review/ReviewProperty';

export const revalidate = DEFAULT_SSG_REVALIDATE_TIME;

const PromotionReview = async () => {
  const paginatedReviews = await getReviewsWithPagination({
    revalidate: DEFAULT_SSG_REVALIDATE_TIME,
  });

  const top3 = paginatedReviews.reviews
    .slice(0, 10)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <Article richTitle="솔직한 이용 후기" showMore="/reviews">
      {top3.map((review: ReviewsViewEntity) => (
        <div key={review.reviewId} className="flex flex-col py-12 pr-8">
          <div className="flex flex-col gap-[2px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[6px]">
                <UserProfile
                  nickname={review.userNickname}
                  profileImage={review.userProfileImage}
                />
                <p className="text-12 font-500 leading-[160%] text-basic-black">
                  {review.userNickname}
                </p>
              </div>
              <Rating size="medium" value={review.rating} />
            </div>
            <ReviewProperty review={review} />
            <p className="line-clamp-2 overflow-hidden text-14 font-500 leading-[160%] text-basic-grey-600">
              {review.content}
            </p>
            <div className="flex justify-between gap-8">
              <p className="line-clamp-1 text-12 font-500 leading-[160%] text-basic-grey-400">
                {review.eventName}
              </p>
              <p className="text-12 font-500 leading-[160%] text-basic-grey-500">
                {dateString(review.createdAt, {
                  showWeekday: false,
                })}
              </p>
            </div>
          </div>
        </div>
      ))}
    </Article>
  );
};

export default PromotionReview;
