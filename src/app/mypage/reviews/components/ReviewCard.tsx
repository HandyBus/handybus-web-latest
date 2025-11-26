'use client';

import Rating from '@/components/rating/Rating';
import { ReviewsViewEntity } from '@/types/review.type';
import { useState } from 'react';
import Image from 'next/image';
import { dateString } from '@/utils/dateString.util';
import ImageModal from './ImageModal';
import ReviewProperty from '@/components/review/ReviewProperty';
import { handleClickAndStopPropagation } from '@/utils/common.util';
import { checkIsReviewWritingPeriod } from '@/utils/review.util';
import { ReservationsViewEntity } from '@/types/reservation.type';
import Button from '@/components/buttons/button/Button';
import { useFlow } from '@/stacks';

interface Props {
  review: ReviewsViewEntity;
  reservation: ReservationsViewEntity;
}

const ReviewCard = ({ review, reservation }: Props) => {
  const [openImageUrl, setOpenImageUrl] = useState<string | null>(null);

  const eventName = review.eventName;
  const formattedReviewWrittenDate = dateString(review.createdAt, {
    showYear: true,
    showDate: true,
    showTime: true,
    showWeekday: true,
  });
  const { isReviewWritingPeriod } = checkIsReviewWritingPeriod(reservation);

  const flow = useFlow();
  const redirectToEditReview = handleClickAndStopPropagation(() => {
    if (!isReviewWritingPeriod) {
      return;
    }
    flow.push('EditReview', { reviewId: review.reviewId });
  });

  return (
    <>
      <div className="flex w-full flex-col rounded-12 border border-basic-grey-200 bg-basic-white p-16 text-left">
        <div>
          <h2 className="line-clamp-1 text-16 font-600 leading-[140%]">
            {eventName}
          </h2>
          <h3 className="text-12 font-500 leading-[160%] text-basic-grey-400">
            {formattedReviewWrittenDate} 작성
          </h3>
        </div>
        <div className="my-12 h-[1px] w-full bg-basic-grey-100" />
        <div className="flex w-full items-center gap-[6px]">
          <Rating size="medium" value={review.rating} />
          <div className="h-[10px] w-[1px] bg-basic-grey-100" />
          <ReviewProperty review={review} hidePassengerRegion />
        </div>
        {review.reviewImages && review.reviewImages.length > 0 && (
          <figure className="flex gap-4 py-4">
            {review.reviewImages?.map((image, index) => {
              return (
                <button
                  type="button"
                  className="relative h-60 w-60"
                  key={index}
                  onClick={() => {
                    setOpenImageUrl(image.imageUrl);
                  }}
                >
                  <Image
                    src={image.imageUrl}
                    alt={`${review.eventName} 후기 이미지 ${index + 1}`}
                    fill
                    className="rounded-8 object-cover"
                  />
                </button>
              );
            })}
          </figure>
        )}
        <p className="text-14 font-500 leading-[160%] text-basic-grey-600">
          {review.content}
        </p>
        {isReviewWritingPeriod && (
          <div className="mt-16">
            <Button
              type="button"
              variant="tertiary"
              size="large"
              onClick={redirectToEditReview}
            >
              후기 수정하기
            </Button>
          </div>
        )}
      </div>
      {openImageUrl && (
        <ImageModal
          imageUrl={openImageUrl}
          onClose={() => setOpenImageUrl(null)}
        />
      )}
    </>
  );
};

export default ReviewCard;
