'use client';

import Button from '@/components/buttons/button/Button';
import { useGetDemandStats } from '@/services/demand.service';
import { useAtomValue } from 'jotai';
import { eventAtom } from '../../../store/eventAtom';
import { useFormContext } from 'react-hook-form';
import { EventFormValues } from '../../../form.type';

interface Props {
  toExtraOpenSidoStep: () => void;
  toDemandHubsStep: () => void;
}

const ExtraSidoInfoStep = ({
  toExtraOpenSidoStep,
  toDemandHubsStep,
}: Props) => {
  const event = useAtomValue(eventAtom);
  const { getValues } = useFormContext<EventFormValues>();
  const [dailyEvent, sido] = getValues(['dailyEvent', 'sido']);
  const enabled = !!event?.eventId && !!dailyEvent.dailyEventId && !!sido;

  const { data: demandStats, isLoading } = useGetDemandStats(
    {
      groupBy: 'PROVINCE',
      eventId: event?.eventId,
      dailyEventId: dailyEvent.dailyEventId,
      provinceFullName: sido,
    },
    { enabled },
  );
  const demandCount = demandStats?.[0]?.totalCount ?? 0;

  return (
    <section className="flex w-full flex-col gap-16">
      <article className="flex flex-col items-center gap-8 rounded-8 bg-basic-grey-50 py-12">
        <h3 className="text-18 font-600 leading-[160%]">참여 인원</h3>
        <p className="h-[22px] text-14 font-500 text-basic-grey-700">
          {!isLoading && (
            <span>
              지금까지{' '}
              <span className="text-brand-primary-400">{demandCount}명</span>이
              참여했어요
            </span>
          )}
        </p>
      </article>
      <div className="flex gap-8">
        <Button
          onClick={toExtraOpenSidoStep}
          variant="tertiary"
          size="large"
          type="button"
        >
          열린 셔틀 보기
        </Button>
        <Button
          onClick={toDemandHubsStep}
          variant="primary"
          size="large"
          type="button"
        >
          요청하기
        </Button>
      </div>
    </section>
  );
};

export default ExtraSidoInfoStep;
