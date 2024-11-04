'use client';

import Image from 'next/image';
import { useFormContext } from 'react-hook-form';
import CameraIcon from 'public/icons/camera.svg';
import Indicator from '@/components/indicator/Indicator';
import Button from '@/components/buttons/button/Button';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import TextInput from '@/components/inputs/text-input/TextInput';
import { OnboardingFormValues } from '../../page';
import { ERROR_MESSAGES, REG_EXP } from '../../constants/formValidation';

const DEFAULT_PROFILE_SRC = '/icons/default-profile.svg';

interface Props {
  handleNextStep: () => void;
}

const ProfileInfoStep = ({ handleNextStep }: Props) => {
  const { control, setValue, getValues, trigger } =
    useFormContext<OnboardingFormValues>();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const showImagePreview = (file: File) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageSrc(reader.result as string);
    };
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
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

  const handleCheckStep = async () => {
    const isStepValid = await trigger(['nickname']);

    if (isStepValid) {
      handleNextStep();
    }
  };

  return (
    <div className="relative h-full w-full grow">
      <div className="p-28">
        <h2 className="pb-[6px] text-26 font-700 text-grey-900">
          프로필을 입력해주세요
        </h2>
        <p className="text-14 font-600 text-grey-500">
          핸디버스가 어떻게 불러드릴까요?
        </p>
      </div>
      <div className="relative flex h-[286px] w-full flex-col items-center justify-center gap-12 py-28">
        <div className="relative flex h-200 w-200 items-center justify-center overflow-hidden rounded-full">
          <Image
            src={imageSrc || DEFAULT_PROFILE_SRC}
            alt="프로필 이미지"
            fill
            className="object-cover"
          />
        </div>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="absolute bottom-[calc(50%-85px)] right-[calc(50%-85px)] flex h-[34px] w-[34px] items-center justify-center rounded-full bg-black/30"
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
        {imageFile && (
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
      <div className="absolute bottom-[26px] flex w-full flex-col items-center bg-white">
        <div className="py-16">
          <Indicator max={4} value={1} />
        </div>
        <div className="w-full px-32 py-8">
          <Button type="button" onClick={handleCheckStep}>
            다음으로
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoStep;
