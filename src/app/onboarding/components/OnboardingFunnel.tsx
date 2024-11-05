'use client';

import useFunnel from '@/hooks/useFunnel';
import ProfileInfoStep from './steps/ProfileInfoStep';
import PersonalInfoStep from './steps/PersonalInfoStep';
import ResidenceStep from './steps/ResidenceStep';
import ArtistStep from './steps/ArtistStep';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { OnboardingFormValues } from '../page';
import { KeyboardEvent, useState } from 'react';
import { usePutUser } from '@/services/users';
import { getImageUrl } from '@/services/common';
import { REGION_TO_ID } from '@/constants/regions';
import { toast } from 'react-toastify';

const ONBOARDING_STEPS = [
  '프로필 정보',
  '개인 정보',
  '거주지',
  '최애 가수',
] as const;

const OnboardingFunnel = () => {
  const { Funnel, Step, handleNextStep, handlePrevStep } =
    useFunnel(ONBOARDING_STEPS);

  const { handleSubmit } = useFormContext<OnboardingFormValues>();
  const { mutate: putUser, isPending } = usePutUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isLoading = isPending || isSubmitting;

  const submitForm: SubmitHandler<OnboardingFormValues> = async (formData) => {
    setIsSubmitting(true);
    const favoriteArtistsIDs = formData.favoriteArtists.map(
      (artist) => artist.id,
    );

    const imageUrl = await getImageUrl({
      key: 'users/profiles',
      file: formData.profileImage,
    });

    const regionID = REGION_TO_ID[formData.bigRegion][formData.smallRegion];

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
    setIsSubmitting(false);
  };

  const handleEnter = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      onKeyDown={handleEnter}
      noValidate
      className="w-full grow"
    >
      <Funnel>
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
          <ArtistStep handlePrevStep={handlePrevStep} isLoading={isLoading} />
        </Step>
      </Funnel>
    </form>
  );
};

export default OnboardingFunnel;
