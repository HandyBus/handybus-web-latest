import BottomSheet from '@/components/bottom-sheet/BottomSheet';
import Button from '@/components/buttons/button/Button';
import PolicyViewer from '@/components/policy/PolicyViewer';
import { RefObject } from 'react';

interface Props {
  bottomSheetRef: ((node: HTMLDivElement) => void) | undefined;
  contentRef: RefObject<HTMLDivElement> | undefined;
  onAccept?: () => void;
  closeBottomSheet: () => void;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
}

const MarketingBottomSheet = ({
  bottomSheetRef,
  contentRef,
  onAccept,
  closeBottomSheet,
  primaryButtonText,
  secondaryButtonText,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
}: Props) => {
  return (
    <BottomSheet title="마케팅 활용/광고성 정보 수신 동의" ref={bottomSheetRef}>
      <div className="overflow-y-auto" ref={contentRef}>
        <div>
          <PolicyViewer type="마케팅활용동의" />
        </div>
        <div className="flex gap-8 pb-16 pt-8">
          <Button
            type="button"
            variant="secondary"
            onClick={onSecondaryButtonClick ?? closeBottomSheet}
          >
            {secondaryButtonText ?? '닫기'}
          </Button>
          <Button
            type="button"
            onClick={
              onPrimaryButtonClick ??
              (() => {
                onAccept?.();
                closeBottomSheet();
              })
            }
          >
            {primaryButtonText ?? '동의하기'}
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
};

export default MarketingBottomSheet;
