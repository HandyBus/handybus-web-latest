import Rating from '@/components/rating/Rating';
import UserProfile from '@/components/header/UserProfile';
import { ReviewsViewEntity } from '@/types/review.type';
import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import { dateString } from '@/utils/dateString.util';
import ImageModal from './ImageModal';

interface Props {
  review: ReviewsViewEntity;
  isMyReview?: boolean;
}

const ReviewItem = ({ review, isMyReview }: Props) => {
  const [openImageUrl, setOpenImageUrl] = useState<string | null>(null);
  const [clamped, setClamped] = useState(false);
  const [useClamp, setUseClamp] = useState(true);

  const prevWidth = useRef(0);

  const ref = useCallback(
    (node: HTMLParagraphElement | null) => {
      if (node !== null) {
        const resizeObserver = new ResizeObserver((entries) => {
          for (const entry of entries) {
            if (entry.target.clientWidth === prevWidth.current) continue;
            if (!useClamp) continue;
            prevWidth.current = entry.target.clientWidth;
            setClamped(entry.target.scrollHeight > entry.target.clientHeight);
          }
        });
        resizeObserver.observe(node);

        return () => {
          resizeObserver.unobserve(node);
        };
      }
    },
    [useClamp],
  );

  return (
    <>
      <article>
        <div
          key={review.reviewId}
          className={`flex flex-col p-12 ${
            isMyReview ? 'bg-basic-grey-50' : 'bg-basic-white'
          } rounded-8`}
        >
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
            <figure className="flex gap-4 py-4">
              {review.reviewImages &&
                review.reviewImages.length > 0 &&
                review.reviewImages?.map((image, index) => {
                  return (
                    <div
                      className="relative h-60 w-60"
                      key={index}
                      onClick={() => setOpenImageUrl(image.imageUrl)}
                    >
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
              ref={ref}
              className={`overflow-hidden text-14 font-500 leading-[160%] text-basic-grey-600 ${
                useClamp ? 'line-clamp-2' : ''
              }`}
            >
              {review.content}
            </p>
            {clamped && (
              <button
                className="text-14 font-500 leading-[160%] text-basic-grey-500"
                onClick={() => setUseClamp((prev) => !prev)}
              >
                {useClamp ? '더보기' : '접기'}
              </button>
            )}
          </div>
          <div className="mt-4 flex w-full items-center justify-between gap-4">
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
      </article>
      {openImageUrl && (
        <ImageModal
          imageUrl={openImageUrl}
          onClose={() => setOpenImageUrl(null)}
        />
      )}
    </>
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
