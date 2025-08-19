import { ReservationProgress } from '@/app/mypage/shuttle/hooks/useReservationProgress';
import Button from '@/components/buttons/button/Button';
import { ReservationsViewEntity } from '@/types/reservation.type';
import { useRouter } from 'next/navigation';
import { handleClickAndStopPropagation } from '@/utils/common.util';

interface Props {
  reservation: ReservationsViewEntity;
  reservationProgress: ReservationProgress;
  isWritingReviewPeriod: boolean;
  reviewId: string | null | undefined;
  reservationId: string;
  isHandyParty: boolean;
}

const ChatButton = ({
  reservation,
  reservationProgress,
  isWritingReviewPeriod,
  reviewId,
  reservationId,
  isHandyParty,
}: Props) => {
  const router = useRouter();

  // NOTE: 일자별 노선의 metadata에 오픈채팅방 링크를 임시로 반영하기로 함. 앱 출시 후 삭제예정
  const noticeRoomUrl = reservation.shuttleRoute.event.dailyEvents.find(
    (dailyEvent) =>
      dailyEvent.dailyEventId === reservation.shuttleRoute.dailyEventId,
  )?.metadata?.openChatUrl;

  const openOpenChatLink = () => {
    if (noticeRoomUrl) {
      window.open(noticeRoomUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const openBoardingPassLink = () => {
    window.open(
      `/mypage/boarding-pass?reservationId=${reservationId}`,
      '_blank',
    );
  };

  if (isHandyParty) {
    return null;
  }

  switch (reservationProgress) {
    case 'beforeBusAssigned':
    case 'afterBusAssigned':
      return (
        <div className="flex gap-8">
          {noticeRoomUrl && (
            <Button
              variant="secondary"
              size="small"
              className="w-fit px-8"
              disabled={!noticeRoomUrl}
              onClick={handleClickAndStopPropagation(() => {
                openOpenChatLink();
              })}
            >
              공지방 참가
            </Button>
          )}
          <Button
            variant="primary"
            size="small"
            className="w-fit px-8"
            onClick={handleClickAndStopPropagation(openBoardingPassLink)}
          >
            탑승권 보기
          </Button>
        </div>
      );
    case 'shuttleEnded':
      if (isWritingReviewPeriod) {
        if (!reviewId) {
          return (
            <Button
              variant="primary"
              size="small"
              onClick={handleClickAndStopPropagation(() => {
                router.push(`/mypage/reviews/write/${reservationId}`);
              })}
            >
              후기 작성
            </Button>
          );
        } else {
          return (
            <div className="flex items-center gap-8">
              <Button
                variant="secondary"
                size="small"
                onClick={handleClickAndStopPropagation(() => {
                  router.push(`/mypage/reviews/edit/${reviewId}`);
                })}
              >
                후기 수정
              </Button>
              <Button
                variant="primary"
                size="small"
                onClick={handleClickAndStopPropagation(() => {
                  router.push(`/mypage/reviews/${reservationId}`);
                })}
              >
                내 후기
              </Button>
            </div>
          );
        }
      } else {
        if (reviewId) {
          return (
            <Button
              variant="tertiary"
              size="small"
              onClick={handleClickAndStopPropagation(() => {
                router.push(`/mypage/reviews/${reservationId}`);
              })}
            >
              내 후기
            </Button>
          );
        }
        return null;
      }
    case 'reservationCanceled':
      return null;
    default:
      return null;
  }
};

export default ChatButton;
