import { ReactNode, useMemo } from 'react';
import { REFUND_STEPS, REFUND_STEPS_TO_TEXT } from '../const/refund.const';

interface UseBottomSheetTextProps {
  stepName: (typeof REFUND_STEPS)[number];
}

const useBottomSheetText = ({ stepName }: UseBottomSheetTextProps) => {
  const text = useMemo(() => getBottomSheetText(stepName), [stepName]);
  return text;
};

const getBottomSheetText = (stepName: (typeof REFUND_STEPS)[number]) => {
  const text = REFUND_STEPS_TO_TEXT[stepName];
  return {
    title: text.title as ReactNode,
    description: text.description as ReactNode,
  };
};

export default useBottomSheetText;
