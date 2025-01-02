'use client';

import useBottomSheet from '@/hooks/useBottomSheet';
import ShareSheet from './ShareSheet';
import BottomBarDemandRequest from './BottomBarDemandRequest';
import BottomBarReservationRequest from './BottomBarReservationRequest';
import { BottomBarType, BOTTOM_BAR_TYPE } from './BottomBar.type';
import BottomBarContent from './BottomBarContent';
import BottomBarPortal from './BottomBarPortal';
import { useEffect, useState } from 'react';

interface Props {
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  handleNextStep?: () => void;
  handlePrevStep?: () => void;
  onSubmit?: () => void;
  type?: BottomBarType;
  message?: string;
  shuttleName?: string;
}
const BottomBar = ({
  variant = 'primary',
  disabled = false,
  handleNextStep,
  handlePrevStep,
  onSubmit,
  type,
  message,
  shuttleName,
}: Props) => {
  const { bottomSheetRef, contentRef, openBottomSheet, closeBottomSheet } =
    useBottomSheet();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  const content = (() => {
    switch (type) {
      case BOTTOM_BAR_TYPE.DEMAND:
        return (
          <BottomBarContent
            message={message || '수요 신청하기'}
            openBottomSheet={openBottomSheet}
            variant={variant}
            disabled={disabled}
            isCheckDemand={true}
            onSubmit={onSubmit}
          />
        );
      case BOTTOM_BAR_TYPE.DEMAND_WRITE:
        return (
          <BottomBarDemandRequest
            message="수요 신청하기"
            variant={variant}
            disabled={disabled}
            onSubmit={onSubmit}
          />
        );
      case BOTTOM_BAR_TYPE.RESERVATION:
        return (
          <BottomBarContent
            message={message || '셔틀 예약하러 가기'}
            openBottomSheet={openBottomSheet}
            variant={variant}
            disabled={disabled}
            onSubmit={onSubmit}
            doesHaveShareButton={true}
          />
        );
      case BOTTOM_BAR_TYPE.RESERVATION_WRITE.STEP_1:
      case BOTTOM_BAR_TYPE.RESERVATION_WRITE.STEP_2:
      case BOTTOM_BAR_TYPE.RESERVATION_WRITE.STEP_3:
      case BOTTOM_BAR_TYPE.RESERVATION_WRITE.STEP_4:
        return (
          <BottomBarReservationRequest
            type={type}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        );
      default:
        return null;
    }
  })();

  return (
    <BottomBarPortal>
      {content}
      <ShareSheet
        bottomSheetRef={bottomSheetRef}
        contentRef={contentRef}
        closeBottomSheet={closeBottomSheet}
        shuttleName={shuttleName}
      />
    </BottomBarPortal>
  );
};

export default BottomBar;
