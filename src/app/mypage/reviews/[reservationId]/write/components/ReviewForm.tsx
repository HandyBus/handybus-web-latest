'use client';

import { ChangeEvent, useRef, useState } from 'react';
import RatingInput from './RatingInput';
import ReviewTextarea from './ReviewTextarea';
import RecommendOption from './RecommendOption';
import { toast } from 'react-toastify';
import { MAX_FILE_SIZE } from '@/constants/common';
import PhotoAttachment from './PhotoAttachment';
import SurveyLinearScale from './SurveyLinearScale';
import Button from '@/components/buttons/button/Button';

const ReviewForm = () => {
  const [rating, setRating] = useState<number>(0);
  const [serviceScale, setServiceScale] = useState<number>(0);
  const [rideScale, setRideScale] = useState<number>(0);
  const [text, setText] = useState<string>('');
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

  return (
    <form className="flex flex-col gap-40 px-16 pb-[157px] pt-[26px]">
      <RatingInput rating={rating} setRating={setRating} />
      <SurveyLinearScale
        title="서비스 이용은 어떠셨나요?"
        description="가입, 수요조사 참여, 예약 과정 등"
        value={serviceScale}
        onChange={setServiceScale}
      />
      <SurveyLinearScale
        title="탑승은 어떠셨나요?"
        description="기사님 친절도, 버스 청결도, 이동시간 등"
        value={rideScale}
        onChange={setRideScale}
      />
      <ReviewTextarea text={text} setText={setText} />
      <RecommendOption />
      <PhotoAttachment
        files={files}
        handleFileSelect={handleFileSelect}
        handleFileRemove={handleFileRemove}
        fileInputRef={fileInputRef}
      />
      <div className="fixed bottom-0 left-0 right-0 z-10 mx-auto flex max-w-500 gap-8 bg-basic-white px-16 pb-24 pt-8">
        <Button variant="primary" size="large" type="button" onClick={() => {}}>
          등록하기
        </Button>
      </div>
    </form>
  );
};

export default ReviewForm;
