import BottomSheet from '@/components/bottom-sheet/BottomSheet';
import { RefObject } from 'react';
import { SHARE_BUTTONS } from './BottomBar.constant';

interface ShareSheetProps {
  bottomSheetRef: (
    bottomSheetElement: HTMLDivElement,
  ) => (() => void) | undefined;
  contentRef: RefObject<HTMLDivElement> | undefined;
}
const ShareSheet = ({ bottomSheetRef, contentRef }: ShareSheetProps) => {
  return (
    <BottomSheet
      ref={bottomSheetRef}
      title="공유하기"
      description="친구들과 함께 핸디버스를 타요"
    >
      <div
        ref={contentRef}
        className="overflow-y-hidden text-16 font-400 leading-[24px] text-grey-800"
      >
        {SHARE_BUTTONS.map((button, index) => (
          <button
            key={index}
            type="button"
            className="flex items-center gap-16 py-16"
            onClick={button.onClick}
          >
            <button.icon viewBox="0 0 24 24" width={24} height={24} />
            <p>
              <span className="text-16 font-500 leading-[25.6px]">
                {button.text}
              </span>
              {button.subText}
            </p>
          </button>
        ))}
        <div className="h-[21px]" />
      </div>
    </BottomSheet>
  );
};

export default ShareSheet;
