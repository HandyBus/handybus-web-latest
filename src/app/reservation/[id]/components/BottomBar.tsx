'use client';

import useBottomSheet from '@/hooks/useBottomSheet';
import Button from '@/components/buttons/button/Button';
import IconButton from '@/components/buttons/icon-button/IconButton';
import ShareIcon from 'public/icons/share.svg';
import ShareSheet from '@/components/shuttle-detail/bottom-bar/ShareSheet';

interface Props {
  disabled?: boolean;
}

const BottomBar = ({ disabled = false }: Props) => {
  const { bottomSheetRef, contentRef, openBottomSheet, closeBottomSheet } =
    useBottomSheet();

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-500 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="flex flex-col gap-4 px-16 py-8">
          <div className=" flex justify-between gap-12">
            <Button disabled={disabled}>셔틀 예약하러 가기</Button>
            <IconButton
              type="button"
              className="h-44 w-44"
              onClick={openBottomSheet}
            >
              <ShareIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <ShareSheet
        bottomSheetRef={bottomSheetRef}
        contentRef={contentRef}
        closeBottomSheet={closeBottomSheet}
      />
    </>
  );
};

export default BottomBar;
