'use client';

import useBottomSheet from '@/hooks/useBottomSheet';
import Button from '@/components/buttons/button/Button';
import ShareSheet from '@/components/bottom-sheet/share-sheet/ShareSheet';

interface Props {
  eventName: string;
  isNotOpen?: boolean;
  isSelected?: boolean;
  isLoading?: boolean;
  isSeatFull?: boolean;
}

const BottomBar = ({
  isNotOpen = false,
  isSelected = false,
  eventName,
  isLoading = false,
  isSeatFull = false,
}: Props) => {
  const { bottomSheetRef, contentRef, openBottomSheet, closeBottomSheet } =
    useBottomSheet();

  const getButtonText = () => {
    if (isNotOpen) {
      return '예약이 마감된 노선이에요';
    } else if (isSelected && !isSeatFull) {
      return '셔틀 예약하러 가기';
    } else if (isSelected && isSeatFull) {
      return '자리가 다 찼어요';
    } else if (!isSelected) {
      return '노선을 선택해주세요';
    } else {
      return '';
    }
  };
  const buttonText = getButtonText();

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-10 mx-auto h-60 max-w-500 bg-white shadow-bottomBar">
        {!isLoading && (
          <div className="flex justify-between gap-12 px-16 py-8 font-600">
            {isNotOpen ? (
              <>
                <Button disabled>{buttonText}</Button>
              </>
            ) : (
              <>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={openBottomSheet}
                >
                  친구에게 알리기
                </Button>
                <Button disabled={isNotOpen || !isSelected || isSeatFull}>
                  {buttonText}
                </Button>
              </>
            )}
          </div>
        )}
      </div>
      <ShareSheet
        bottomSheetRef={bottomSheetRef}
        contentRef={contentRef}
        closeBottomSheet={closeBottomSheet}
        eventName={eventName}
      />
    </>
  );
};

export default BottomBar;
