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
  setDemandCompleteStatus: (status: DemandCompleteStatus | null) => void;
  demandCount?: number;
  openShareBottomSheet?: () => void;
  isNoDemandRewardCouponEvent: boolean;
}

const DemandCompleteScreen = ({
  status,
  setDemandCompleteStatus,
  demandCount,
  openShareBottomSheet,
  isNoDemandRewardCouponEvent,
}: Props) => {
  switch (status) {
    case 'success':
      if (!openShareBottomSheet) {
        return null;
      }
      return (
        <SuccessScreen
          setDemandCompleteStatus={setDemandCompleteStatus}
          demandCount={demandCount}
          openShareBottomSheet={openShareBottomSheet}
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
