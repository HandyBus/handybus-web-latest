'use client';

import Counter from '@/components/counter/Counter';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { ReservationFormValues } from '../Form';
import Button from '@/components/buttons/button/Button';
import { useMemo } from 'react';
import { toast } from 'react-toastify';
import { getSinglePriceWithEarlybird } from '../../utils/reservation.util';

interface Props {
  handleNextStep: () => void;
  handlePrevStep: () => void;
}

const PassengerInfoStep = ({ handleNextStep, handlePrevStep }: Props) => {
  const { control, getValues } = useFormContext<ReservationFormValues>();

  const watchedPassengerCount = useWatch({
    control,
    name: 'passengerCount',
  });

  const checkValidAndGoNextStep = async () => {
    if (watchedPassengerCount === 0) {
      toast.error('탑승객을 최소 1명 이상 입력해 주세요.');
      return;
    }
    handleNextStep();
  };

  const price = useMemo(() => {
    const [type, shuttleRoute] = getValues(['type', 'shuttleRoute']);
    if (!type || !shuttleRoute) {
      return 0;
    }
    return getSinglePriceWithEarlybird(type, shuttleRoute);
  }, [getValues('type'), getValues('shuttleRoute')]);

  const maxPassengerCount = useMemo(() => {
    const [shuttleRoute, type] = getValues(['shuttleRoute', 'type']);
    if (!shuttleRoute || !type) {
      return 0;
    }
    const maxSeatCount = shuttleRoute?.maxPassengerCount ?? 0;
    switch (type) {
      case 'ROUND_TRIP':
        return shuttleRoute?.remainingSeatCount ?? 0;
      case 'TO_DESTINATION':
        return maxSeatCount - (shuttleRoute?.toDestinationCount ?? 0);
      case 'FROM_DESTINATION':
        return maxSeatCount - (shuttleRoute?.fromDestinationCount ?? 0);
      default:
        return 0;
    }
  }, [getValues('shuttleRoute')]);

  return (
    <>
      <section className="flex flex-col gap-16 py-28">
        <h3 className="text-22 font-700 text-grey-900">
          탑승객 수를 입력해주세요
        </h3>
        <Controller
          control={control}
          name="passengerCount"
          render={({ field }) => (
            <>
              <Counter
                count={field.value}
                setCount={field.onChange}
                min={1}
                max={Math.min(maxPassengerCount, 9)}
              />
              <p className="text-12 font-400 text-grey-500">
                10명 이상 예약하는 경우,{' '}
                <a
                  href="http://pf.kakao.com/_AxncxhG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  핸디버스 카카오 채널
                </a>
                로 문의 바랍니다.
              </p>
            </>
          )}
        />
      </section>
      <div className="fixed bottom-0 left-0 right-0 mx-auto flex max-w-500 flex-col gap-12 bg-white px-16 py-8 shadow-bottomBar">
        <section className="flex items-center justify-between py-4">
          <h5 className="text-14 font-400 text-grey-900">총 금액</h5>
          <p className="flex items-center gap-12 text-22 font-700 text-grey-900">
            {watchedPassengerCount > 1 && (
              <span className="text-14 font-400 text-grey-600-sub">
                ({price?.toLocaleString()}원 * {watchedPassengerCount}인)
              </span>
            )}
            {(price * watchedPassengerCount).toLocaleString()}원
          </p>
        </section>
        <div className="grid grid-cols-[76px_1fr] gap-8">
          <Button type="button" variant="secondary" onClick={handlePrevStep}>
            이전
          </Button>
          <Button type="button" onClick={checkValidAndGoNextStep}>
            다음 단계로
          </Button>
        </div>
      </div>
    </>
  );
};

export default PassengerInfoStep;
