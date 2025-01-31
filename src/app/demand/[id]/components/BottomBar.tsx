'use client';

import useBottomSheet from '@/hooks/useBottomSheet';
import Button from '@/components/buttons/button/Button';
import ShareSheet from '@/components/bottom-sheet/share-sheet/ShareSheet';

interface Props {
  eventName: string;
  isNotOpen: boolean;
  isSelected: boolean;
}

const BottomBar = ({ eventName, isNotOpen, isSelected }: Props) => {
  const { bottomSheetRef, contentRef, openBottomSheet, closeBottomSheet } =
    useBottomSheet();

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-10 mx-auto max-w-500 bg-white shadow-bottomBar">
        <div className="flex flex-col gap-4 px-16 py-8">
          <p className="text-12 font-400 leading-[19.2px] text-grey-500">
            수요 신청은 <span className="font-700">무료</span>이며, 수요 신청
            결과를 노선 개설에 활용합니다.
          </p>
          <div className="flex justify-between gap-12 font-600">
            {isNotOpen ? (
              <>
                <Button disabled>수요조사가 마감된 행사이에요</Button>
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
                <Button disabled={!isSelected}>수요 신청하기</Button>
              </>
            )}
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
