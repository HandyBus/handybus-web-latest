import Rating from '@/components/rating/Rating';
import { getReviewsWithPagination } from '@/services/review.service';
import { STATIC_REVIEWS } from '@/app/help/reviews/review';
import { DEFAULT_SSG_REVALIDATE_TIME } from '@/constants/common';
import ArticleV2 from '@/components/article/ArticleV2';
import { ReviewsViewEntity } from '@/types/review.type';
import UserProfile from '@/components/header/UserProfile';

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
        <div key={review.reviewId} className="flex flex-col p-8">
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
            <FeedbackGroup />
            <p className="line-clamp-2 overflow-hidden text-14 font-500 leading-[160%] text-basic-grey-600">
              {review.content}
            </p>
            <p className="text-12 font-500 leading-[160%] text-basic-grey-400">
              {review.eventName}
            </p>
          </div>
          <div className="mt-4 flex w-full items-center justify-end gap-4">
            <MonthlyReviewChip />
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

const MonthlyReviewChip = () => {
  return (
    <div className="rounded-[42px] bg-basic-grey-50 px-8 py-4 text-10 font-600 leading-[160%] text-basic-grey-700">
      이달의 후기
    </div>
  );
};

const FeedbackGroup = () => {
  return (
    <div className="flex gap-[6px] ">
      <FeedbackCard type="예약과정" text="매우 만족스러워요" />
      <p className="text-12 font-500 leading-[160%] text-basic-grey-200">|</p>
      <FeedbackCard type="탑승" text="매우 만족스러워요" />
    </div>
  );
};

const FeedbackCard = ({
  type,
  text,
}: {
  type: FeedbackType;
  text: FeedbackText;
}) => {
  return (
    <div className="gap-2 flex items-center gap-4">
      <p className="text-12 font-500 leading-[160%] text-basic-grey-700">
        {type}
      </p>
      <p className="text-12 font-500 leading-[160%] text-basic-grey-500">
        {text}
      </p>
    </div>
  );
};

type FeedbackType = '예약과정' | '탑승';
type FeedbackText =
  | '매우 불만족스러워요'
  | '불만족스러워요'
  | '보통스러워요'
  | '만족스러워요'
  | '매우 만족스러워요';
