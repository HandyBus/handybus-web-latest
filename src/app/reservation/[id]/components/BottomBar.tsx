'use client';

import useBottomSheet from '@/hooks/useBottomSheet';
import Button from '@/components/buttons/button/Button';
import ShareSheet from '@/components/bottom-sheet/share-sheet/ShareSheet';

interface Props {
  disabled?: boolean;
  eventName: string;
}

const BottomBar = ({ disabled = false, eventName }: Props) => {
  const { bottomSheetRef, contentRef, openBottomSheet, closeBottomSheet } =
    useBottomSheet();

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-500 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="flex flex-col gap-4 px-16 py-8">
          <div className="flex justify-between gap-12 font-600">
            <Button disabled={disabled}>셔틀 예약하러 가기</Button>
            <Button type="button" variant="secondary" onClick={openBottomSheet}>
              친구에게 알리기
            </Button>
          </div>
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
