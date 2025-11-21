'use client';

import BottomSheet from '@/components/bottom-sheet/BottomSheet';
import Button from '@/components/buttons/button/Button';
import { TRIP_STATUS_TO_STRING } from '@/constants/status';
import { BottomSheetRefs } from '@/hooks/useBottomSheet';
import { ShuttleDemandsViewEntity } from '@/types/demand.type';
import { usePutCancelDemand } from '@/services/demand.service';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useFlow } from '@/stacks';
import usePopAll from '@/hooks/usePopAll';

interface Props extends BottomSheetRefs {
  closeBottomSheet: () => void;
  demand: ShuttleDemandsViewEntity;
}

const CancelDemandBottomSheet = ({
  bottomSheetRef,
  contentRef,
  closeBottomSheet,
  demand,
}: Props) => {
  const hubName =
    demand.toDestinationRegionHub?.name ||
    demand.fromDestinationRegionHub?.name ||
    demand.desiredToDestinationRegionHub ||
    demand.desiredFromDestinationRegionHub;
  const tripTypeText = TRIP_STATUS_TO_STRING[demand.type];

  const flow = useFlow();
  const popAll = usePopAll();
  const { mutateAsync: putCancelDemand } = usePutCancelDemand();
  const [isLoading, setIsLoading] = useState(false);
  const handleCancelDemand = async () => {
    setIsLoading(true);
    try {
      await putCancelDemand({
        eventId: demand.eventId,
        dailyEventId: demand.dailyEventId,
        shuttleDemandId: demand.shuttleDemandId,
      });
      toast.success('수요조사를 취소했어요.');
      closeBottomSheet();
      popAll({ animate: false });
      flow.replace('History', { type: 'demand' }, { animate: false });
    } catch (error) {
      console.error(error);
      toast.error('잠시 후 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BottomSheet ref={bottomSheetRef} title="수요조사를 취소하시겠어요?">
      <div ref={contentRef} className="scrollbar-hidden">
        <div className="mb-16 flex h-[82px] flex-col items-center justify-center rounded-8 bg-basic-grey-50 px-16 py-12 text-18 font-600 leading-[160%] text-basic-grey-700">
          <span>[{tripTypeText}]</span>
          <span>{hubName}</span>
        </div>
        <Button
          type="button"
          variant="p-destructive"
          size="large"
          onClick={handleCancelDemand}
          isLoading={isLoading}
        >
          취소하기
        </Button>
      </div>
    </BottomSheet>
  );
};

export default CancelDemandBottomSheet;
