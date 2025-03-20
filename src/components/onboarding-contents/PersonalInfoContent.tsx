'use client';

import { useFormContext } from 'react-hook-form';
import { OnboardingFormValues } from './onboarding.types';
import RadioButtons from '../buttons/radio-buttons/RadioButtons';
import { ERROR_MESSAGES } from './formValidation.constants';
import OnboardingTitle from './OnboardingTitle';

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
  const { control, setValue } = useFormContext<OnboardingFormValues>();

  return (
    <>
      <OnboardingTitle title="성별과 연령대를 알려주세요" />
      <div className="w-full px-28">
        <div className="text-basic-grey-600 mb-16 text-16 font-500">
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
      <div className="w-full px-28">
        <div className="text-basic-grey-600 mb-16 text-16 font-500">
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
    </>
  );
};

export default PersonalInfoContent;
