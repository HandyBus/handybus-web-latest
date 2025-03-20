'use client';

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

const PersonalInfoBottomSheet = ({
  bottomSheetRef,
  contentRef,
  onAccept,
  closeBottomSheet,
}: Props) => {
  return (
    <BottomSheet title="개인정보 수집 및 이용 동의" ref={bottomSheetRef}>
      <div className="overflow-y-auto" ref={contentRef}>
        <div>
          <PolicyViewer type="개인정보처리방침" />
        </div>
      </div>
      <div className="flex gap-8 pb-16 pt-8">
        <Button type="button" variant="tertiary" onClick={closeBottomSheet}>
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
    </BottomSheet>
  );
};

export default PersonalInfoBottomSheet;
