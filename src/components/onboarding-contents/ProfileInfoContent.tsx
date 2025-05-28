'use client';

import { useFormContext } from 'react-hook-form';
import { OnboardingFormValues } from './onboarding.type';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { ERROR_MESSAGES, REG_EXP } from './formValidation.const';
import TextInput from '@/components/inputs/text-input/TextInput';
import OnboardingTitle from './OnboardingTitle';
import { MAX_FILE_SIZE } from '@/constants/common';
import { generateProfileBackgroundColor } from '@/utils/generateProfileBackgroundColor';

interface Props {
  hideTitle?: boolean;
  handleSubmit?: () => void;
  initialNickname: string;
  initialImageSrc?: string | null;
  setIsProfileImageReset: (isProfileImageReset: boolean) => void;
}

const ProfileInfoContent = ({
  hideTitle = false,
  handleSubmit,
  initialNickname,
  initialImageSrc,
  setIsProfileImageReset,
}: Props) => {
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
      toast.error('10MB 이하의 파일만 업로드 할 수 있어요.');
      return;
    }
    showImagePreview(file);
    setIsProfileImageReset(false);
  };

  const clearSelectedFile = () => {
    if (!fileInputRef.current) {
      return;
    }
    setImageFile(null);
    setImageSrc(null);
    fileInputRef.current.value = '';
    setIsProfileImageReset(true);
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

  const firstLetter = initialNickname.slice(0, 1);

  return (
    <>
      {!hideTitle && (
        <OnboardingTitle
          title="프로필을 입력해주세요"
          description="핸디버스가 어떻게 불러드릴까요?"
        />
      )}
      <div className="flex flex-col items-center justify-center gap-8 py-24">
        <div
          className="relative flex h-72 w-72 shrink-0 items-center justify-center overflow-hidden rounded-full"
          style={{
            backgroundColor: imageSrc
              ? 'transparent'
              : generateProfileBackgroundColor(firstLetter),
          }}
        >
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt="프로필 이미지"
              fill
              className="object-cover"
            />
          ) : (
            <p className="text-[36px] font-500 text-basic-white">
              {firstLetter}
            </p>
          )}
        </div>
        <div className="flex h-[34px]">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex h-full w-56 items-center justify-center text-14 font-600 text-basic-grey-500"
          >
            편집
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
              className="flex h-full w-56 items-center justify-center text-14 font-600 text-basic-grey-500"
            >
              삭제
            </button>
          )}
        </div>
      </div>
      <div className="px-16">
        <TextInput
          name="nickname"
          control={control}
          setValue={setValue}
          onKeyDown={handleEnter}
          placeholder={initialNickname}
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
