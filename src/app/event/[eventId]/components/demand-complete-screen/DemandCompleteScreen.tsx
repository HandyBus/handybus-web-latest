'use client';

import SuccessScreen from './SuccessScreen';
import FailScreen from './FailScreen';
import FeedbackScreen from '@/components/feedback/FeedbackScreen';

export type DemandCompleteStatus =
  | 'success'
  | 'fail'
  | 'feedback-success'
  | 'feedback-fail';

interface Props {
  status: DemandCompleteStatus;
  eventName: string;
  setDemandCompleteStatus: (status: DemandCompleteStatus | null) => void;
  demandCount?: number;
  isNoDemandRewardCouponEvent: boolean;
}

const DemandCompleteScreen = ({
  status,
  eventName,
  setDemandCompleteStatus,
  demandCount,
  isNoDemandRewardCouponEvent,
}: Props) => {
  switch (status) {
    case 'success':
      return (
        <SuccessScreen
          setDemandCompleteStatus={setDemandCompleteStatus}
          demandCount={demandCount}
          eventName={eventName}
          isNoDemandRewardCouponEvent={isNoDemandRewardCouponEvent}
        />
      );
    case 'fail':
      return <FailScreen setDemandCompleteStatus={setDemandCompleteStatus} />;
    case 'feedback-success':
      return (
        <FeedbackScreen
          subject="수요조사 - 성공"
          closeFeedbackScreen={() => setDemandCompleteStatus(null)}
        />
      );
    case 'feedback-fail':
      return (
        <FeedbackScreen
          subject="수요조사 - 실패"
          closeFeedbackScreen={() => setDemandCompleteStatus(null)}
        />
      );
  }
};

export default DemandCompleteScreen;
