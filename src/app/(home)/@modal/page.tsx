'use client';

import ConfirmModal from '@/components/modals/confirm/ConfirmModal';
import CustomModal from '@/components/modals/CustomModal';
import {
  getFirstSignup,
  getReservationCompleted,
  removeFirstSignup,
  removeReservationCompleted,
} from '@/utils/localStorage';
import { useEffect, useState } from 'react';
import FirstSignupCoupon from './images/first-signup-coupon.svg';
import Button from '@/components/buttons/button/Button';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const handleOpenInNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // 예약 완료 모달
  const [isReservationCompletedOpen, setIsReservationCompletedOpen] =
    useState(false);
  const handleIsReservationCompleted = () => {
    const isReservationCompleted = getReservationCompleted();
    if (isReservationCompleted) {
      setIsReservationCompletedOpen(true);
    }
  };
  const handleIsReservationCompletedClose = () => {
    setIsReservationCompletedOpen(false);
    removeReservationCompleted();
  };
  useEffect(() => {
    handleIsReservationCompleted();
  }, []);

  // 첫 가입 쿠폰 모달
  const [isFirstSignupOpen, setIsFirstSignupOpen] = useState(false);
  const handleIsFirstSignup = () => {
    const isFirstSignup = getFirstSignup();
    if (isFirstSignup) {
      setIsFirstSignupOpen(true);
    }
  };
  const handleIsFirstSignupClose = () => {
    setIsFirstSignupOpen(false);
    removeFirstSignup();
  };
  const handleIsFirstSignupToCouponPage = () => {
    router.push('/mypage/coupons');
    removeFirstSignup();
  };
  useEffect(() => {
    handleIsFirstSignup();
  }, []);

  return (
    <>
      <ConfirmModal
        isOpen={isReservationCompletedOpen}
        onClosed={handleIsReservationCompletedClose}
        onConfirm={() => {
          handleOpenInNewTab(process.env.NEXT_PUBLIC_FEEDBACK_FORM_URL ?? '');
        }}
        title="의견을 남겨주세요!"
        description="핸디버스에서 예약은 어떠셨나요? 
여러분의 소중한 의견을 들려주세요!"
        buttonLabels={{ back: '닫기', confirm: '의견 남기기' }}
        variant="primary"
      />
      <CustomModal
        isOpen={isFirstSignupOpen}
        onClosed={handleIsFirstSignupClose}
        styles="fixed top-50 left-50 z-[101] flex w-280 flex-col items-center justify-center gap-32 rounded-xl bg-white p-24"
      >
        <div className="flex w-full flex-col items-center">
          <h3 className="pb-28 pt-12 text-20 font-700">쿠폰이 도착했어요!</h3>
          <FirstSignupCoupon />
          <p className="pb-16 pt-24 text-center text-14 font-400 text-grey-700">
            핸디버스에 오신 것을 환영해요!
            <br />
            웰컴기프트로 쿠폰함에 10,000원을
            <br />쏙 넣어드렸어요.
            <br />
            <span className="text-10 font-400 text-grey-400">
              * 전화번호 당 하나씩만 받을 수 있어요.
            </span>
          </p>
          <Button onClick={handleIsFirstSignupClose}>확인</Button>
          <button
            onClick={handleIsFirstSignupToCouponPage}
            className="mt-[14px] text-14 font-600 text-grey-300"
          >
            쿠폰함 가기
          </button>
        </div>
      </CustomModal>
    </>
  );
};

export default Page;
