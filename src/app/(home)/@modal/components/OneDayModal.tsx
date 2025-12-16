'use client';

import { useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import {
  getOneDayModalSeenDate,
  setOneDayModalSeenDate,
} from '@/utils/localStorage';
import dayjs from 'dayjs';

/**
 * OneDayModal
 * variant로 두가지 버전의 모달 디자인을 사용할 수 있습니다.
 * white: 흰색 버튼 radius-t 4px, transparent: 투명색 버튼, radius 16px
 *
 * @param image 모달 이미지
 * @param handleClick 모달 이미지 클릭 시 이벤트
 * @param variant 모달 종류 (white: 흰색 버튼, transparent: 투명색 버튼)
 * @param closeForTodayText 하루동안 보지 않기 텍스트
 * @param onClose 모달 닫힐 때 이벤트 (배경 클릭, 닫기 버튼, 하루 안 보기 등 모든 닫기 동작)
 */

interface Props {
  image: StaticImageData;
  handleClick: () => void;
  variant?: 'white' | 'transparent';
  closeForTodayText?: string;
  onClose?: () => void;
}

const OneDayModal = ({
  image,
  handleClick,
  variant = 'white',
  closeForTodayText = '하루동안 보지 않기',
  onClose,
}: Props) => {
  const [isOneDayModalOpen, setIsOneDayModalOpen] = useState(false);
  const closeModal = () => {
    setIsOneDayModalOpen(false);
    onClose?.();
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
    onClose?.();
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
            className={`${variant === 'white' ? 'rounded-t-4' : 'rounded-16'} object-contain`}
          />
        </button>
        <div className="grid grid-cols-2">
          <button
            onClick={handleOneDayModalCloseForToday}
            className={`${
              variant === 'white'
                ? 'rounded-bl-4 border-r border-basic-grey-100 bg-basic-white text-14 font-600'
                : 'relative bg-transparent text-16 font-500 text-basic-white after:absolute after:right-0 after:top-1/2 after:h-[12px] after:w-[1px] after:-translate-y-1/2 after:bg-basic-white/50 after:content-[""]'
            } p-[10px]`}
          >
            {closeForTodayText}
          </button>
          <button
            onClick={closeModal}
            className={`${variant === 'white' ? 'rounded-br-4 bg-basic-white text-14 font-600' : 'bg-transparent text-16 font-500 text-basic-white'} p-[10px] `}
          >
            닫기
          </button>
        </div>
      </section>
    </div>
  );
};

export default OneDayModal;
