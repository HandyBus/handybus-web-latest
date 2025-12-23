'use client';

import { ChangeEvent, useRef, useState } from 'react';
import RatingInput from '../../../components/review-form/components/RatingInput';
import ReviewTextarea from '../../../components/review-form/components/ReviewTextarea';
import RecommendOption from '../../../components/review-form/components/RecommendOption';
import { toast } from 'react-toastify';
import { MAX_FILE_SIZE } from '@/constants/common';
import EditPhotoAttachment from './EditPhotoAttachment';
import SurveyLinearScale from '../../../components/review-form/components/SurveyLinearScale';
import Button from '@/components/buttons/button/Button';
import { Controller, useForm } from 'react-hook-form';
import { CreateReviewRequest, ReviewsViewEntity } from '@/types/review.type';
import { usePutReview } from '@/services/review.service';
import { useRouter } from 'next/navigation';
import { getImageUrl } from '@/services/core.service';
import * as Sentry from '@sentry/nextjs';
import dayjs from 'dayjs';

interface Props {
  review: ReviewsViewEntity;
}

const ReviewEditForm = ({ review }: Props) => {
  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateReviewRequest>({
    defaultValues: {
      eventId: review.eventId,
      reservationId: review.reservationId,
      recommendToOthers: !!review.recommendToOthers,
      overallRating: review.overallRating,
      serviceRating: review.serviceRating,
      rideRating: review.rideRating,
      content: review.content,
      images: review.reviewImages?.map((image) => ({
        imageUrl: image.imageUrl,
      })),
    },
  });

  const router = useRouter();
  const [displayImages, setDisplayImages] = useState<DisplayImage[]>(
    review.reviewImages?.map((image) => ({
      previewUrl: image.imageUrl,
    })) ?? [],
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: putReview } = usePutReview({
    onSuccess: () => {
      router.push(`/mypage/reviews/${review.reviewId}`);
    },
  });

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    const images = getValues('images');
    if ((images?.length ?? 0) + newFiles.length > 3) {
      toast.error('최대 3개의 사진만 첨부할 수 있어요.');
      return;
    }

    const isValidSize = newFiles.every((file) => {
      if (file.size > MAX_FILE_SIZE) {
        toast.error('10MB 이하의 파일만 업로드 할 수 있어요.');
        return false;
      }
      return true;
    });

    if (!isValidSize) return;

    setDisplayImages((prev) => [
      ...prev,
      ...newFiles.map((f) => ({ original: f })),
    ]);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileRemove = (image: DisplayImage) => {
    setDisplayImages((prev) =>
      prev.filter(
        (f) =>
          f.original?.name !== image.original?.name ||
          f.previewUrl !== image.previewUrl,
      ),
    );
  };

  const onSubmit = async (data: CreateReviewRequest) => {
    try {
      const imageUrls = await Promise.all(
        displayImages.map(async (file) => {
          if (file.original) {
            const imageUrl = await getImageUrl({
              key: 'reviews',
              file: file.original,
            });
            return imageUrl;
          }
          return file.previewUrl;
        }),
      );

      await putReview({
        ...data,
        reviewId: review.reviewId,
        images: imageUrls
          .filter((url) => url !== null && url !== undefined)
          .map((url) => ({ imageUrl: url })),
      });
    } catch (error) {
      Sentry.captureException(error, {
        tags: {
          component: 'ReviewEditForm',
          page: 'mypage',
          feature: 'review',
          action: 'edit-review',
          environment: process.env.NODE_ENV || 'development',
        },
        extra: {
          reviewId: review.reviewId,
          eventId: review.eventId,
          reservationId: review.reservationId,
          imageCount: displayImages.length,
          timestamp: dayjs().toISOString(),
        },
      });
      toast.error('후기를 수정하지 못했어요. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-40 px-16 pb-[157px] pt-[26px]"
    >
      <Controller
        control={control}
        name="overallRating"
        rules={{ required: '별점을 선택해 주세요.' }}
        render={({ field }) => (
          <RatingInput
            rating={field.value}
            setRating={(rating) =>
              setValue('overallRating', rating, { shouldValidate: true })
            }
            errorMessage={errors.overallRating?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="serviceRating"
        rules={{ required: '만족도를 선택해 주세요.' }}
        render={({ field }) => (
          <SurveyLinearScale
            title="서비스 이용은 어떠셨나요?"
            description="가입, 수요조사 참여, 예약 과정 등"
            value={field.value}
            onChange={(rating) =>
              setValue('serviceRating', rating, { shouldValidate: true })
            }
            errorMessage={errors.serviceRating?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="rideRating"
        rules={{ required: '만족도를 선택해 주세요.' }}
        render={({ field }) => (
          <SurveyLinearScale
            title="탑승은 어떠셨나요?"
            description="기사님 친절도, 버스 청결도, 이동시간 등"
            value={field.value}
            onChange={(rating) =>
              setValue('rideRating', rating, { shouldValidate: true })
            }
            errorMessage={errors.rideRating?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="content"
        rules={{
          required: '최소 20자 이상 작성해 주세요.',
          minLength: {
            value: 20,
            message: '최소 20자 이상 작성해 주세요.',
          },
          maxLength: {
            value: 300,
            message: '입력 가능한 글자 수를 초과했어요. (최대 300자)',
          },
        }}
        render={({ field }) => (
          <ReviewTextarea
            text={field.value}
            setText={(text) =>
              setValue('content', text, { shouldValidate: true })
            }
            errorMessage={errors.content?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="recommendToOthers"
        render={({ field }) => (
          <RecommendOption
            checked={field.value}
            onChange={(checked) => setValue('recommendToOthers', checked)}
          />
        )}
      />
      <EditPhotoAttachment
        images={displayImages}
        handleFileSelect={handleFileSelect}
        handleFileRemove={handleFileRemove}
        fileInputRef={fileInputRef}
      />
      <div className="fixed bottom-0 right-[calc(max(0px,calc(100dvw-1280px)/2))] z-10 flex w-full max-w-500 gap-8 bg-basic-white px-16 pb-24 pt-8">
        <Button
          variant="primary"
          size="large"
          type="submit"
          isLoading={isSubmitting}
        >
          수정하기
        </Button>
      </div>
    </form>
  );
};

export default ReviewEditForm;

export type DisplayImage = {
  previewUrl?: string;
  original?: File;
};
