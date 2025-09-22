import { ReservationProgress } from '@/app/mypage/shuttle/hooks/useReservationProgress';
import Button from '@/components/buttons/button/Button';
import { useRouter } from 'next/navigation';
import { handleClickAndStopPropagation } from '@/utils/common.util';

interface Props {
  reservationProgress: ReservationProgress;
  isWritingReviewPeriod: boolean;
  reviewId: string | null | undefined;
  reservationId: string;
  isHandyParty: boolean;
}

const ChatButton = ({
  reservationProgress,
  isWritingReviewPeriod,
  reviewId,
  reservationId,
  isHandyParty,
}: Props) => {
  const router = useRouter();

  const openBoardingPassLink = () => {
    router.push(`/mypage/boarding-pass/${reservationId}`);
  };

  if (isHandyParty) {
    return null;
  }

  switch (reservationProgress) {
    case 'beforeBusAssigned':
    case 'afterBusAssigned':
      return (
        <div className="flex gap-8">
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
    case 'reviewAvailable':
      return (
        <div className="flex gap-8">
          {reviewId ? (
            <Button
              variant="tertiary"
              size="small"
              onClick={handleClickAndStopPropagation(() => {
                router.push(`/mypage/reviews/${reviewId}`);
              })}
            >
              내 후기
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="small"
              onClick={handleClickAndStopPropagation(() => {
                router.push(`/mypage/reviews/write/${reservationId}`);
              })}
            >
              후기 작성
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
                variant="tertiary"
                size="small"
                onClick={handleClickAndStopPropagation(() => {
                  router.push(`/mypage/reviews/edit/${reviewId}`);
                })}
              >
                후기 수정
              </Button>
              <Button
                variant="tertiary"
                size="small"
                onClick={handleClickAndStopPropagation(() => {
                  router.push(`/mypage/reviews/${reviewId}`);
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
                router.push(`/mypage/reviews/${reviewId}`);
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
