'use client';

import {
  BIG_REGIONS,
  BigRegionsType,
  SMALL_REGIONS,
} from '@/constants/regions';
import { useEffect, useState } from 'react';
import { OnboardingFormValues } from './onboarding.types';
import { useFormContext } from 'react-hook-form';
import Select from '../select/Select';

const ResidenceContent = () => {
  const { getValues, setValue, formState, clearErrors } =
    useFormContext<OnboardingFormValues>();

  const [bigRegion, setBigRegion] = useState<BigRegionsType>();
  const [smallRegion, setSmallRegion] = useState<string | undefined>(undefined);

  useEffect(() => {
    const savedBigRegion = getValues('bigRegion');
    const savedSmallRegion = getValues('smallRegion');
    console.log(savedBigRegion, savedSmallRegion, formState);
    setBigRegion(savedBigRegion);
    setSmallRegion(savedSmallRegion);
  }, []);

  useEffect(() => {
    if (bigRegion) {
      setValue('bigRegion', bigRegion);
    }
    setValue('smallRegion', smallRegion ?? '');
    if (smallRegion) {
      clearErrors('bigRegion');
    }
  }, [bigRegion, smallRegion]);

  return (
    <div className="relative grow">
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
        <Select
          options={BIG_REGIONS}
          value={bigRegion}
          setValue={(el) => {
            setBigRegion(el);
            setSmallRegion(undefined);
          }}
          placeholder="도/광역시"
          bottomSheetTitle="도/광역시 선택"
        />
        <Select
          options={SMALL_REGIONS[bigRegion!] ?? []}
          disabled={!bigRegion}
          value={smallRegion}
          setValue={setSmallRegion}
          placeholder="시/군/구"
          bottomSheetTitle="시/군/구 선택"
        />
        <p className="h-[20px] text-12 font-400 text-red-500">
          {formState.errors.bigRegion?.message}
        </p>
      </div>
    </div>
  );
};

export default ResidenceContent;
