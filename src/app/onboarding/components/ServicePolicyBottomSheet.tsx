'use client';

import BottomSheet from '@/components/bottom-sheet/BottomSheet';
import { policies } from '@/data/policy';
import { BottomSheetRefs } from '@/hooks/useBottomSheet';

const ServicePolicyBottomSheet = ({
  bottomSheetRef,
  contentRef,
}: BottomSheetRefs) => {
  return (
    <BottomSheet title="서비스 이용 약관" ref={bottomSheetRef}>
      <div ref={contentRef} className="overflow-y-auto scrollbar-hidden">
        {policies['서비스이용약관']}
      </div>
    </BottomSheet>
  );
};

export default ServicePolicyBottomSheet;
