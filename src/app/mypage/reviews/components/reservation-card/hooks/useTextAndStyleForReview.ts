import { ReservationProgress } from '@/app/mypage/shuttle/hooks/useReservationProgress';
import { useMemo } from 'react';

interface Props {
  reservationProgress: ReservationProgress;
  isWritingReviewPeriod: boolean;
  isHandyParty: boolean;
}

const useTextAndStyleForReview = ({
  reservationProgress,
  isWritingReviewPeriod,
  isHandyParty,
}: Props) => {
  const textAndStyle = useMemo(() => {
    const textAndClassName = {
      title: {
        text:
          reservationProgress === 'shuttleEnded'
            ? isHandyParty
              ? '[핸디팟] 셔틀 종료'
              : '셔틀 종료'
            : reservationProgress === 'reviewAvailable'
              ? '예약 완료'
              : '',
        className:
          reservationProgress === 'shuttleEnded'
            ? 'text-basic-grey-500'
            : reservationProgress === 'reviewAvailable'
              ? 'text-brand-primary-400'
              : '',
      },
      description: {
        text: '',
      },
    };
    if (isWritingReviewPeriod) {
      textAndClassName.description.text =
        '여러분의 생생한 경험을 공유해주세요.';
    }
    return textAndClassName;
  }, [isWritingReviewPeriod, isHandyParty, reservationProgress]);

  return textAndStyle;
};

export default useTextAndStyleForReview;
