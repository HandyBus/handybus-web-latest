'use client';

import Button from '@/components/buttons/button/Button';
import { useFormContext } from 'react-hook-form';
import { EventFormValues } from '../../../form.type';
import { toast } from 'react-toastify';

const ExtraSeatAlarmStep = () => {
  const { getValues } = useFormContext<EventFormValues>();
  const selectedHubForSeatAlarm = getValues('selectedHubForSeatAlarm');
  const name = selectedHubForSeatAlarm?.name;

  const handleClick = () => {
    toast.success('개발 중 . . .');
  };
  return (
    <section className="flex w-full flex-col items-center gap-16">
      <article className="flex w-full flex-col items-center gap-8 rounded-8 bg-basic-grey-50 px-16 py-12">
        <h3 className="text-18 font-600 leading-[160%] text-basic-grey-700">
          {name}
        </h3>
        <p className="text-14 font-500 leading-[160%] text-brand-primary-400">
          NN번째로 알림 대기 중이에요!
        </p>
      </article>
      <div className="flex w-full flex-col gap-8">
        <Button
          variant="primary"
          size="large"
          className="w-full"
          onClick={handleClick}
        >
          확인했어요
        </Button>
        <Button variant="tertiary" size="large" className="bg-white w-full">
          의견 보내기
        </Button>
      </div>
    </section>
  );
};

export default ExtraSeatAlarmStep;
