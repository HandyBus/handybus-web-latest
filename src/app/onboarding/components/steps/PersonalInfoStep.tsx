'use client';

import Button from '@/components/buttons/button/Button';
import RadioButtons from '@/components/buttons/radio-buttons/RadioButtons';
import Indicator from '@/components/indicator/Indicator';
import { useFormContext } from 'react-hook-form';
import { OnboardingFormValues } from '../../page';
import { ERROR_MESSAGES } from '../../constants/formValidation';

const DEFAULT_NICKNAME = '민지사랑해';
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

interface Props {
  handleNextStep: () => void;
  handlePrevStep: () => void;
}

const PersonalInfoStep = ({ handleNextStep, handlePrevStep }: Props) => {
  const { control, setValue, trigger } = useFormContext<OnboardingFormValues>();

  const handleCheckStep = async () => {
    const isStepValid = await trigger(['gender', 'age']);

    if (isStepValid) {
      handleNextStep();
    }
  };

  return (
    <div className="relative h-full w-full grow">
      <h2 className="p-28 text-26 font-700 text-grey-900">
        <span className="text-primary-main">{DEFAULT_NICKNAME}</span>님의 <br />
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
      <div className="absolute bottom-12 flex w-full flex-col items-center bg-white">
        <div className="py-16">
          <Indicator max={4} value={2} />
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

export default PersonalInfoStep;
