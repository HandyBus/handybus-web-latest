import { HandyStatus } from '@/types/reservation.type';
import { ReservationCardStatus } from './useStatus';
import { useMemo } from 'react';

interface Props {
  reservationCardStatus: ReservationCardStatus;
  handyStatus: HandyStatus;
  isOpenChatLinkCreated: boolean;
  isWritingReviewPeriod: boolean;
}

const useTextAndStyle = ({
  reservationCardStatus,
  handyStatus,
  isOpenChatLinkCreated,
  isWritingReviewPeriod,
}: Props) => {
  const textAndStyle = useMemo(() => {
    if (reservationCardStatus === 'beforeBusAssigned') {
      const textAndClassName = {
        title: {
          text: '예약 완료',
          className: 'text-brand-primary-400',
        },
        description: {
          text: '함께 갈 인원을 모아 그룹채팅방을 열어드릴게요.',
        },
      };
      if (handyStatus === 'ACCEPTED') {
        textAndClassName.title.text =
          '선정을 축하드려요! 가이드를 통해 핸디 역할을 확인해 보세요.';
      }
      return textAndClassName;
    } else if (reservationCardStatus === 'afterBusAssigned') {
      const textAndClassName = {
        title: {
          text: '예약 완료',
          className: 'text-brand-primary-400',
        },
        description: {
          text: '채팅방에서 당일까지 탑승일 정보와 자세한 안내가 이루어져요.',
        },
      };
      if (handyStatus === 'ACCEPTED') {
        if (isOpenChatLinkCreated) {
          textAndClassName.title.text =
            '탑승 전까지 팬들과 함께 채팅방에서 소통해 보세요!';
        } else {
          textAndClassName.title.text =
            '배차가 완료되었어요. 그룹채팅방을 열고 링크를 추가해 주세요.';
        }
      }
      return textAndClassName;
    } else if (reservationCardStatus === 'shuttleEnded') {
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
    } else if (reservationCardStatus === 'reservationCanceled') {
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
  }, [
    reservationCardStatus,
    handyStatus,
    isOpenChatLinkCreated,
    isWritingReviewPeriod,
  ]);

  return textAndStyle;
};

export default useTextAndStyle;
