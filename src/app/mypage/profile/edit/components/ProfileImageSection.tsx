'use client';

import { ChangeEvent, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { MAX_FILE_SIZE } from '@/constants/common';
import { generateProfileBackgroundColor } from '@/utils/generateProfileBackgroundColor';
import imageCompression from 'browser-image-compression';
import { getImageUrl } from '@/services/core.service';
import { putUser } from '@/services/user.service';
import Loading from '@/components/loading/Loading';

interface Props {
  initialName: string;
  initialImageSrc: string | null;
}

const ProfileImageSection = ({ initialName, initialImageSrc }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(
    initialImageSrc || null,
  );

  const [isLoading, setIsLoading] = useState(false);

  const updateUserProfileImage = async (file: File | null) => {
    try {
      setIsLoading(true);
      if (!file) {
        await putUser({
          profileImage: null,
        });
      } else {
        const compressedProfileImage = await imageCompression(file, {
          maxSizeMB: 0.3, // 0.3MB로 압축
        });
        const imageUrl = await getImageUrl({
          key: 'users/profiles',
          file: compressedProfileImage,
        });
        await putUser({
          profileImage: imageUrl,
        });
      }
      toast.success('프로필 이미지를 수정했어요.');
    } catch (error) {
      console.error(error);
      toast.error('프로필 이미지를 수정하지 못했어요.');
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const showImagePreview = (file: File | null) => {
    if (!file) {
      setImageSrc(null);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setImageSrc(reader.result as string);
  };

  const clearSelectedFile = async () => {
    if (!fileInputRef.current) {
      return;
    }

    await updateUserProfileImage(null);
    showImagePreview(null);

    fileInputRef.current.value = '';
  };

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    } else if (file.size > MAX_FILE_SIZE) {
      toast.error('10MB 이하의 파일만 업로드 할 수 있어요.');
      return;
    }
    await updateUserProfileImage(file);
    showImagePreview(file);
  };

  const firstLetter = initialName.slice(0, 1);

  return (
    <section className="flex flex-col items-center justify-center gap-8 py-24">
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
          <p className="text-[36px] font-500 text-basic-white">{firstLetter}</p>
        )}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-basic-black/[0.6]">
            <Loading />
          </div>
        )}
      </div>
      <div className="flex h-[34px]">
        <button
          type="button"
          disabled={isLoading}
          onClick={() => fileInputRef.current?.click()}
          className="flex h-full w-56 items-center justify-center text-14 font-600 text-basic-grey-500 disabled:opacity-50"
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
            disabled={isLoading}
            onClick={clearSelectedFile}
            className="flex h-full w-56 items-center justify-center text-14 font-600 text-basic-grey-500 disabled:opacity-50"
          >
            삭제
          </button>
        )}
      </div>
    </section>
  );
};

export default ProfileImageSection;
