'use client';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { KeyboardEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { OnboardingFormValues } from '@/components/onboarding-contents/onboarding.types';
import { useRouter } from 'next/navigation';
import { FORM_DEFAULT_VALUES } from '@/components/onboarding-contents/formValidation.constants';
import PersonalInfoStep from './steps/PersonalInfoStep';
import { usePutUser } from '@/services/user.service';
import { AgeRange, Gender, UpdateMeRequest } from '@/types/user.type';
import { setOnboardingStatusComplete } from '@/utils/handleToken.util';

interface Props {
  isOnboardingComplete: boolean;
  initialGender: Exclude<Gender, 'NONE'> | null;
  initialAgeRange: Exclude<AgeRange, '연령대 미지정'> | null;
}

const OnboardingFunnel = ({
  isOnboardingComplete,
  initialGender,
  initialAgeRange,
}: Props) => {
  useEffect(() => {
    if (isOnboardingComplete) {
      setOnboardingStatusComplete();
      router.replace('/');
    }
  }, [isOnboardingComplete]);

  const methods = useForm<OnboardingFormValues>({
    defaultValues: {
      ...FORM_DEFAULT_VALUES,
      gender:
        initialGender === 'MALE'
          ? '남성'
          : initialGender === 'FEMALE'
            ? '여성'
            : undefined,
      age: initialAgeRange ?? undefined,
    },
    mode: 'onBlur',
  });

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: putUser, isSuccess } = usePutUser({
    options: {
      skipCheckOnboarding: true,
    },
    onSuccess: async () => {
      setOnboardingStatusComplete();
      router.replace('/');
    },
    onError: (e) => {
      console.error(e);
      toast.error('회원가입에 실패하였습니다.');
      setIsSubmitting(false);
    },
  });

  const submitForm: SubmitHandler<OnboardingFormValues> = async (formData) => {
    setIsSubmitting(true);
    const body: UpdateMeRequest = {
      ageRange: formData.age,
      gender:
        formData.gender === '남성' ? ('MALE' as const) : ('FEMALE' as const),
    };
    putUser(body);
  };
  const triggerSubmitForm = () => {
    const onboardingForm = document.getElementById(
      'onboarding-form',
    ) as HTMLFormElement;
    onboardingForm?.requestSubmit();
  };
  const handleEnter = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const disabled = isSubmitting || isSuccess;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(submitForm)}
        onKeyDown={handleEnter}
        noValidate
        className="relative flex w-full grow flex-col"
        id="onboarding-form"
      >
        <PersonalInfoStep
          triggerSubmitForm={triggerSubmitForm}
          disabled={disabled}
        />
      </form>
    </FormProvider>
  );
};

export default OnboardingFunnel;
