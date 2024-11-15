'use client';

import {
  ERROR_MESSAGES,
  FORM_DEFAULT_VALUES,
} from '@/components/onboarding-contents/formValidation.contants';
import { OnboardingFormValues } from '@/components/onboarding-contents/onboarding.types';
import { REGION_TO_ID } from '@/constants/regions';
import { useGetUserDashboard, usePutUser } from '@/services/users';
import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import AppBar from '@/components/app-bar/AppBar';
import ProfileInfoContent from '@/components/onboarding-contents/ProfileInfoContent';
import PersonalInfoContent from '@/components/onboarding-contents/PersonalInfoContent';
import ResidenceContent from '@/components/onboarding-contents/ResidenceContent';
import ArtistContent from '@/components/onboarding-contents/ArtistContent';
import Button from '@/components/buttons/button/Button';
import { toast } from 'react-toastify';
import { getImageUrl } from '@/services/common';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

type EditType = 'profile' | 'personal-info' | 'region' | 'artist';

interface Props {
  searchParams: { type: EditType };
}

const TITLE = {
  profile: '프로필 수정',
  'personal-info': '성별 및 연령대 수정',
  region: '거주 지역 수정',
  artist: '최애 가수 수정',
};

const Edit = ({ searchParams }: Props) => {
  const { data: userDashboard } = useGetUserDashboard();

  const methods = useForm<OnboardingFormValues>({
    defaultValues: FORM_DEFAULT_VALUES,
    mode: 'onBlur',
  });

  useEffect(() => {
    if (!userDashboard) {
      return;
    }
    methods.setValue('nickname', userDashboard.nickname);
    methods.setValue(
      'gender',
      userDashboard.gender === 'MALE' ? '남성' : '여성',
    );
    methods.setValue('age', userDashboard.ageRange);
    const region = userDashboard.region;
    methods.setValue('bigRegion', region.provinceFullName);
    methods.setValue('smallRegion', region.cityFullName);
    // TODO: 유저가 좋아하는 아티스트 값 동기화
    // methods.setValue('favoriteArtists', user.favoriteArtistsIDS);
  }, [userDashboard]);

  const router = useRouter();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: putUser } = usePutUser({
    onSuccess: () => {
      toast.success('프로필을 수정하였습니다.');
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      router.replace('/mypage/profile');
    },
    onError: (e) => {
      console.error(e);
      if (e.status === 409) {
        toast.error('이미 사용중인 닉네임입니다.');
        return;
      }
      toast.error('프로필 수정에 실패하였습니다.');
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const handleEditProfile: SubmitHandler<OnboardingFormValues> = async (
    formData,
  ) => {
    setIsSubmitting(true);
    const favoriteArtistsIDs = formData.favoriteArtists.map(
      (artist) => artist.id,
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
      profileImage: imageUrl,
      favoriteArtistsIDs,
      regionID,
    };

    putUser(body);
  };

  const renderStep = () => {
    switch (searchParams.type) {
      case 'profile':
        return (
          <ProfileInfoContent initialImageSrc={userDashboard?.profileImage} />
        );
      case 'personal-info':
        return <PersonalInfoContent />;
      case 'region':
        return <ResidenceContent />;
      case 'artist':
        return <ArtistContent />;
    }
  };

  if (!userDashboard) {
    return null;
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleEditProfile)}
        noValidate
        className="relative grow"
      >
        <AppBar>{TITLE[searchParams.type]}</AppBar>
        {renderStep()}
        <div className="absolute bottom-0 w-full bg-white px-32 py-12">
          <Button disabled={isSubmitting}>수정하기</Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default Edit;
