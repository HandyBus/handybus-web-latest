import { ReservationProgress } from '@/app/mypage/shuttle/hooks/useReservationProgress';
import Button from '@/components/buttons/button/Button';
import { HandyStatus, ReservationsViewEntity } from '@/types/reservation.type';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SubmitOpenChatLinkModal from './SubmitOpenChatLinkModal';
import { handleClickAndStopPropagation } from '@/utils/common.util';

const HANDY_GUIDE_URL = process.env.NEXT_PUBLIC_HANDY_GUIDE_URL;

interface Props {
  reservation: ReservationsViewEntity;
  reservationProgress: ReservationProgress;
  handyStatus: HandyStatus;
  isOpenChatLinkCreated: boolean;
  isWritingReviewPeriod: boolean;
  reviewId: string | null | undefined;
  openChatLink: string | null | undefined;
  reservationId: string;
  isHandyParty: boolean;
}

const ChatButton = ({
  reservation,
  reservationProgress,
  handyStatus,
  isOpenChatLinkCreated,
  isWritingReviewPeriod,
  reviewId,
  openChatLink,
  reservationId,
  isHandyParty,
}: Props) => {
  const router = useRouter();

  const [isOpenChatLinkModalOpen, setIsOpenChatLinkModalOpen] = useState(false);
  const openOpenChatLinkModal = () => {
    setIsOpenChatLinkModalOpen(true);
  };
  const closeOpenChatLinkModal = () => {
    setIsOpenChatLinkModalOpen(false);
  };
  const openOpenChatLink = (openChatLink: string | null | undefined) => {
    if (openChatLink) {
      window.open(openChatLink, '_blank', 'noopener,noreferrer');
    }
  };
  const openHandyGuide = () => {
    window.open(HANDY_GUIDE_URL, '_blank', 'noopener,noreferrer');
  };

  if (isHandyParty) {
    return null;
  }

  switch (reservationProgress) {
    case 'beforeBusAssigned':
      if (handyStatus === 'ACCEPTED') {
        return (
          <Button
            variant="primary"
            size="small"
            onClick={handleClickAndStopPropagation(() => {
              openHandyGuide();
            })}
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
              onClick={handleClickAndStopPropagation(() => {
                openHandyGuide();
              })}
            >
              가이드
            </Button>
            <Button
              variant="primary"
              size="small"
              onClick={handleClickAndStopPropagation(() => {
                openOpenChatLinkModal();
              })}
            >
              링크 추가
            </Button>
            <SubmitOpenChatLinkModal
              reservation={reservation}
              isOpen={isOpenChatLinkModalOpen}
              closeModal={closeOpenChatLinkModal}
            />
          </div>
        );
      } else if (handyStatus === 'ACCEPTED' && isOpenChatLinkCreated) {
        <div className="flex items-center gap-8">
          <Button
            variant="secondary"
            size="small"
            onClick={handleClickAndStopPropagation(() => {
              openHandyGuide();
            })}
          >
            가이드
          </Button>
          <Button
            variant="primary"
            size="small"
            onClick={handleClickAndStopPropagation(() => {
              openOpenChatLink(openChatLink);
            })}
          >
            채팅방
          </Button>
        </div>;
      }
      return (
        <Button
          variant="primary"
          size="small"
          disabled={!isOpenChatLinkCreated}
          onClick={handleClickAndStopPropagation(() => {
            openOpenChatLink(openChatLink);
          })}
        >
          채팅 입장
        </Button>
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
