'use client';

import Image from 'next/image';

interface Props {
  imageUrl: string;
  onClose: () => void;
}

const ImageModal = ({ imageUrl, onClose }: Props) => {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#000000] bg-opacity-60"
      onClick={onClose}
    >
      <figure className="relative h-[70dvh] max-h-[500px] w-[70dvw] max-w-[500px]">
        <Image
          src={imageUrl}
          alt="expanded image"
          fill
          className="object-contain"
        />
      </figure>
      =
    </div>
  );
};

export default ImageModal;
