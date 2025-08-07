'use client';

import { useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { getOneDayModalSeenDate } from '@/utils/localStorage';
import dayjs from 'dayjs';
import Link from 'next/link';

interface Props {
  image: StaticImageData;
  href?: string;
}

const ArgentModal = ({ image, href }: Props) => {
  const [isArgentModalOpen, setIsArgentModalOpen] = useState(false);
  const closeModal = () => {
    setIsArgentModalOpen(false);
  };

  const handleArgentModalOpen = () => {
    const isArgentModalSeenDate = getOneDayModalSeenDate();
    if (!isArgentModalSeenDate) {
      setIsArgentModalOpen(true);
    }
    const seenDate = dayjs(isArgentModalSeenDate).startOf('day');
    const today = dayjs().startOf('day');
    if (seenDate.isBefore(today)) {
      setIsArgentModalOpen(true);
    }
  };

  useEffect(() => {
    handleArgentModalOpen();
  }, []);

  return (
    <div
      onClick={closeModal}
      className={`fixed bottom-0 left-0 right-0 top-0 z-[101] bg-basic-black/50 ${
        !isArgentModalOpen && 'hidden'
      }`}
    >
      <section
        onClick={(e) => e.stopPropagation()}
        className="absolute left-1/2 top-1/2 flex w-[80dvw] max-w-[400px] -translate-x-1/2 -translate-y-1/2 flex-col gap-8 bg-transparent"
      >
        <Link
          href={href || ''}
          target="_blank"
          className={`relative aspect-square w-full ${href ? '' : 'pointer-events-none'}`}
        >
          <Image src={image} alt="modal" fill className="object-contain" />
        </Link>
        <div className="grid grid-cols-1">
          <button
            onClick={closeModal}
            className="text-16 font-600 text-basic-white"
          >
            닫기
          </button>
        </div>
      </section>
    </div>
  );
};

export default ArgentModal;
