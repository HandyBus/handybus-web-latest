'use client';

import useBottomSheet from '@/hooks/useBottomSheet';
import Button from '@/components/buttons/button/Button';
import ShareSheet from '@/components/bottom-sheet/share-sheet/ShareSheet';

interface Props {
  isNotOpen?: boolean;
  isSelected?: boolean;
  eventName: string;
}

const BottomBar = ({
  isNotOpen = false,
  isSelected = false,
  eventName,
}: Props) => {
  const { bottomSheetRef, contentRef, openBottomSheet, closeBottomSheet } =
    useBottomSheet();

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-10 mx-auto max-w-500 bg-white shadow-bottomBar">
        <div className="flex justify-between gap-12 px-16 py-8 font-600">
          {isNotOpen ? (
            <>
              <Button disabled>예약이 마감된 노선이에요</Button>
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
              <Button disabled={isNotOpen || !isSelected}>
                셔틀 예약하러 가기
              </Button>
            </>
          )}
        </div>
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
