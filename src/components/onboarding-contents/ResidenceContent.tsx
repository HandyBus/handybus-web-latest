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
import OnboardingTitle from './OnboardingTitle';

const ResidenceContent = () => {
  const { getValues, setValue, formState, clearErrors } =
    useFormContext<OnboardingFormValues>();

  const [bigRegion, setBigRegion] = useState<BigRegionsType>();
  const [smallRegion, setSmallRegion] = useState<string | undefined>(undefined);

  useEffect(() => {
    const savedBigRegion = getValues('bigRegion');
    const savedSmallRegion = getValues('smallRegion');
    setBigRegion(savedBigRegion);
    setSmallRegion(savedSmallRegion);
  }, []);

  useEffect(() => {
    if (!bigRegion) {
      return;
    }
    setValue('bigRegion', bigRegion);
  }, [bigRegion]);

  useEffect(() => {
    if (!smallRegion) {
      return;
    }
    setValue('smallRegion', smallRegion);
    if (formState.errors.bigRegion) {
      clearErrors('bigRegion');
    }
  }, [smallRegion]);

  return (
    <>
      <OnboardingTitle
        title="어디에 거주하고 계세요?"
        description="해당 지역의 셔틀 정보를 먼저 알려드릴게요."
      />
      <div className="flex flex-col gap-16 p-28">
        <div className="text-16 font-500 text-brand-grey-600">
          거주 지역을 선택해주세요
        </div>
        <Select
          options={BIG_REGIONS}
          value={bigRegion}
          setValue={(el) => {
            setBigRegion(el);
            setSmallRegion(undefined);
            setValue('smallRegion', undefined);
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
          sort
        />
        <p className="h-[20px] text-12 font-400 text-basic-red-500">
          {formState.errors.bigRegion?.message}
        </p>
      </div>
    </>
  );
};

export default ResidenceContent;
