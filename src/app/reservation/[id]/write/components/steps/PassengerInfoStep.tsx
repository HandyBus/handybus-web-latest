import TextInput from '@/components/inputs/text-input/TextInput';

import Counter from '@/components/counter/Counter';
import { useFormContext } from 'react-hook-form';
import { ReservationFormValues } from '../Form';
import Button from '@/components/buttons/button/Button';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { getSinglePriceWithEarlybird } from '../../reservation.util';

interface Props {
  handleNextStep: () => void;
  handlePrevStep: () => void;
}

const PassengerInfoStep = ({ handleNextStep, handlePrevStep }: Props) => {
  const { control, setValue, getValues, trigger } =
    useFormContext<ReservationFormValues>();
  const [passengerCount, setPassengerCount] = useState(
    getValues('passengers').length,
  );

  useEffect(() => {
    const passengers = getValues('passengers');
    if (passengerCount < passengers.length) {
      setValue('passengers', passengers.slice(0, passengerCount));
    }
  }, [passengerCount]);

  const checkValidAndGoNextStep = async () => {
    const isStepValid = await trigger(['passengers']);
    if (!isStepValid) {
      return;
    }
    if (passengerCount === 0) {
      toast.error('탑승객을 최소 1명 이상 입력해주세요');
      return;
    }
    if (passengerCount >= 10) {
      toast.error(
        '10명 이상 예약하는 경우, 핸디버스 카카오 채널로 문의 바랍니다.',
      );
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
        <Counter
          count={passengerCount}
          setCount={setPassengerCount}
          max={Math.min(maxPassengerCount, 9)}
        />
        <p className="text-12 font-400 text-grey-500">
          10명 이상 예약하는 경우, <u>핸디버스 카카오 채널</u>로 문의 바랍니다.
        </p>
      </section>
      <section className="py-28">
        <h3 className="text-22 font-700 text-grey-900">
          탑승객 정보를 입력해주세요
        </h3>
        {Array.from({ length: passengerCount }).map((_, index) => (
          <article key={index} className="flex flex-col gap-16 py-16">
            <h4 className="text-18 font-400 text-grey-700">
              탑승객 {index + 1}
            </h4>
            <div>
              <h5 className="text-12 font-400 text-grey-600-sub">이름</h5>
              <TextInput
                control={control}
                setValue={setValue}
                name={`passengers.${index}.name`}
                placeholder="이름을 입력해주세요."
                rules={{
                  required: '이름을 입력해주세요.',
                }}
              />
            </div>
            <div>
              <h5 className="text-12 font-400 text-grey-600-sub">
                휴대전화번호
              </h5>
              <TextInput
                control={control}
                setValue={setValue}
                name={`passengers.${index}.phoneNumber`}
                placeholder="휴대전화번호를 입력해주세요 (‘-’ 제외)"
                rules={{
                  required: '휴대전화번호를 입력해주세요.',
                  pattern: {
                    value: /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/,
                    message: '올바른 휴대전화번호를 입력해주세요.',
                  },
                }}
              />
            </div>
          </article>
        ))}
      </section>
      <section className="flex items-center justify-between px-8 pt-40">
        <h5 className="text-14 font-400 text-grey-900">총 금액</h5>
        <p className="flex items-center gap-12 text-22 font-700 text-grey-900">
          {passengerCount > 1 && (
            <span className="text-14 font-400 text-grey-600-sub">
              ({price?.toLocaleString()}원 * {passengerCount}인)
            </span>
          )}
          {(price * passengerCount).toLocaleString()}원
        </p>
      </section>
      <div className="fixed bottom-0 left-0 right-0 mx-auto grid max-w-500 grid-cols-[76px_1fr] gap-8 bg-white px-16 py-8 shadow-bottomBar">
        <Button type="button" variant="secondary" onClick={handlePrevStep}>
          이전
        </Button>
        <Button type="button" onClick={checkValidAndGoNextStep}>
          다음 단계로
        </Button>
      </div>
    </>
  );
};

export default PassengerInfoStep;
