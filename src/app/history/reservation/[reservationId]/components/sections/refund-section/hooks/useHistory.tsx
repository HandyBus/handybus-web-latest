import { useState } from 'react';
import { REFUND_STEPS } from '../const/refund.const';

interface Props {
  stepName: (typeof REFUND_STEPS)[number];
  setStep: (step: (typeof REFUND_STEPS)[number]) => void;
}

const useHistory = ({ stepName, setStep }: Props) => {
  const [history, setHistory] = useState<(typeof REFUND_STEPS)[number][]>([]);
  const isHistoryAvailable = history.length > 0;

  const setHistoryAndStep = (nextStep: (typeof REFUND_STEPS)[number]) => {
    const currStep = stepName;
    setHistory((prev) => [currStep, ...prev]);
    setStep(nextStep);
  };

  const handleBack = () => {
    const step = history[0];
    if (!step) {
      return;
    }
    setStep(step);
    setHistory((prev) => prev.slice(1));
  };

  const resetHistory = () => {
    setHistory([]);
  };

  return {
    isHistoryAvailable,
    setHistoryAndStep,
    handleBack,
    resetHistory,
  };
};

export default useHistory;
