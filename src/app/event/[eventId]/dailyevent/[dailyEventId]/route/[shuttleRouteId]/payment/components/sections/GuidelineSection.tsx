'use client';

import useBottomSheet from '@/hooks/useBottomSheet';
import useScrollToBottom from '@/hooks/useScrollToBottom';
import BottomSheet from '@/components/bottom-sheet/BottomSheet';
import Button from '@/components/buttons/button/Button';
import CheckBox from '@/components/buttons/checkbox/CheckBox';
import ShuttleBusGuideline from '../payment-guidelines/ShuttleBusGuideline';
import HandyPartyGuideline from '../payment-guidelines/HandyPartyGuideline';

interface Props {
  isHandyParty: boolean;
  guidelineSeen: boolean;
  setGuidelineSeen: (value: boolean) => void;
}

const GuidelineSection = ({
  isHandyParty,
  guidelineSeen,
  setGuidelineSeen,
}: Props) => {
  const {
    bottomSheetRef,
    contentRef,
    openBottomSheet,
    closeBottomSheet,
    isOpen,
  } = useBottomSheet();

  const isScrolledToBottom = useScrollToBottom({
    containerRef: contentRef,
    threshold: 70,
    isActive: isOpen,
  });

  const handleClick = () => {
    setGuidelineSeen(true);
    closeBottomSheet();
  };

  const handleCheckBoxClick = () => {
    if (guidelineSeen) {
      setGuidelineSeen(false);
      return;
    }
    openBottomSheet();
  };

  return (
    <>
      <div className="px-16">
        <button
          type="button"
          onClick={openBottomSheet}
          className="flex w-full items-center gap-[6px] rounded-8 border border-basic-grey-200 bg-basic-grey-50 p-12 leading-[160%]"
        >
          <CheckBox
            isChecked={guidelineSeen}
            setIsChecked={handleCheckBoxClick}
          />
          <div className="text-14 font-600">
            <span className="text-brand-primary-400">[필수]</span> 유의사항을
            확인해주세요
          </div>
        </button>
      </div>
      <BottomSheet
        ref={bottomSheetRef}
        title="결제 전, 유의사항을 확인해주세요"
      >
        <div ref={contentRef} className="relative overflow-y-auto">
          {isHandyParty ? <HandyPartyGuideline /> : <ShuttleBusGuideline />}
          <div className="h-16 w-full" />
          <div className="sticky bottom-0 left-0 right-0 bg-basic-white py-16">
            <Button
              type="button"
              variant="primary"
              size="large"
              onClick={handleClick}
              disabled={!isScrolledToBottom}
            >
              확인했어요
            </Button>
          </div>
        </div>
      </BottomSheet>
    </>
  );
};

export default GuidelineSection;
