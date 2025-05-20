'use client';

import Image from 'next/image';
import AddIcon from '../../../icons/add.svg';
import XIcon from 'public/icons/x.svg';
import { ChangeEvent } from 'react';
import { DisplayImage } from './ReviewEditForm';

interface Props {
  images: DisplayImage[];
  handleFileSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFileRemove: (file: DisplayImage) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const EditPhotoAttachment = ({
  images,
  handleFileSelect,
  handleFileRemove,
  fileInputRef,
}: Props) => {
  const fileCount = images.length;
  return (
    <div className="flex flex-col gap-16">
      <div>
        <h2 className="text-18 font-600 leading-[160%]">
          사진 첨부 (선택사항)
        </h2>
        <p className="text-14 font-500 leading-[160%] text-basic-grey-600">
          이미지는 최대 10Mb까지 가능해요.
        </p>
      </div>
      <div className="flex gap-12">
        {images.map((image) => (
          <div
            key={image.previewUrl ?? image.original?.name}
            className="relative h-80 w-80 overflow-hidden rounded-12"
          >
            {image.previewUrl ? (
              <Image
                src={image.previewUrl}
                alt="리뷰 이미지"
                fill
                className="object-cover"
              />
            ) : image.original ? (
              <Image
                src={URL.createObjectURL(image.original)}
                alt="리뷰 이미지"
                fill
              />
            ) : null}
            <button
              type="button"
              onClick={() => handleFileRemove(image)}
              className="absolute right-4 top-4 flex h-20 w-20 items-center justify-center rounded-full bg-basic-grey-500"
            >
              <XIcon color="white" />
            </button>
          </div>
        ))}
        <button
          onClick={() => fileInputRef.current?.click()}
          type="button"
          className="flex h-80 w-80 flex-col items-center justify-center gap-4 rounded-8 bg-basic-grey-50 text-14 font-400 text-basic-grey-700"
        >
          <AddIcon />
          <span className="text-14 font-500 leading-[160%] text-basic-grey-400">
            {fileCount}/3
          </span>
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
      </div>
    </div>
  );
};

export default EditPhotoAttachment;
