import Rating from '@/components/rating/Rating';
import UserProfile from '@/components/header/UserProfile';
import { ReviewsViewEntity } from '@/types/review.type';
import { useState } from 'react';
import Image from 'next/image';
import { dateString } from '@/utils/dateString.util';

interface Props {
  review: ReviewsViewEntity;
}

const ReviewItem = ({ review }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article>
      <div key={review.reviewId} className={`flex flex-col rounded-8 p-12`}>
        <div className="flex flex-col items-start gap-[2px]">
          <div className="flex w-full items-center justify-between">
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
          <figure className="flex gap-4">
            {review.reviewImages &&
              review.reviewImages.length > 0 &&
              review.reviewImages?.map((image, index) => {
                return (
                  <div className="relative h-60 w-60" key={index}>
                    <Image
                      src={image.imageUrl}
                      alt={`${review.eventName} 후기 이미지 ${index + 1}`}
                      fill
                      className="rounded-8 object-cover"
                    />
                  </div>
                );
              })}
          </figure>
          <p
            className={`line-clamp-2 overflow-hidden text-14 font-500 leading-[160%] text-basic-grey-600 ${
              isExpanded ? 'line-clamp-none' : ''
            }`}
          >
            {review.content}
          </p>
          {review.content.length > 100 && (
            <button
              className="text-14 font-500 leading-[160%] text-basic-grey-500"
              onClick={() => setIsExpanded((prev) => !prev)}
            >
              {isExpanded ? '접기' : '더보기'}
            </button>
          )}
          <p className="text-12 font-500 leading-[160%] text-basic-grey-400">
            {review.eventName}
          </p>
        </div>
        <div className="mt-4 flex w-full items-center justify-end gap-4">
          <p className="text-12 font-500 leading-[160%] text-basic-grey-500">
            {dateString(review.createdAt, {
              showWeekday: false,
            })}
          </p>
        </div>
      </div>
    </article>
  );
};

export default ReviewItem;

const FeedbackGroup = () => {
  return (
    <div className="flex gap-[6px] ">
      <PassengerRegion />
      <p className="text-12 font-500 leading-[160%] text-basic-grey-200">|</p>
      <FeedbackCard type="서비스" text="매우 만족" />
      <p className="text-12 font-500 leading-[160%] text-basic-grey-200">|</p>
      <FeedbackCard type="탑승" text="매우 만족" />
    </div>
  );
};

const PassengerRegion = () => {
  return (
    <p className="text-12 font-500 leading-[160%] text-basic-grey-700">
      경남 탑승객
    </p>
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
    <div className="flex items-center gap-4">
      <p className="text-12 font-500 leading-[160%] text-basic-grey-700">
        {type}
      </p>
      <p className="text-12 font-500 leading-[160%] text-basic-grey-500">
        {text}
      </p>
    </div>
  );
};

type FeedbackType = '서비스' | '탑승';
type FeedbackText = '매우 불만족' | '불만족' | '보통' | '만족' | '매우 만족';
