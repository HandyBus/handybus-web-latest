'use client';

import {
  ERROR_MESSAGES,
  FORM_DEFAULT_VALUES,
} from '@/components/onboarding-contents/formValidation.const';
import { OnboardingFormValues } from '@/components/onboarding-contents/onboarding.type';
import { ID_TO_REGION, REGION_TO_ID } from '@/constants/regions';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import ProfileInfoContent from '@/components/onboarding-contents/ProfileInfoContent';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import OnboardingFrame from '@/components/onboarding-contents/OnboardingFrame';
import { EditType } from '../page';
import { CustomError } from '@/services/custom-error';
import { usePutUser } from '@/services/user.service';
import { UsersViewEntity } from '@/types/user.type';
import { getImageUrl } from '@/services/core.service';
import Header from '@/components/header/Header';

interface Props {
  type: EditType;
  user: UsersViewEntity;
}

const EditForm = ({ type, user }: Props) => {
  const region = user.regionId ? ID_TO_REGION[user.regionId] : null;
  const methods = useForm<OnboardingFormValues>({
    defaultValues: {
      ...FORM_DEFAULT_VALUES,
      nickname: user.nickname ?? '',
      gender: user.gender === 'MALE' ? '남성' : '여성',
      age: user.ageRange === '연령대 미지정' ? undefined : user.ageRange,
      bigRegion: region?.bigRegion ?? undefined,
      smallRegion: region?.smallRegion ?? undefined,
      favoriteArtists: user.favoriteArtists ?? [],
    },
    mode: 'onBlur',
  });

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: putUser, isSuccess } = usePutUser({
    onSuccess: () => {
      toast.success('프로필이 수정되었어요.');
      router.replace('/mypage');
    },
    onError: (e: CustomError) => {
      if (e.statusCode === 409) {
        toast.error('이미 사용중인 닉네임이에요.');
        return;
      }
      toast.error('프로필을 수정하지 못했어요.');
    },
    onSettled: () => {
      setIsSubmitting(false);
      router.refresh();
    },
  });

  const [isProfileImageReset, setIsProfileImageReset] = useState(false);
  const handleEditProfile: SubmitHandler<OnboardingFormValues> = async (
    formData,
  ) => {
    setIsSubmitting(true);
    const favoriteArtistsIds = formData.favoriteArtists.map(
      (artist) => artist.artistId,
    );
    const imageUrl = await getImageUrl({
      key: 'users/profiles',
      file: formData.profileImage,
    });
    if (type === 'region' && !(formData.bigRegion && formData.smallRegion)) {
      methods.setError('bigRegion', {
        type: 'required',
        message: ERROR_MESSAGES.region.required,
      });
      setIsSubmitting(false);
      return;
    }
    const regionId =
      formData.bigRegion && formData.smallRegion
        ? REGION_TO_ID[formData.bigRegion][formData.smallRegion]
        : undefined;
    if (type === 'region' && !regionId) {
      toast.error('프로필을 수정하지 못했어요.');
      setIsSubmitting(false);
      return;
    }

    const body = {
      nickname: formData.nickname,
      ageRange: formData.age,
      gender:
        formData.gender === '남성' ? ('MALE' as const) : ('FEMALE' as const),
      profileImage: isProfileImageReset ? null : imageUrl,
      favoriteArtistsIds,
      regionId,
    };

    putUser(body);
  };

  const renderStep = (type: EditType) => {
    switch (type) {
      case 'profile':
        return (
          <ProfileInfoContent
            hideTitle
            initialNickname={user.nickname ?? ''}
            initialImageSrc={user.profileImage}
            setIsProfileImageReset={setIsProfileImageReset}
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
        <Header />
        <OnboardingFrame
          disabled={isSubmitting || isSuccess}
          buttonType="submit"
          buttonText="완료"
        >
          {renderStep(type)}
        </OnboardingFrame>
      </form>
    </FormProvider>
  );
};

export default EditForm;
