import Button from '@/components/buttons/button/Button';
import { SyntheticEvent } from 'react';
import { customTwMerge } from 'tailwind.config';

interface Props {
  toStep: () => void;
  className?: string;
}

const RequestSeatAlarmButton = ({ toStep, className }: Props) => {
  const handleClick = (e: SyntheticEvent) => {
    e.stopPropagation();
    toStep();
  };
  return (
    <Button
      onClick={handleClick}
      variant="secondary"
      size="small"
      className={customTwMerge('w-[90px]', className)}
    >
      빈자리 알림받기
    </Button>
  );
};

export default RequestSeatAlarmButton;
