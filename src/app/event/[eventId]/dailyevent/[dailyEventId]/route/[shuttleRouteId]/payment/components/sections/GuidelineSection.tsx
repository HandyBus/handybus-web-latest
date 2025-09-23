'use client';

import useBottomSheet from '@/hooks/useBottomSheet';
import Divider from '../Divider';
import BottomSheet from '@/components/bottom-sheet/BottomSheet';
import Guideline from '@/components/guidelines/Guideline';
import Button from '@/components/buttons/button/Button';

interface Props {
  setGuidelineSeenTrue: () => void;
}

const GuidelineSection = ({ setGuidelineSeenTrue }: Props) => {
  const { bottomSheetRef, contentRef, openBottomSheet, closeBottomSheet } =
    useBottomSheet();

  const handleClick = () => {
    setGuidelineSeenTrue();
    closeBottomSheet();
  };

  return (
    <>
      <Divider />
      <section className="">
        <button type="button" onClick={openBottomSheet}>
          유의사항
        </button>
      </section>
      <BottomSheet
        ref={bottomSheetRef}
        title="결제 전, 유의사항을 확인해주세요"
      >
        <div ref={contentRef} className="overflow-y-auto">
          <Guideline type="상품별 유의사항" />
          <div className="h-16 w-full" />
          <div className="py-16">
            <Button
              type="button"
              variant="primary"
              size="large"
              onClick={handleClick}
            >
              닫기
            </Button>
          </div>
        </div>
      </BottomSheet>
    </>
  );
};

export default GuidelineSection;
