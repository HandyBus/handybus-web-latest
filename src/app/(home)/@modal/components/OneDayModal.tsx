'use client';

import { useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import {
  getOneDayModalSeenDate,
  setOneDayModalSeenDate,
} from '@/utils/localStorage';
import dayjs from 'dayjs';

interface Props {
  image: StaticImageData;
  handleClick: () => void;
}

const OneDayModal = ({ image, handleClick }: Props) => {
  const [isOneDayModalOpen, setIsOneDayModalOpen] = useState(false);
  const closeModal = () => {
    setIsOneDayModalOpen(false);
  };

  const handleOneDayModalOpen = () => {
    const isOneDayModalSeenDate = getOneDayModalSeenDate();
    if (!isOneDayModalSeenDate) {
      setIsOneDayModalOpen(true);
    }
    const seenDate = dayjs(isOneDayModalSeenDate).startOf('day');
    const today = dayjs().startOf('day');
    if (seenDate.isBefore(today)) {
      setIsOneDayModalOpen(true);
    }
  };

  const handleOneDayModalCloseForToday = () => {
    setIsOneDayModalOpen(false);
    setOneDayModalSeenDate(dayjs().toISOString());
  };
  useEffect(() => {
    handleOneDayModalOpen();
  }, []);

  return (
    <div
      onClick={closeModal}
      className={`fixed bottom-0 left-0 right-0 top-0 z-[101] bg-basic-black/50 ${
        !isOneDayModalOpen && 'hidden'
      }`}
    >
      <section
        onClick={(e) => e.stopPropagation()}
        className="absolute left-1/2 top-1/2 flex w-[80dvw] max-w-[400px] -translate-x-1/2 -translate-y-1/2 flex-col bg-transparent"
      >
        <button type="button" onClick={handleClick} className="relative w-full">
          <Image
            src={image}
            alt="modal"
            width={400}
            height={300}
            className="rounded-t-4 object-contain"
          />
        </button>
        <div className="grid grid-cols-2">
          <button
            onClick={handleOneDayModalCloseForToday}
            className="rounded-bl-4 border-r border-basic-grey-100 bg-basic-white p-[10px] text-14 font-600"
          >
            하루동안 보지 않기
          </button>
          <button
            onClick={handleClick}
            className="rounded-br-4 bg-basic-white p-[10px] text-14 font-600"
          >
            닫기
          </button>
        </div>
      </section>
    </div>
  );
};

export default OneDayModal;
