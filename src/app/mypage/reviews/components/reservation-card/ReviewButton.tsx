import Button from '@/components/buttons/button/Button';
import { handleClickAndStopPropagation } from '@/utils/common.util';
import { useRouter } from 'next/navigation';

interface Props {
  isWritingReviewPeriod: boolean;
  reservationId: string;
  reviewId?: string;
}

const ReviewButton = ({
  isWritingReviewPeriod,
  reservationId,
  reviewId,
}: Props) => {
  const router = useRouter();

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
  }
  return null;
};

export default ReviewButton;
