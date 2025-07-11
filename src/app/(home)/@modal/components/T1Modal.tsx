'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import T1ModalImage from '../images/t1_0711.png';
import {
  getT1GiftRecommendationModalSeenDate,
  setT1GiftRecommendationModalSeenDate,
} from '@/utils/localStorage';
import dayjs from 'dayjs';
import Link from 'next/link';

const T1Modal = () => {
  const [isT1GiftRecommendationModalOpen, setIsT1GiftRecommendationModalOpen] =
    useState(false);
  const closeModal = () => {
    setIsT1GiftRecommendationModalOpen(false);
  };
  const handleT1GiftRecommendationModalOpen = () => {
    const isT1GiftRecommendationModalSeenDate =
      getT1GiftRecommendationModalSeenDate();
    if (!isT1GiftRecommendationModalSeenDate) {
      setIsT1GiftRecommendationModalOpen(true);
    }
    const seenDate = dayjs(isT1GiftRecommendationModalSeenDate).startOf('day');
    const today = dayjs().startOf('day');
    if (seenDate.isBefore(today)) {
      setIsT1GiftRecommendationModalOpen(true);
    }
  };
  const handleT1GiftRecommendationModalClose = () => {
    setIsT1GiftRecommendationModalOpen(false);
  };
  const handleT1GiftRecommendationModalCloseForToday = () => {
    setIsT1GiftRecommendationModalOpen(false);
    setT1GiftRecommendationModalSeenDate(dayjs().toISOString());
  };
  useEffect(() => {
    handleT1GiftRecommendationModalOpen();
  }, []);

  return (
    <div
      onClick={closeModal}
      className={`fixed bottom-0 left-0 right-0 top-0 z-[101] bg-basic-black/50 ${
        !isT1GiftRecommendationModalOpen && 'hidden'
      }`}
    >
      <section
        onClick={(e) => e.stopPropagation()}
        className="absolute left-1/2 top-1/2 flex w-[80dvw] max-w-[400px] -translate-x-1/2 -translate-y-1/2 flex-col gap-8 bg-transparent"
      >
        <Link
          href="https://x.com/Handy_Bus/status/1943596380662169976"
          target="_blank"
          className="relative aspect-square w-full"
        >
          <Image
            src={T1ModalImage}
            alt="modal"
            fill
            className="object-contain"
          />
        </Link>
        <div className="grid grid-cols-2">
          <button
            onClick={handleT1GiftRecommendationModalCloseForToday}
            className="border-r border-basic-white text-16 font-600 text-basic-white"
          >
            하루 안 보기
          </button>
          <button
            onClick={handleT1GiftRecommendationModalClose}
            className="text-16 font-600 text-basic-white"
          >
            닫기
          </button>
        </div>
      </section>
    </div>
  );
};

export default T1Modal;
