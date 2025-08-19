'use client';

import BottomSheet from '@/components/bottom-sheet/BottomSheet';
import { policies } from '@/data/policy';
import { BottomSheetRefs } from '@/hooks/useBottomSheet';

const PrivacyPolicyBottomSheet = ({
  bottomSheetRef,
  contentRef,
}: BottomSheetRefs) => {
  return (
    <BottomSheet title="개인정보 수집 및 이용 동의" ref={bottomSheetRef}>
      <div ref={contentRef} className="overflow-y-auto">
        {policies['개인정보처리방침']}
      </div>
    </BottomSheet>
  );
};

export default PrivacyPolicyBottomSheet;
