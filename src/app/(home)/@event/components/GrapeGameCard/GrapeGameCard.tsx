'use client';

import { useState, useEffect } from 'react';
import GrapeGameIcon from './icons/grape.svg';
import CloseIcon from './icons/close.svg';
import Link from 'next/link';

// sessionStorage key로 탭이 살아있을때만 상태를 기억합니다.
const STORAGE_KEY = 'grape-game-card-dismissed';

const GrapeGameCard = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem(STORAGE_KEY);
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sessionStorage.setItem(STORAGE_KEY, 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <Link
      href="/game/catch-grape"
      className="mx-16 mt-24 flex justify-between rounded-8 bg-[#F3F0FD] p-16"
    >
      <div className="flex items-center gap-12">
        <GrapeGameIcon />
        <div>
          <p className="text-12 font-500 leading-[160%] text-basic-grey-600">
            피켓팅도 문제 없지
          </p>
          <h3 className="text-14 font-600 leading-[160%] text-[#5340BE]">
            포도알 트레이닝
          </h3>
        </div>
      </div>
      <button type="button" onClick={handleClose}>
        <CloseIcon />
      </button>
    </Link>
  );
};

export default GrapeGameCard;
