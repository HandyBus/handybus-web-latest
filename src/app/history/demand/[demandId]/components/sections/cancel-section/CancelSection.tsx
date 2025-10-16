'use client';

import Button from '@/components/buttons/button/Button';
import useBottomSheet from '@/hooks/useBottomSheet';
import CancelDemandBottomSheet from './components/CancelDemandBottomSheet';
import { ShuttleDemandsViewEntity } from '@/types/demand.type';

interface Props {
  demand: ShuttleDemandsViewEntity;
}

const CancelSection = ({ demand }: Props) => {
  const { openBottomSheet, closeBottomSheet, bottomSheetRef, contentRef } =
    useBottomSheet();

  return (
    <>
      <section className="px-16 py-24">
        <ul className="space-y-2 list-outside list-disc pb-12 pl-16 text-14 font-500 text-basic-grey-500">
          <li>수요조사는 취소 후 재참여가 가능합니다.</li>
        </ul>
        <Button
          type="button"
          variant="s-destructive"
          size="large"
          onClick={() => openBottomSheet()}
        >
          취소하기
        </Button>
      </section>
      <CancelDemandBottomSheet
        bottomSheetRef={bottomSheetRef}
        contentRef={contentRef}
        closeBottomSheet={closeBottomSheet}
        demand={demand}
      />
    </>
  );
};

export default CancelSection;
