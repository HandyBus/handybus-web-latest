'use client';

import useBottomSheet from '@/hooks/useBottomSheet';
import ShareSheet from './ShareSheet';
import BottomBarDemandRequest from './BottomBarDemandRequest';
import BottomBarReservationRequest from './BottomBarReservationRequest';
import { BottomBarType, BOTTOM_BAR_TYPE } from './BottomBar.type';
import BottomBarContent from './BottomBarContent';
import BottomBarPortal from './BottomBarPortal';

interface Props {
  variant?: 'primary' | 'secondary' | 'alert' | 'modalSecondary';
  disabled?: boolean;
  handleNextStep?: () => void;
  handlePrevStep?: () => void;
  onSubmit?: () => void;
  type?: BottomBarType;
}
const BottomBar = ({
  variant = 'primary',
  disabled = false,
  handleNextStep,
  handlePrevStep,
  onSubmit,
  type,
}: Props) => {
  const { bottomSheetRef, contentRef, openBottomSheet } = useBottomSheet();

  const content = (() => {
    switch (type) {
      case BOTTOM_BAR_TYPE.DEMAND:
        return (
          <BottomBarContent
            message="수요 신청하기"
            openBottomSheet={openBottomSheet}
            variant={variant}
            disabled={disabled}
            onSubmit={onSubmit}
          />
        );
      case BOTTOM_BAR_TYPE.DEMAND_WRITE:
        return (
          <BottomBarDemandRequest
            message="수요 신청하기"
            disabled={disabled}
            onSubmit={onSubmit}
          />
        );
      case BOTTOM_BAR_TYPE.RESERVATION:
        return (
          <BottomBarContent
            message="셔틀 예약하러 가기"
            openBottomSheet={openBottomSheet}
            variant={variant}
            disabled={disabled}
            onSubmit={onSubmit}
            doesHaveShareButton={false}
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
      <ShareSheet bottomSheetRef={bottomSheetRef} contentRef={contentRef} />
    </BottomBarPortal>
  );
};

export default BottomBar;
