'use client';

import AppBar from '@/components/app-bar/AppBar';
import Rating from '@/components/rating/Rating';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import CameraIcon from 'public/icons/camera-black.svg';
import Button from '@/components/buttons/button/Button';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { MAX_FILE_SIZE } from '@/constants/common';
import XIcon from 'public/icons/x.svg';
import { useGetUserReservation, usePostUserReview } from '@/services/users';
import ReservationCard from '@/app/mypage/shuttle/components/ReservationCard';
import Loading from '@/components/loading/Loading';
import { getImageUrl } from '@/services/common';

interface Props {
  params: {
    id: string;
  };
}

const WriteReview = ({ params }: Props) => {
  const { data: reservation } = useGetUserReservation(Number(params.id));

  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    if (newFiles.length > 3) {
      toast.error('최대 3개의 사진만 첨부할 수 있습니다.');
      return;
    }
    newFiles.forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        toast.error('10MB 이하의 파일만 업로드 할 수 있습니다.');
        return;
      }
    });

    setFiles(newFiles);
  };

  const handleFileRemove = (file: File) => {
    setFiles((prev) => prev.filter((f) => f !== file));
  };

  const { mutate: postUserReview } = usePostUserReview();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.length < 20) {
      toast.error('20자 이상 작성해주세요.');
      return;
    }
    if (!reservation) {
      toast.error('잠시 후 다시 시도해주세요.');
      return;
    }

    const imageUrls = await Promise.all(
      files.map(async (file) => {
        const imageUrl = await getImageUrl({
          key: 'reviews',
          file,
        });
        return imageUrl;
      }),
    );

    postUserReview({
      shuttleId: reservation.shuttle.shuttleId,
      reservationId: reservation.reservationId,
      rating,
      content: text,
      images: imageUrls
        .filter((url) => url !== null && url !== undefined)
        .map((url) => ({ imageUrl: url })),
    });
  };

  return (
    <>
      <AppBar>후기 작성</AppBar>
      <form onSubmit={handleSubmit} className="relative grow">
        {reservation ? (
          <ReservationCard reservation={reservation} />
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
            className="h-160 w-full resize-none rounded-[12px] border border-grey-100 p-12 text-16 font-400 outline-none placeholder:text-grey-300"
          />
          <div className="flex gap-12">
            <button
              onClick={() => fileInputRef.current?.click()}
              type="button"
              className="flex h-80 w-80 flex-col items-center justify-center gap-4 rounded-[8px] bg-grey-50 text-14 font-400 text-grey-700"
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
                className="relative h-80 w-80 overflow-hidden rounded-[12px]"
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
                  className="absolute right-4 top-4 flex h-20 w-20 items-center justify-center rounded-full bg-grey-500"
                >
                  <XIcon color="white" />
                </button>
              </div>
            ))}
          </div>
        </section>
        <div className="absolute bottom-0 left-0 right-0 p-28">
          <Button>제출하기</Button>
        </div>
      </form>
    </>
  );
};

export default WriteReview;
