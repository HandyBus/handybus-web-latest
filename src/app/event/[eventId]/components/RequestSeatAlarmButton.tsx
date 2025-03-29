import Button from '@/components/buttons/button/Button';
import { SyntheticEvent } from 'react';
import { customTwMerge } from 'tailwind.config';
import { HubWithInfo } from '../store/datesWithHubsAtom';
import { EventFormValues } from '../form.type';
import { useFormContext } from 'react-hook-form';

interface Props {
  toStep: () => void;
  hubWithInfo: HubWithInfo;
  className?: string;
}

const RequestSeatAlarmButton = ({ toStep, hubWithInfo, className }: Props) => {
  const { setValue } = useFormContext<EventFormValues>();
  const handleClick = (e: SyntheticEvent) => {
    e.stopPropagation();
    setValue('selectedHubForSeatAlarm', hubWithInfo);
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
