'use client';

import { FORM_DEFAULT_VALUES } from '@/components/onboarding-contents/formValidation.contants';
import { OnboardingFormValues } from '@/components/onboarding-contents/onboarding.types';
import { ID_TO_REGION } from '@/constants/regions';
import { useGetUser } from '@/services/users';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import AppBar from '@/components/app-bar/AppBar';
import ProfileInfoContent from '@/components/onboarding-contents/ProfileInfoContent';
import PersonalInfoContent from '@/components/onboarding-contents/PersonalInfoContent';
import ResidenceContent from '@/components/onboarding-contents/ResidenceContent';
import ArtistContent from '@/components/onboarding-contents/ArtistContent';
import Button from '@/components/buttons/button/Button';

type EditType = 'profile' | 'personal-info' | 'region' | 'artist';

const TITLE = {
  profile: '프로필 수정',
  'personal-info': '성별 및 연령대 수정',
  region: '거주 지역 수정',
  artist: '최애 가수 수정',
};

interface Props {
  searchParams: { type: EditType };
}

const Edit = ({ searchParams }: Props) => {
  const { data: user } = useGetUser();

  const methods = useForm<OnboardingFormValues>({
    defaultValues: FORM_DEFAULT_VALUES,
    mode: 'onBlur',
  });

  useEffect(() => {
    if (user) {
      methods.setValue('nickname', user.nickname);
      methods.setValue('gender', user.gender === 'MALE' ? '남성' : '여성');
      methods.setValue('age', user.ageRange);
      const region = ID_TO_REGION[user.regionID];
      methods.setValue('bigRegion', region.bigRegion);
      methods.setValue('smallRegion', region.smallRegion);
      // TODO: 유저가 좋아하는 아티스트 값 동기화
      // methods.setValue('favoriteArtists', user.favoriteArtistsIDS);
    }
  }, [user]);

  const renderStep = () => {
    switch (searchParams.type) {
      case 'profile':
        return (
          <ProfileInfoContent
            handleSubmit={() => {}}
            initialImageSrc={user?.profileImage}
          />
        );
      case 'personal-info':
        return <PersonalInfoContent />;
      case 'region':
        return <ResidenceContent />;
      case 'artist':
        return <ArtistContent />;
    }
  };

  return (
    <FormProvider {...methods}>
      <form noValidate className="relative h-full w-full">
        <AppBar>{TITLE[searchParams.type]}</AppBar>
        {renderStep()}
        <div className="absolute bottom-0 w-full bg-white px-32 py-12">
          <Button>수정하기</Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default Edit;
