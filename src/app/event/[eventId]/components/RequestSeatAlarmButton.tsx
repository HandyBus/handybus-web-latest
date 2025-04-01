import Button from '@/components/buttons/button/Button';
import { SyntheticEvent } from 'react';
import { customTwMerge } from 'tailwind.config';
import { EventFormValues } from '../form.type';
import { useFormContext } from 'react-hook-form';
import {
  getRouteOfHubWithInfo,
  HubWithInfo,
} from '../store/dailyEventIdWithHubsAtom';
import { dailyEventIdWithRoutesAtom } from '../store/dailyEventIdWithRoutesAtom';
import { useAtomValue } from 'jotai';

interface Props {
  toStep: () => void;
  hubWithInfo: HubWithInfo;
  className?: string;
}

const RequestSeatAlarmButton = ({ toStep, hubWithInfo, className }: Props) => {
  const dailyEventIdWithRoutes = useAtomValue(dailyEventIdWithRoutesAtom);
  const { getValues, setValue } = useFormContext<EventFormValues>();
  const handleClick = (e: SyntheticEvent) => {
    e.stopPropagation();

    const { dailyEventId } = getValues('dailyEvent');
    const route = getRouteOfHubWithInfo({
      hubWithInfo,
      dailyEventIdWithRoutes,
      dailyEventId,
    });
    if (!route) {
      console.error('정류장의 노선을 찾지 못했습니다.');
      return;
    }

    setValue('selectedRouteForSeatAlarm', route);
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
