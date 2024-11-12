'use client';

import { useFormContext } from 'react-hook-form';
import { OnboardingFormValues } from './onboarding.types';
import RadioButtons from '../buttons/radio-buttons/RadioButtons';
import { ERROR_MESSAGES } from './formValidation.contants';

const GENDER_OPTIONS = ['여성', '남성'] as const;
const AGE_OPTIONS = [
  '10대 이하',
  '20대',
  '30대',
  '40대',
  '50대',
  '60대',
  '70대',
  '80대 이상',
] as const;

const PersonalInfoContent = () => {
  const { control, setValue, getValues } =
    useFormContext<OnboardingFormValues>();
  const nickname = getValues('nickname');

  return (
    <div className="relative grow">
      <h2 className="p-28 text-26 font-700 text-grey-900">
        <span className="text-primary-main">{nickname}</span>님의 <br />
        성별과 연령대를 알려주세요
      </h2>
      <div className="w-full p-28 pb-0">
        <div className="mb-16 text-16 font-500 text-grey-600-sub">
          성별을 선택해주세요
        </div>
        <RadioButtons
          values={GENDER_OPTIONS}
          name="gender"
          control={control}
          setValue={setValue}
          rules={{
            required: ERROR_MESSAGES.gender.required,
          }}
        />
      </div>
      <div className="w-full p-28">
        <div className="mb-16 text-16 font-500 text-grey-600-sub">
          연령대를 선택해주세요
        </div>
        <RadioButtons
          values={AGE_OPTIONS}
          name="age"
          control={control}
          setValue={setValue}
          rules={{
            required: ERROR_MESSAGES.age.required,
          }}
        />
      </div>
    </div>
  );
};

export default PersonalInfoContent;
