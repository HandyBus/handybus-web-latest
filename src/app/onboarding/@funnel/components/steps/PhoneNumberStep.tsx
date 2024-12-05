import TextInput from '@/components/inputs/text-input/TextInput';
import {
  ERROR_MESSAGES,
  REG_EXP,
} from '@/components/onboarding-contents/formValidation.constants';
import { OnboardingFormValues } from '@/components/onboarding-contents/onboarding.types';
import OnboardingFrame from '@/components/onboarding-contents/OnboardingFrame';
import OnboardingTitle from '@/components/onboarding-contents/OnboardingTitle';
import { KeyboardEvent } from 'react';
import { useFormContext } from 'react-hook-form';

interface Props {
  handleNextStep: () => void;
}

const PhoneNumberStep = ({ handleNextStep }: Props) => {
  const { control, setValue, trigger } = useFormContext<OnboardingFormValues>();

  const handleCheckStep = async () => {
    const isStepValid = await trigger(['phoneNumber']);
    if (!isStepValid) {
      return;
    }
    handleNextStep();
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCheckStep();
    }
  };

  return (
    <OnboardingFrame
      handleSubmit={handleCheckStep}
      indicatorMax={5}
      indicatorValue={1}
    >
      <OnboardingTitle
        title={
          <>
            휴대전화번호를
            <br />
            입력해주세요
          </>
        }
        description="예약 내역 등 알림톡 전송을 위해 필요해요"
      />
      <div className="p-28">
        <TextInput
          name="phoneNumber"
          control={control}
          setValue={setValue}
          onKeyDown={handleEnter}
          placeholder="휴대전화번호를 입력해주세요 (‘-’ 제외)"
          rules={{
            required: ERROR_MESSAGES.phoneNumber.required,
            pattern: {
              value: REG_EXP.phoneNumber,
              message: ERROR_MESSAGES.phoneNumber.pattern,
            },
          }}
        >
          휴대전화번호
        </TextInput>
      </div>
    </OnboardingFrame>
  );
};

export default PhoneNumberStep;
