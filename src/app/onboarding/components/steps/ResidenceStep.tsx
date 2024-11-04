'use client';

import Button from '@/components/buttons/button/Button';
import Indicator from '@/components/indicator/Indicator';
import SelectInput from '@/components/inputs/select-input/SelectInput';
import {
  BIG_REGIONS,
  BigRegionsType,
  SMALL_REGIONS,
} from '@/constants/regions';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { OnboardingFormValues } from '../../page';
import { ERROR_MESSAGES } from '../../constants/formValidation';

interface Props {
  handleNextStep: () => void;
  handlePrevStep: () => void;
}

const ResidenceStep = ({ handleNextStep, handlePrevStep }: Props) => {
  const [bigRegion, setBigRegion] = useState<BigRegionsType>();
  const [smallRegion, setSmallRegion] = useState<string | undefined>(undefined);

  const { getValues, setValue, setError, clearErrors, formState } =
    useFormContext<OnboardingFormValues>();

  useEffect(() => {
    const savedBigRegion = getValues('bigRegion');
    const savedSmallRegion = getValues('smallRegion');
    setBigRegion(savedBigRegion);
    setSmallRegion(savedSmallRegion);
  }, []);

  useEffect(() => {
    if (bigRegion) {
      setValue('bigRegion', bigRegion);
    }
    if (smallRegion) {
      setValue('smallRegion', smallRegion);
    }
  }, [bigRegion, smallRegion]);

  const handleCheckStep = () => {
    const isStepValid = getValues(['bigRegion', 'smallRegion']);
    if (!(isStepValid[0] && isStepValid[1])) {
      setError('bigRegion', {
        type: 'required',
        message: ERROR_MESSAGES.region.required,
      });
      return;
    }

    clearErrors('bigRegion');
    handleNextStep();
  };

  return (
    <div className="relative h-full w-full grow">
      <div className="p-28">
        <h2 className="pb-[6px] text-26 font-700 text-grey-900">
          어디에 거주하고 계세요?
        </h2>
        <p className="text-14 font-600 text-grey-500">
          해당 지역의 셔틀 정보를 먼저 알려드릴게요.
        </p>
      </div>
      <div className="flex flex-col gap-16 p-28">
        <div className="text-16 font-500 text-grey-600-sub">
          거주 지역을 선택해주세요
        </div>
        <SelectInput
          options={BIG_REGIONS}
          placeholder="도/광역시"
          value={bigRegion}
          onChange={(e) => {
            setBigRegion(e);
            setSmallRegion(undefined);
          }}
        />
        <SelectInput
          options={SMALL_REGIONS[bigRegion!] ?? []}
          placeholder="시/군/구"
          disabled={!bigRegion}
          value={smallRegion}
          onChange={setSmallRegion}
        />
        <p className="h-[20px] text-12 font-400 text-red-500">
          {formState.errors.bigRegion?.message}
        </p>
      </div>
      <div className="absolute bottom-12 flex w-full flex-col items-center bg-white">
        <div className="py-16">
          <Indicator max={4} value={3} />
        </div>
        <div className="w-full px-32 pb-4 pt-8">
          <Button type="button" onClick={handleCheckStep}>
            다음으로
          </Button>
        </div>
        <button
          type="button"
          onClick={handlePrevStep}
          className="text-center text-12 text-grey-400 underline underline-offset-2"
        >
          이전으로
        </button>
      </div>
    </div>
  );
};

export default ResidenceStep;
