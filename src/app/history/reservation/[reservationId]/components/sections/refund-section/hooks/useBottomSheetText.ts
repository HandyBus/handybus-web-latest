import { useMemo } from 'react';
import { REFUND_STEPS, REFUND_STEPS_TO_TEXT } from '../const/refund.const';

interface UseBottomSheetTextProps {
  stepName: (typeof REFUND_STEPS)[number];
  isTransferredReservation: boolean;
}

const useBottomSheetText = ({
  stepName,
  isTransferredReservation,
}: UseBottomSheetTextProps) => {
  const text = useMemo(
    () => getBottomSheetText(stepName, isTransferredReservation),
    [stepName, isTransferredReservation],
  );
  return text;
};

const getBottomSheetText = (
  stepName: (typeof REFUND_STEPS)[number],
  isTransferredReservation: boolean,
) => {
  const text = REFUND_STEPS_TO_TEXT[stepName];
  return {
    title: text.title,
    description:
      typeof text.description === 'function'
        ? text.description(isTransferredReservation)
        : text.description,
  };
};

export default useBottomSheetText;
