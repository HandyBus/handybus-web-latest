'use client';

import SuccessScreen from './SuccessScreen';
import FailScreen from './FailScreen';
import FeedbackScreen from './FeedbackScreen';

export type DemandCompleteStatus = 'success' | 'fail' | 'feedback';

interface Props {
  status: DemandCompleteStatus;
  setDemandCompleteStatus: (status: DemandCompleteStatus | null) => void;
}

const DemandCompleteScreen = ({ status, setDemandCompleteStatus }: Props) => {
  switch (status) {
    case 'success':
      return (
        <SuccessScreen setDemandCompleteStatus={setDemandCompleteStatus} />
      );
    case 'fail':
      return <FailScreen setDemandCompleteStatus={setDemandCompleteStatus} />;
    case 'feedback':
      return (
        <FeedbackScreen setDemandCompleteStatus={setDemandCompleteStatus} />
      );
  }
};

export default DemandCompleteScreen;
