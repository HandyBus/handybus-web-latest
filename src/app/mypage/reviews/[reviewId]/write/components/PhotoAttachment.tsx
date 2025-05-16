'use client';

import Image from 'next/image';
import AddIcon from '../icons/add.svg';
import XIcon from 'public/icons/x.svg';
import { ChangeEvent } from 'react';

interface Props {
  files: File[];
  handleFileSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFileRemove: (file: File) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const PhotoAttachment = ({
  files,
  handleFileSelect,
  handleFileRemove,
  fileInputRef,
}: Props) => {
  const fileCount = files.length;
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

export default PhotoAttachment;
