import BottomSheet from '@/components/bottom-sheet/BottomSheet';
import Button from '@/components/buttons/button/Button';
import PolicyViewer from '@/components/policy/PolicyViewer';
import { RefObject } from 'react';

interface Props {
  bottomSheetRef: (node: HTMLDivElement) => void;
  contentRef: RefObject<HTMLDivElement> | undefined;
  onAccept: () => void;
  closeBottomSheet: () => void;
}

const ServiceBottomSheet = ({
  bottomSheetRef,
  contentRef,
  onAccept,
  closeBottomSheet,
}: Props) => {
  return (
    <BottomSheet title="서비스 이용약관" ref={bottomSheetRef}>
      <div ref={contentRef} className="overflow-y-auto">
        <div>
          <PolicyViewer type="서비스이용약관" />
        </div>
        <div className="flex gap-8 pb-16 pt-8">
          <Button type="button" variant="secondary" onClick={closeBottomSheet}>
            닫기
          </Button>
          <Button
            type="button"
            onClick={() => {
              onAccept();
              closeBottomSheet();
            }}
          >
            동의하기
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
};

export default ServiceBottomSheet;
