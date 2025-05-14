import Button from '@/components/buttons/button/Button';
import { HandyStatus } from '@/types/reservation.type';
import { useRouter } from 'next/navigation';
import { ReservationCardStatus } from './reservation-card/hooks/useStatus';
import { handleClickAndStopPropagation } from '@/utils/common.util';

interface Props {
  reservationCardStatus: ReservationCardStatus;
  handyStatus: HandyStatus;
  isOpenChatLinkCreated: boolean;
  isWritingReviewPeriod: boolean;
  hasReview: boolean;
  openChatLink: string | null | undefined;
  reservationId: string;
}

const ChatButton = ({
  reservationCardStatus,
  handyStatus,
  isOpenChatLinkCreated,
  isWritingReviewPeriod,
  hasReview,
  openChatLink,
  reservationId,
}: Props) => {
  const router = useRouter();

  switch (reservationCardStatus) {
    case 'beforeBusAssigned':
      if (handyStatus === 'ACCEPTED') {
        return (
          <Button
            variant="primary"
            size="small"
            onClick={() => {
              router.push('help/what-is-handy');
            }}
          >
            가이드
          </Button>
        );
      }
      return (
        <Button variant="primary" size="small" disabled>
          채팅방
        </Button>
      );
    case 'afterBusAssigned':
      if (handyStatus === 'ACCEPTED' && !isOpenChatLinkCreated) {
        return (
          <div className="flex items-center gap-8">
            <Button
              variant="secondary"
              size="small"
              onClick={() => {
                router.push('help/what-is-handy');
              }}
            >
              가이드
            </Button>
            <Button
              variant="primary"
              size="small"
              onClick={handleClickAndStopPropagation(() => {
                if (openChatLink) {
                  window.open(openChatLink, '_blank', 'noreferrer');
                }
              })}
            >
              채팅방
            </Button>
          </div>
        );
      } else if (handyStatus === 'ACCEPTED' && isOpenChatLinkCreated) {
        <div className="flex items-center gap-8">
          <Button variant="secondary" size="small">
            가이드
          </Button>
          <Button variant="primary" size="small">
            채팅방
          </Button>
        </div>;
      }
      return (
        <Button
          variant="primary"
          size="small"
          disabled={!isOpenChatLinkCreated}
        >
          채팅 입장
        </Button>
      );
    case 'shuttleEnded':
      if (isWritingReviewPeriod) {
        if (!hasReview) {
          return (
            <Button
              variant="primary"
              size="small"
              onClick={handleClickAndStopPropagation(() => {
                router.push(`/mypage/shuttle/reviews/${reservationId}/write`);
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
                  router.push(`/mypage/shuttle/reviews/${reservationId}/edit`);
                })}
              >
                후기 수정
              </Button>
              <Button
                variant="primary"
                size="small"
                onClick={handleClickAndStopPropagation(() => {
                  router.push(`/mypage/shuttle/reviews/${reservationId}`);
                })}
              >
                내 후기
              </Button>
            </div>
          );
        }
      } else {
        if (hasReview) {
          return (
            <Button
              variant="tertiary"
              size="small"
              onClick={handleClickAndStopPropagation(() => {
                router.push(`/mypage/shuttle/reviews/${reservationId}`);
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
