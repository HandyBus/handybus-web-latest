'use client';

import { ChangeEvent, useRef, useState } from 'react';
import RatingInput from '../../../components/review-form/components/RatingInput';
import ReviewTextarea from '../../../components/review-form/components/ReviewTextarea';
import RecommendOption from '../../../components/review-form/components/RecommendOption';
import { toast } from 'react-toastify';
import { MAX_FILE_SIZE } from '@/constants/common';
import PhotoAttachment from '../../../components/review-form/components/PhotoAttachment';
import SurveyLinearScale from '../../../components/review-form/components/SurveyLinearScale';
import Button from '@/components/buttons/button/Button';
import { ReservationsViewEntity } from '@/types/reservation.type';
import { Controller, useForm } from 'react-hook-form';
import { CreateReviewRequest } from '@/types/review.type';
import { usePostReview } from '@/services/review.service';
import { useRouter } from 'next/navigation';
import { getImageUrl } from '@/services/core.service';

interface Props {
  reservation: ReservationsViewEntity;
}

const ReviewWriteForm = ({ reservation }: Props) => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateReviewRequest>({
    defaultValues: {
      eventId: reservation.shuttleRoute.event.eventId,
      reservationId: reservation.reservationId,
      recommendToOthers: false,
    },
  });

  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: postCreateReview } = usePostReview({
    onSuccess: (res) => {
      router.push(`/mypage/reviews/${res.id}`);
    },
  });

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    if (files.length + newFiles.length > 3) {
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

    setFiles((prev) => [...prev, ...newFiles]);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileRemove = (file: File) => {
    setFiles((prev) => prev.filter((f) => f !== file));
  };

  const onSubmit = async (data: CreateReviewRequest) => {
    try {
      const imageUrls = await Promise.all(
        files.map(async (file) => {
          const imageUrl = await getImageUrl({
            key: 'reviews',
            file,
          });
          return imageUrl;
        }),
      );

      await postCreateReview({
        ...data,
        images: imageUrls
          .filter((url) => url !== null && url !== undefined)
          .map((url) => ({ imageUrl: url })),
      });
    } catch {
      toast.error('후기를 등록하지 못했어요. 잠시 후 다시 시도해주세요.');
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
        rules={{ required: true }}
        render={({ field }) => (
          <RatingInput
            rating={field.value}
            setRating={(rating) =>
              setValue('overallRating', rating, { shouldValidate: true })
            }
          />
        )}
      />
      {errors.overallRating && (
        <p className={ERROR_STYLE}>별점을 선택해 주세요.</p>
      )}
      <Controller
        control={control}
        name="serviceRating"
        rules={{ required: true }}
        render={({ field }) => (
          <SurveyLinearScale
            title="서비스 이용은 어떠셨나요?"
            description="가입, 수요조사 참여, 예약 과정 등"
            value={field.value}
            onChange={(rating) =>
              setValue('serviceRating', rating, { shouldValidate: true })
            }
          />
        )}
      />
      {errors.serviceRating && (
        <p className={ERROR_STYLE}>만족도를 선택해 주세요.</p>
      )}
      <Controller
        control={control}
        name="rideRating"
        rules={{ required: true }}
        render={({ field }) => (
          <SurveyLinearScale
            title="탑승은 어떠셨나요?"
            description="기사님 친절도, 버스 청결도, 이동시간 등"
            value={field.value}
            onChange={(rating) =>
              setValue('rideRating', rating, { shouldValidate: true })
            }
          />
        )}
      />
      {errors.rideRating && (
        <p className={ERROR_STYLE}>만족도를 선택해 주세요.</p>
      )}
      <Controller
        control={control}
        name="content"
        rules={{ required: true, minLength: 20, maxLength: 1000 }}
        render={({ field }) => (
          <ReviewTextarea
            text={field.value}
            setText={(text) =>
              setValue('content', text, { shouldValidate: true })
            }
          />
        )}
      />
      {errors.content && (
        <p className={ERROR_STYLE}>최소 20자 이상 작성해주세요.</p>
      )}
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
      <PhotoAttachment
        files={files}
        handleFileSelect={handleFileSelect}
        handleFileRemove={handleFileRemove}
        fileInputRef={fileInputRef}
      />
      <div className="fixed bottom-0 left-0 right-0 z-10 mx-auto flex max-w-500 gap-8 bg-basic-white px-16 pb-24 pt-8">
        <Button
          variant="primary"
          size="large"
          type="submit"
          isLoading={isSubmitting}
        >
          등록하기
        </Button>
      </div>
    </form>
  );
};

export default ReviewWriteForm;

const ERROR_STYLE = 'text-14 font-400 leading-[160%] text-basic-red-400';
