'use client';

import Rating from '@/components/rating/Rating';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import CameraIcon from 'public/icons/camera-black.svg';
import Button from '@/components/buttons/button/Button';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { MAX_FILE_SIZE } from '@/constants/common';
import XIcon from 'public/icons/x.svg';
import ReservationCard from '@/app/mypage/shuttle/components/ReservationCard';
import Loading from '@/components/loading/Loading';
import { useGetUserReservation } from '@/services/reservation.service';
import { usePostReview } from '@/services/review.service';
import { getImageUrl } from '@/services/core.service';
import { useRouter } from 'next/navigation';
import Header from '@/components/header/Header';

interface Props {
  params: {
    id: string;
  };
}

const WriteReview = ({ params }: Props) => {
  const { data } = useGetUserReservation(params.id);

  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { mutate: postReview } = usePostReview({
    onSuccess: () => router.replace('/mypage/reviews'),
    onSettled: () => setIsLoading(false),
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.length < 20) {
      toast.error('20자 이상 작성해 주세요.');
      return;
    }
    if (!data) {
      toast.error('잠시 후 다시 시도해 주세요.');
      return;
    }

    setIsLoading(true);
    const imageUrls = await Promise.all(
      files.map(async (file) => {
        const imageUrl = await getImageUrl({
          key: 'reviews',
          file,
        });
        return imageUrl;
      }),
    );

    postReview({
      eventId: data.reservation.shuttleRoute.eventId,
      reservationId: data.reservation.reservationId,
      rating,
      content: text,
      images: imageUrls
        .filter((url) => url !== null && url !== undefined)
        .map((url) => ({ imageUrl: url })),
    });
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit} className="relative grow pb-100">
        {data ? (
          <ReservationCard reservation={data.reservation} />
        ) : (
          <div className="flex h-192 grow items-center justify-center">
            <Loading />
          </div>
        )}
        <section className="flex w-full flex-col gap-16 p-28 pb-8">
          <h5>이번 셔틀의 만족도를 입력해주세요</h5>
          <div>
            <Rating size="large" value={rating} onChange={setRating} />
          </div>
        </section>
        <section className="flex w-full flex-col gap-16 p-28">
          <h5>후기를 작성해주세요 (20자 이상)</h5>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="자유로운 후기를 작성해주세요. 핸디버스 발전에 도움이 됩니다. (장단점, 건의사항 등)"
            className="h-160 w-full resize-none rounded-12 border border-basic-grey-100 p-12 text-16 font-400 outline-none placeholder:text-basic-grey-300"
          />
          <div className="flex gap-12">
            <button
              onClick={() => fileInputRef.current?.click()}
              type="button"
              className="flex h-80 w-80 flex-col items-center justify-center gap-4 rounded-8 bg-basic-grey-50 text-14 font-400 text-basic-grey-700"
            >
              <CameraIcon />
              <span>사진 첨부</span>
              <input
                ref={fileInputRef}
                type="file"
                id="imageUpload"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
            </button>
            {files.map((file) => (
              <div
                key={file.name}
                className="relative h-80 w-80 overflow-hidden rounded-12"
              >
                <Image
                  src={URL.createObjectURL(file)}
                  alt="리뷰 이미지"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleFileRemove(file)}
                  className="absolute right-4 top-4 flex h-20 w-20 items-center justify-center rounded-full bg-basic-grey-500"
                >
                  <XIcon color="white" />
                </button>
              </div>
            ))}
          </div>
        </section>
        <div className="absolute bottom-0 left-0 right-0 bg-basic-white p-28">
          <Button disabled={isLoading}>제출하기</Button>
        </div>
      </form>
    </>
  );
};

export default WriteReview;
