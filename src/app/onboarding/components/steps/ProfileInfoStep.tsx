'use client';

import { useFormContext } from 'react-hook-form';
import Indicator from '@/components/indicator/Indicator';
import Button from '@/components/buttons/button/Button';
import { usePutNickname } from '@/services/users';
import { OnboardingFormValues } from '@/components/onboarding-contents/onboarding.types';
import { ERROR_MESSAGES } from '@/components/onboarding-contents/formValidation.contants';
import ProfileInfoContent from '@/components/onboarding-contents/ProfileInfoContent';

interface Props {
  handleNextStep: () => void;
}

const ProfileInfoStep = ({ handleNextStep }: Props) => {
  const { getValues, trigger, setError, clearErrors } =
    useFormContext<OnboardingFormValues>();

  const setNicknameDuplicateError = () => {
    setError('nickname', {
      type: 'duplicate',
      message: ERROR_MESSAGES.nickname.duplicate,
    });
  };

  const handleValidStep = () => {
    clearErrors();
    handleNextStep();
  };

  const putNickname = usePutNickname({
    onSuccess: handleValidStep,
    onError: setNicknameDuplicateError,
  });

  const handleCheckStep = async () => {
    const isStepValid = await trigger(['nickname']);
    if (!isStepValid) {
      return;
    }
    const newNickname = getValues('nickname');
    putNickname.mutate(newNickname);
  };

  return (
    <>
      <ProfileInfoContent handleSubmit={handleCheckStep} />
      <div className="absolute bottom-[26px] flex w-full flex-col items-center bg-white">
        <div className="py-16">
          <Indicator max={5} value={2} />
        </div>
        <div className="w-full px-32 py-8">
          <Button
            type="button"
            onClick={handleCheckStep}
            loading={putNickname.isPending}
          >
            다음으로
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProfileInfoStep;
