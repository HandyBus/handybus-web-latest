'use client';

import useFunnel from '@/hooks/useFunnel';
import ProfileInfoStep from './components/steps/ProfileInfoStep';
import PersonalInfoStep from './components/steps/PersonalInfoStep';
import ResidenceStep from './components/steps/ResidenceStep';
import ArtistStep from './components/steps/ArtistStep';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { KeyboardEvent, useEffect, useState } from 'react';
import { getProgress, usePutUser } from '@/services/users';
import { getImageUrl } from '@/services/common';
import { REGION_TO_ID } from '@/constants/regions';
import { toast } from 'react-toastify';
import { OnboardingFormValues } from '@/components/onboarding-contents/onboarding.types';
import { useRouter } from 'next/navigation';
import { setSession } from '@/utils/handleSession';
import AgreementStep from './components/steps/AgreementStep';
import PhoneNumberStep from './components/steps/PhoneNumberStep';
import { FORM_DEFAULT_VALUES } from '@/components/onboarding-contents/formValidation.constants';

const ONBOARDING_STEPS = [
  '약관 동의',
  '전화번호',
  '프로필 정보',
  '개인 정보',
  '거주지',
  '최애 가수',
] as const;

const OnboardingFunnel = () => {
  const { Funnel, Step, handleNextStep, handlePrevStep, setStep } =
    useFunnel(ONBOARDING_STEPS);

  const checkProgress = async () => {
    const progress = await getProgress();
    if (progress === 'AGREEMENT_COMPLETE') {
      setStep('전화번호');
    }
  };

  useEffect(() => {
    checkProgress();
  }, []);

  const methods = useForm<OnboardingFormValues>({
    defaultValues: FORM_DEFAULT_VALUES,
    mode: 'onBlur',
  });

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: putUser } = usePutUser({
    onSuccess: () => {
      setSession();
      toast.success('핸디버스에 오신 것을 환영합니다!');
      router.push('/');
      setIsSubmitting(false);
    },
    onError: (e) => {
      console.error(e);
      toast.error('회원가입에 실패하였습니다.');
      setIsSubmitting(false);
    },
  });

  const submitForm: SubmitHandler<OnboardingFormValues> = async (formData) => {
    setIsSubmitting(true);
    const favoriteArtistsIDs = formData.favoriteArtists.map(
      (artist) => artist.id,
    );
    const imageUrl = await getImageUrl({
      key: 'users/profiles',
      file: formData.profileImage,
    });
    const regionID =
      REGION_TO_ID[formData.bigRegion][formData.smallRegion ?? ''];

    if (!regionID) {
      toast.error('회원가입에 실패하였습니다.');
      return;
    }

    const body = {
      nickname: formData.nickname,
      ageRange: formData.age,
      gender:
        formData.gender === '남성' ? ('MALE' as const) : ('FEMALE' as const),
      profileImage: imageUrl,
      favoriteArtistsIDs,
      regionID,
    };

    putUser(body);
  };

  const handleEnter = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(submitForm)}
        onKeyDown={handleEnter}
        noValidate
        className="relative flex w-full grow flex-col"
      >
        <Funnel>
          <Step name="약관 동의">
            <AgreementStep handleNextStep={handleNextStep} />
          </Step>
          <Step name="전화번호">
            <PhoneNumberStep handleNextStep={handleNextStep} />
          </Step>
          <Step name="프로필 정보">
            <ProfileInfoStep handleNextStep={handleNextStep} />
          </Step>
          <Step name="개인 정보">
            <PersonalInfoStep
              handleNextStep={handleNextStep}
              handlePrevStep={handlePrevStep}
            />
          </Step>
          <Step name="거주지">
            <ResidenceStep
              handleNextStep={handleNextStep}
              handlePrevStep={handlePrevStep}
            />
          </Step>
          <Step name="최애 가수">
            <ArtistStep
              handlePrevStep={handlePrevStep}
              isLoading={isSubmitting}
            />
          </Step>
        </Funnel>
      </form>
    </FormProvider>
  );
};

export default OnboardingFunnel;