'use client';

import Button from '@/components/buttons/button/Button';
import GreyCalendarIcon from '../../icons/calendar-grey.svg';
import { useFlow } from '@/stacks';
import usePopAll from '@/hooks/usePopAll';

const EmptyView = () => {
  const flow = useFlow();
  const popAll = usePopAll();
  const handleEventListClick = () => {
    popAll({ animate: false });
    flow.replace('EventList', {}, { animate: false });
  };
  return (
    <div className="flex flex-col items-center justify-center gap-8 pt-40">
      <GreyCalendarIcon />
      <p className="pb-8 text-14 font-600 text-basic-grey-500">예약이 없어요</p>
      <Button variant="primary" size="small" onClick={handleEventListClick}>
        둘러보기
      </Button>
    </div>
  );
};

export default EmptyView;
