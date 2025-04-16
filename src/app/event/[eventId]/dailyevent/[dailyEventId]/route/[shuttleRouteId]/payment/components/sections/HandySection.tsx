import Button from '@/components/buttons/button/Button';
import Section from '../Section';
import { UsersViewEntity } from '@/types/user.type';
import useBottomSheet from '@/hooks/useBottomSheet';
import BottomSheet from '@/components/bottom-sheet/BottomSheet';
import CloseIcon from '../../icons/close.svg';
import WhatIsHandyContent from '@/app/help/what-is-handy/components/WhatIsHandyContent';
import { TripType } from '@/types/shuttleRoute.type';
import {
  calculateHandyDiscountAmount,
  PriceOfTripType,
} from '@/utils/event.util';
import CheckIcon from '../../icons/check.svg';
import Modal from '@/components/modals/Modal';
import { useState } from 'react';

interface HandySectionProps {
  user: UsersViewEntity;
  tripType: TripType;
  priceOfTripType: PriceOfTripType;
  isHandyApplied: boolean;
  setIsHandyApplied: (isHandyApplied: boolean) => void;
}

const HandySection = ({
  user,
  tripType,
  priceOfTripType,
  isHandyApplied,
  setIsHandyApplied,
}: HandySectionProps) => {
  const { bottomSheetRef, contentRef, openBottomSheet, closeBottomSheet } =
    useBottomSheet();
  const [isCancelApplyModalOpen, setIsCancelApplyModalOpen] = useState(false);

  const canApply = tripType === 'ROUND_TRIP';
  const handyDiscountAmount = calculateHandyDiscountAmount(
    priceOfTripType,
    tripType,
  );

  const openBottomSheetButtonText = isHandyApplied ? '취소하기' : '알아보기';

  const applyStatusText = isHandyApplied ? (
    <div className="flex flex-col items-center gap-8">
      <p className="flex items-center gap-8">
        <CheckIcon />
        <span className="text-16 font-700 text-brand-primary-400">
          핸디 지원 완료!
        </span>
        <div className="w-[18px]" />
      </p>
      <p className="text-12 font-600">
        {user.nickname}님, 지원해 주셔서 감사합니다.
        <br />
        확정 여부는 공연 전 평균 8일 내에 알려드려요.
        <br />
        핸디로 선정되면 지원금을 받으실 수 있어요.
      </p>
    </div>
  ) : canApply ? (
    <span className="text-12 font-600">
      {user.nickname}님은{' '}
      <span className="text-brand-primary-400">
        {handyDiscountAmount.toLocaleString()}원
      </span>
      을 할인받을 수 있어요.
    </span>
  ) : (
    <span className="text-12 font-600 text-basic-grey-500">
      핸디는 왕복만 지원할 수 있어요.
    </span>
  );
  const bottomSheetButtonText = canApply
    ? '지원하기'
    : '핸디는 왕복만 지원할 수 있어요';

  const handleApplyHandy = () => {
    setIsHandyApplied(true);
    closeBottomSheet();
  };

  return (
    <>
      <Section
        heading={
          <>
            <span>핸디 지원</span>
            <Button
              variant={canApply && !isHandyApplied ? 'secondary' : 'tertiary'}
              size="small"
              onClick={() => {
                if (!isHandyApplied) {
                  openBottomSheet();
                } else {
                  setIsCancelApplyModalOpen(true);
                }
              }}
            >
              {openBottomSheetButtonText}
            </Button>
          </>
        }
      >
        <div className="flex min-h-36 w-full justify-center rounded-8 bg-basic-grey-50 p-8 text-center">
          {applyStatusText}
        </div>
      </Section>
      <BottomSheet
        ref={bottomSheetRef}
        title={
          <div className="relative flex w-full items-center justify-center">
            <span>핸디 할인 받기</span>
            <button
              type="button"
              className="absolute right-0"
              onClick={closeBottomSheet}
            >
              <CloseIcon />
            </button>
          </div>
        }
      >
        <div
          ref={contentRef}
          className="relative -mx-24 -mb-16 overflow-y-auto"
        >
          <WhatIsHandyContent />
          <div className="sticky bottom-0 left-0 right-0 z-10 mx-auto flex max-w-500 gap-8 bg-basic-white px-16 pb-24 pt-8">
            <Button
              variant="primary"
              size="large"
              type="button"
              disabled={isHandyApplied || !canApply}
              onClick={handleApplyHandy}
            >
              {bottomSheetButtonText}
            </Button>
          </div>
        </div>
      </BottomSheet>
      <Modal
        isOpen={isCancelApplyModalOpen}
        closeModal={() => setIsCancelApplyModalOpen(false)}
        title={<span className="text-20 font-700">지원을 취소하시겠어요?</span>}
        primaryButton={{
          variant: 'tertiary',
          text: '계속 할게요',
          onClick: () => {
            setIsCancelApplyModalOpen(false);
          },
        }}
        secondaryButton={{
          variant: 's-destructive',
          text: '취소할게요',
          onClick: () => {
            setIsHandyApplied(false);
            setIsCancelApplyModalOpen(false);
          },
        }}
      >
        <p className="text-16 font-500 text-basic-grey-600">
          지금 취소하면 지원 혜택도 함께 사라져요.
          <br />
          정말 핸디를 그만두시겠어요?
        </p>
      </Modal>
    </>
  );
};

export default HandySection;
