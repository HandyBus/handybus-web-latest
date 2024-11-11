'use client';

import AppBar from '@/components/app-bar/AppBar';
import { FORM_DEFAULT_VALUES } from '@/components/onboarding-contents/formValidation.contants';
import { OnboardingFormValues } from '@/components/onboarding-contents/onboarding.types';
import { FormProvider, useForm } from 'react-hook-form';

type EditType = 'profile' | 'personal-info' | 'region' | 'artist';

interface Props {
  searchParams: { type: EditType };
}

const Edit = ({ searchParams }: Props) => {
  const methods = useForm<OnboardingFormValues>({
    defaultValues: FORM_DEFAULT_VALUES,
    mode: 'onBlur',
  });

  const renderStep = () => {
    switch (searchParams.type) {
      case 'profile':
        return <ProfileInfoStep />;
      // case 'personal-info':
      //   return <PersonalInfoStep />;
      // case 'region':
      //   return <RegionStep />;
      // case 'artist':
      //   return <ArtistStep />;
    }
  };

  return (
    <FormProvider {...methods}>
      <form noValidate className="h-full w-full">
        {renderStep()}
      </form>
    </FormProvider>
  );
};

export default Edit;

const ProfileInfoStep = () => {
  return (
    <>
      <AppBar>프로필 수정</AppBar>
      <div>ProfileInfoStep</div>
    </>
  );
};
