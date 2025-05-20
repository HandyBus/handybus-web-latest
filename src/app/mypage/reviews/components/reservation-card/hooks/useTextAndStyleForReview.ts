import { useMemo } from 'react';

interface Props {
  isWritingReviewPeriod: boolean;
}

const useTextAndStyleForReview = ({ isWritingReviewPeriod }: Props) => {
  const textAndStyle = useMemo(() => {
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
  }, [isWritingReviewPeriod]);

  return textAndStyle;
};

export default useTextAndStyleForReview;
