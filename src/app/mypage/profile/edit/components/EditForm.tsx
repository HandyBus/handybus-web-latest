'use client';

import {
  ERROR_MESSAGES,
  FORM_DEFAULT_VALUES,
} from '@/components/onboarding-contents/formValidation.constants';
import { OnboardingFormValues } from '@/components/onboarding-contents/onboarding.types';
import { ID_TO_REGION, REGION_TO_ID } from '@/constants/regions';
import { usePutUser } from '@/services/users';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import AppBar from '@/components/app-bar/AppBar';
import ProfileInfoContent from '@/components/onboarding-contents/ProfileInfoContent';
import PersonalInfoContent from '@/components/onboarding-contents/PersonalInfoContent';
import ResidenceContent from '@/components/onboarding-contents/ResidenceContent';
import ArtistContent from '@/components/onboarding-contents/ArtistContent';
import { toast } from 'react-toastify';
import { getImageUrl } from '@/services/common';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import OnboardingFrame from '@/components/onboarding-contents/OnboardingFrame';
import { UserDashboardType } from '@/types/client.types';
import { EditType } from '../page';
import { CustomError } from '@/services/custom-error';

interface Props {
  type: EditType;
  userDashboard: UserDashboardType;
}

const EditForm = ({ type, userDashboard }: Props) => {
  const region = ID_TO_REGION[userDashboard.regionId];
  const methods = useForm<OnboardingFormValues>({
    defaultValues: {
      ...FORM_DEFAULT_VALUES,
      nickname: userDashboard.nickname,
      gender: userDashboard.gender === 'MALE' ? '남성' : '여성',
      age: userDashboard.ageRange,
      bigRegion: region.bigRegion,
      smallRegion: region.smallRegion,
      favoriteArtists: userDashboard.favoriteArtists,
    },
    mode: 'onBlur',
  });

  const router = useRouter();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: putUser, isSuccess } = usePutUser({
    onSuccess: () => {
      toast.success('프로필을 수정하였습니다.');
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      router.replace('/mypage/profile');
    },
    onError: (e: CustomError) => {
      if (e.statusCode === 409) {
        toast.error('이미 사용중인 닉네임입니다.');
        return;
      }
      toast.error('프로필 수정에 실패하였습니다.');
    },
    onSettled: () => {
      setIsSubmitting(false);
      router.refresh();
    },
  });

  const handleEditProfile: SubmitHandler<OnboardingFormValues> = async (
    formData,
  ) => {
    setIsSubmitting(true);
    const favoriteArtistsIDs = formData.favoriteArtists.map(
      (artist) => artist.artistId,
    );
    const imageUrl = await getImageUrl({
      key: 'users/profiles',
      file: formData.profileImage,
    });
    if (!(formData.bigRegion && formData.smallRegion)) {
      methods.setError('bigRegion', {
        type: 'required',
        message: ERROR_MESSAGES.region.required,
      });
      setIsSubmitting(false);
      return;
    }
    const regionID = REGION_TO_ID[formData.bigRegion][formData.smallRegion];
    if (!regionID) {
      toast.error('프로필 수정에 실패하였습니다.');
      setIsSubmitting(false);
      return;
    }

    const body = {
      nickname: formData.nickname,
      ageRange: formData.age,
      gender:
        formData.gender === '남성' ? ('MALE' as const) : ('FEMALE' as const),
      profileImage: imageUrl ?? '',
      favoriteArtistsIDs,
      regionID,
    };

    putUser(body);
  };

  const renderStep = () => {
    switch (type) {
      case 'profile':
        return (
          <ProfileInfoContent initialImageSrc={userDashboard.profileImage} />
        );
      case 'personal-info':
        return <PersonalInfoContent />;
      case 'region':
        return <ResidenceContent />;
      case 'artist':
        return (
          <ArtistContent
            initialSelectedArtists={userDashboard.favoriteArtists}
          />
        );
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleEditProfile)}
        noValidate
        className="relative flex grow flex-col"
      >
        <AppBar handleBack={() => router.replace('/mypage/profile')}>
          {TITLE[type]}
        </AppBar>
        <OnboardingFrame
          disabled={isSubmitting || isSuccess}
          buttonType="submit"
          buttonText="수정하기"
        >
          {renderStep()}
        </OnboardingFrame>
      </form>
    </FormProvider>
  );
};

export default EditForm;

const TITLE = {
  profile: '프로필 수정',
  'personal-info': '성별 및 연령대 수정',
  region: '거주 지역 수정',
  artist: '최애 가수 수정',
};
