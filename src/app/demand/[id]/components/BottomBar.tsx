'use client';

import useBottomSheet from '@/hooks/useBottomSheet';
import Button from '@/components/buttons/button/Button';
import IconButton from '@/components/buttons/icon-button/IconButton';
import ShareIcon from 'public/icons/share.svg';
import ShareSheet from '@/components/bottom-sheet/share-sheet/ShareSheet';

interface Props {
  shuttleName: string;
  disabled?: boolean;
}

const BottomBar = ({ shuttleName, disabled = false }: Props) => {
  const { bottomSheetRef, contentRef, openBottomSheet, closeBottomSheet } =
    useBottomSheet();

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-500 bg-white shadow-bottomBar">
        <div className="flex flex-col gap-4 px-16 py-8">
          <p className="text-12 font-400 leading-[19.2px] text-grey-500">
            수요 신청은 <span className="font-700">무료</span>이며, 수요 신청
            결과를 노선 개설에 활용합니다.
          </p>

          <div className=" flex justify-between gap-12">
            <Button disabled={disabled}>수요 신청하기</Button>
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
        shuttleName={shuttleName}
      />
    </>
  );
};

export default BottomBar;
