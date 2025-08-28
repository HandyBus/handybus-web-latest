import { ReservationProgress } from '../../../../hooks/useReservationProgress';
import { useCallback, useMemo } from 'react';

interface Props {
  reservationProgress: ReservationProgress;
  isWritingReviewPeriod: boolean;
  isHandyParty: boolean;
}

const useTextAndStyle = ({
  reservationProgress,
  isWritingReviewPeriod,
  isHandyParty,
}: Props) => {
  const getShuttleBusTextAndStyle = useCallback(() => {
    if (
      reservationProgress === 'beforeBusAssigned' ||
      reservationProgress === 'afterBusAssigned' ||
      reservationProgress === 'reviewAvailable'
    ) {
      const textAndClassName = {
        title: {
          text: '예약 완료',
          className: 'text-brand-primary-400',
        },
        description: {
          text: '자세한 정보는 탑승 전까지 알림톡을 통해 안내해 드려요.',
        },
      };
      return textAndClassName;
    } else if (reservationProgress === 'shuttleEnded') {
      const textAndClassName = {
        title: {
          text: '셔틀 종료',
          className: 'text-basic-grey-500',
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
    } else if (reservationProgress === 'reservationCanceled') {
      return {
        title: {
          text: '예약 취소',
          className: 'text-basic-red-400',
        },
        description: {
          text: '',
        },
      };
    }
  }, [reservationProgress, isWritingReviewPeriod]);

  // NOTE: 핸디팟은 핸디 및 오픈채팅방이 존재하지 않음
  const getHandyPartyTextAndStyle = useCallback(() => {
    if (reservationProgress === 'beforeBusAssigned') {
      const textAndClassName = {
        title: {
          text: '[핸디팟] 예약 완료',
          className: 'text-brand-primary-400',
        },
        description: {
          text: '함께 갈 인원을 모으고 있어요. 조금만 기다려주세요!',
        },
      };
      return textAndClassName;
    } else if (
      reservationProgress === 'afterBusAssigned' ||
      reservationProgress === 'reviewAvailable'
    ) {
      const textAndClassName = {
        title: {
          text: '[핸디팟] 예약 완료',
          className: 'text-brand-primary-400',
        },
        description: {
          text: '자세한 정보는 탑승 전까지 알림톡을 통해 안내해 드려요.',
        },
      };
      return textAndClassName;
    } else if (reservationProgress === 'shuttleEnded') {
      const textAndClassName = {
        title: {
          text: '[핸디팟] 셔틀 종료',
          className: 'text-basic-grey-500',
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
    } else if (reservationProgress === 'reservationCanceled') {
      return {
        title: {
          text: '[핸디팟] 예약 취소',
          className: 'text-basic-red-400',
        },
        description: {
          text: '',
        },
      };
    }
  }, [reservationProgress, isWritingReviewPeriod]);

  const textAndStyle = useMemo(() => {
    if (isHandyParty) {
      return getHandyPartyTextAndStyle();
    }
    return getShuttleBusTextAndStyle();
  }, [isHandyParty, getShuttleBusTextAndStyle, getHandyPartyTextAndStyle]);

  return textAndStyle;
};

export default useTextAndStyle;
