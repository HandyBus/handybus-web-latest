'use client';

import useFunnel from '@/hooks/useFunnel';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { KeyboardEvent, useEffect, useState } from 'react';
import { REGION_TO_ID } from '@/constants/regions';
import { toast } from 'react-toastify';
import { OnboardingFormValues } from '@/components/onboarding-contents/onboarding.types';
import { useRouter } from 'next/navigation';
import { FORM_DEFAULT_VALUES } from '@/components/onboarding-contents/formValidation.constants';
import AgreementStep from './steps/AgreementStep';
import PhoneNumberStep from './steps/PhoneNumberStep';
import ProfileInfoStep from './steps/ProfileInfoStep';
import PersonalInfoStep from './steps/PersonalInfoStep';
import ResidenceStep from './steps/ResidenceStep';
import { removeIsOnboarding, setIsLoggedIn } from '@/utils/handleToken.util';
import { OnboardingProgress } from '@/utils/parseProgress.util';
import { usePutUser } from '@/services/user-management.service';
import { getImageUrl } from '@/services/core.service';
import { setFirstSignup } from '@/utils/localStorage';

interface Props {
  onboardingProgress: OnboardingProgress;
  initialPhoneNumber?: string;
}

const OnboardingFunnel = ({
  onboardingProgress,
  initialPhoneNumber,
}: Props) => {
  const initialStep =
    onboardingProgress === 'AGREEMENT_INCOMPLETE' ? '약관 동의' : '전화번호';
  const { Funnel, Step, handleNextStep, handlePrevStep, setStep } = useFunnel(
    ONBOARDING_STEPS,
    initialStep,
  );

  const methods = useForm<OnboardingFormValues>({
    defaultValues: {
      ...FORM_DEFAULT_VALUES,
      phoneNumber: initialPhoneNumber,
    },
    mode: 'onBlur',
  });

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: putUser, isSuccess } = usePutUser({
    onSuccess: async () => {
      removeIsOnboarding();
      setIsLoggedIn();
      setFirstSignup();
      toast.success('핸디버스에 오신 것을 환영합니다!');
      router.push('/');
    },
    onError: (e) => {
      console.error(e);
      toast.error('회원가입에 실패하였습니다.');
      setIsSubmitting(false);
    },
  });

  const submitForm: SubmitHandler<OnboardingFormValues> = async (formData) => {
    setIsSubmitting(true);
    const favoriteArtistsIds = formData.favoriteArtists.map(
      (artist) => artist.artistId,
    );
    const imageUrl = await getImageUrl({
      key: 'users/profiles',
      file: formData.profileImage,
    });
    const regionId =
      REGION_TO_ID[formData.bigRegion][formData.smallRegion ?? ''];

    if (!regionId) {
      toast.error('회원가입에 실패하였습니다.');
      return;
    }

    const body = {
      phoneNumber: formData.phoneNumber,
      ageRange: formData.age,
      gender:
        formData.gender === '남성' ? ('MALE' as const) : ('FEMALE' as const),
      profileImage: imageUrl,
      favoriteArtistsIds,
      regionId,
    };

    putUser(body);
  };

  const handleEnter = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (onboardingProgress === 'ONBOARDING_COMPLETE') {
      removeIsOnboarding();
      setIsLoggedIn();
      router.push('/');
    }
  }, [onboardingProgress]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(submitForm)}
        onKeyDown={handleEnter}
        noValidate
        className="relative flex w-full grow flex-col"
        id="onboarding-form"
      >
        <Funnel>
          <Step name="약관 동의">
            <AgreementStep
              handleNextStep={
                initialPhoneNumber ? handleNextStep : () => setStep('전화번호')
              }
            />
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
              handlePrevStep={handlePrevStep}
              isLoading={isSubmitting || isSuccess}
            />
          </Step>
          {/* <Step name="최애 아티스트">
            <ArtistStep
              handlePrevStep={handlePrevStep}
              isLoading={isSubmitting || isSuccess}
            />
          </Step> */}
        </Funnel>
      </form>
    </FormProvider>
  );
};

export default OnboardingFunnel;

const ONBOARDING_STEPS = [
  '약관 동의',
  '전화번호',
  '프로필 정보',
  '개인 정보',
  '거주지',
  // '최애 아티스트',
] as const;
