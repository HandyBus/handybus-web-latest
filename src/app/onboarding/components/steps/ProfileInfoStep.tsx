'use client';

import { useFormContext } from 'react-hook-form';
import { OnboardingFormValues } from '@/components/onboarding-contents/onboarding.types';
import { ERROR_MESSAGES } from '@/components/onboarding-contents/formValidation.constants';
import ProfileInfoContent from '@/components/onboarding-contents/ProfileInfoContent';
import OnboardingFrame from '@/components/onboarding-contents/OnboardingFrame';
import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { putUser } from '@/services/user.service';

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
    <OnboardingFrame
      handleSubmit={handleCheckStep}
      indicatorMax={4}
      indicatorValue={2}
      disabled={putNickname.isPending || putNickname.isSuccess}
    >
      <ProfileInfoContent handleSubmit={handleCheckStep} />
    </OnboardingFrame>
  );
};

export default ProfileInfoStep;

const usePutNickname = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (nickname: string) => putUser({ nickname }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user', 'stats'] });
      onSuccess?.();
    },
    onError,
  });
};
