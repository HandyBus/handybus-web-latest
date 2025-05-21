import { useState } from 'react';

interface Props {
  closeBottomSheet: () => void;
}

const useAlertFeedBackScreen = ({ closeBottomSheet }: Props) => {
  const [
    isAlertRequestFeedbackScreenOpen,
    setIsAlertRequestFeedbackScreenOpen,
  ] = useState(false);

  const openAlertRequestFeedbackScreen = () => {
    closeBottomSheet();
    setTimeout(() => {
      setIsAlertRequestFeedbackScreenOpen(true);
    }, 100);
  };

  const closeAlertRequestFeedbackScreen = () => {
    setIsAlertRequestFeedbackScreenOpen(false);
  };

  return {
    isAlertRequestFeedbackScreenOpen,
    openAlertRequestFeedbackScreen,
    closeAlertRequestFeedbackScreen,
  };
};

export default useAlertFeedBackScreen;
