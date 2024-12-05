'use client';

import { useFormContext } from 'react-hook-form';
import { OnboardingFormValues } from './onboarding.types';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import CameraIcon from 'public/icons/camera.svg';
import { ERROR_MESSAGES, REG_EXP } from './formValidation.constants';
import TextInput from '@/components/inputs/text-input/TextInput';
import OnboardingTitle from './OnboardingTitle';
import { DEFAULT_PROFILE_IMAGE, MAX_FILE_SIZE } from '@/constants/common';

interface Props {
  handleSubmit?: () => void;
  initialImageSrc?: string;
}

const ProfileInfoContent = ({ handleSubmit, initialImageSrc }: Props) => {
  const { control, setValue, getValues } =
    useFormContext<OnboardingFormValues>();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(
    initialImageSrc || null,
  );
  useEffect(() => {
    setImageSrc(initialImageSrc || null);
  }, [initialImageSrc]);

  const showImagePreview = (file: File) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setImageSrc(reader.result as string);
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    } else if (file.size > MAX_FILE_SIZE) {
      toast.error('10MB 이하의 파일만 업로드 할 수 있습니다.');
      return;
    }
    showImagePreview(file);
  };

  const clearSelectedFile = () => {
    if (!fileInputRef.current) {
      return;
    }
    setImageFile(null);
    setImageSrc(null);
    fileInputRef.current.value = '';
  };

  useEffect(() => {
    const savedFile = getValues('profileImage');
    if (!savedFile) {
      return;
    }
    showImagePreview(savedFile);
  }, []);

  useEffect(() => {
    if (!fileInputRef.current) {
      return;
    }
    setValue('profileImage', imageFile);
  }, [imageFile]);

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit?.();
    }
  };

  return (
    <>
      <OnboardingTitle
        title="프로필을 입력해주세요"
        description="핸디버스가 어떻게 불러드릴까요?"
      />
      <div className="relative flex h-[200px] w-full flex-col items-center justify-center gap-12">
        <div className="relative flex h-180 w-180 shrink-0 items-center justify-center overflow-hidden rounded-full">
          <Image
            src={imageSrc || DEFAULT_PROFILE_IMAGE}
            alt="프로필 이미지"
            fill
            className="object-cover"
          />
        </div>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-[calc(50%-78px)] right-[calc(50%-78px)] flex h-[34px] w-[34px] items-center justify-center rounded-full bg-black/30"
        >
          <CameraIcon />
          <input
            ref={fileInputRef}
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </button>
        {imageSrc && (
          <button
            type="button"
            onClick={clearSelectedFile}
            className="h-[18px] text-14 font-500 text-grey-600-sub underline underline-offset-2"
          >
            프로필 사진 지우기
          </button>
        )}
      </div>
      <div className="p-28">
        <TextInput
          name="nickname"
          control={control}
          setValue={setValue}
          onKeyDown={handleEnter}
          placeholder="영문/한글/숫자 포함 2 ~ 12자"
          rules={{
            required: ERROR_MESSAGES.nickname.required,
            pattern: {
              value: REG_EXP.nickname,
              message: ERROR_MESSAGES.nickname.pattern,
            },
          }}
        >
          닉네임
        </TextInput>
      </div>
    </>
  );
};

export default ProfileInfoContent;
