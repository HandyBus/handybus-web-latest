import Button from '@/components/buttons/button/Button';
import Indicator from '@/components/indicator/Indicator';
import TextInput from '@/components/inputs/text-input/TextInput';
import {
  ERROR_MESSAGES,
  REG_EXP,
} from '@/components/onboarding-contents/formValidation.contants';
import { OnboardingFormValues } from '@/components/onboarding-contents/onboarding.types';
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
    <>
      <div className="relative grow">
        <div className="px-28 py-16">
          <h2 className="pb-[6px] text-26 font-700 text-grey-900">
            휴대전화번호를
            <br />
            입력해주세요
          </h2>
          <p className="text-14 font-600 text-grey-500">
            예약 내역 등 알림톡 전송을 위해 필요해요
          </p>
        </div>
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
      </div>
      <div className="absolute bottom-[26px] flex w-full flex-col items-center bg-white">
        <div className="py-16">
          <Indicator max={5} value={1} />
        </div>
        <div className="w-full px-32 py-8">
          <Button type="button" onClick={handleCheckStep}>
            다음으로
          </Button>
        </div>
      </div>
    </>
  );
};

export default PhoneNumberStep;
