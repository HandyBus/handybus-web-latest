'use client';

import { useEffect, useState } from 'react';
import {
  getReservationDetailFirstVisitModalSeen,
  setReservationDetailFirstVisitModalSeen,
} from '@/utils/localStorage';
import AlertIcon from '../icons/icon-alert.svg';
import Button from '@/components/buttons/button/Button';

interface Props {
  reservationId: string;
  isHidden: boolean;
}

const FirstVisitModal = ({ reservationId, isHidden }: Props) => {
  const [isFirstVisitModalOpen, setIsFirstVisitModalOpen] = useState(false);

  const closeModal = () => {
    setIsFirstVisitModalOpen(false);
    setReservationDetailFirstVisitModalSeen(reservationId);
  };

  const handleFirstVisitModalCheck = () => {
    const hasSeenModal = getReservationDetailFirstVisitModalSeen(reservationId);
    if (!hasSeenModal) {
      setIsFirstVisitModalOpen(true);
    }
  };

  useEffect(() => {
    if (!isHidden) handleFirstVisitModalCheck();
  }, []);

  return (
    <div
      onClick={closeModal}
      className={`fixed bottom-0 left-0 right-0 top-0 z-[101] bg-basic-black/50 ${
        !isFirstVisitModalOpen && 'hidden'
      }`}
    >
      <section
        onClick={(e) => e.stopPropagation()}
        className="absolute left-1/2 top-1/2 flex w-[80dvw] max-w-[400px] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-16 rounded-[18px] bg-basic-white p-24"
      >
        <AlertIcon />
        {/* 메인 타이틀 */}
        <div className="flex flex-col gap-8">
          <h2 className="text-center text-18 font-700 leading-[140%]">
            꼭 확인해주세요
          </h2>
          <p className="text-center text-14 font-500 leading-[140%] text-basic-grey-600">
            편하고 원활한 탑승을 위해 탑승 전, 셔틀 정보와 유의사항을 꼭
            확인해주세요.
          </p>
        </div>
        <Button onClick={closeModal}>네, 확인할게요</Button>
      </section>
    </div>
  );
};

export default FirstVisitModal;
