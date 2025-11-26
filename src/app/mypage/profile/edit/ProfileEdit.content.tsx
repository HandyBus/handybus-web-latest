'use client';

import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useGetUser } from '@/services/user.service';
import { Suspense } from 'react';
import ProfileImageSection from './components/ProfileImageSection';
import PhoneNumberSection from './components/PhoneNumberSection';
import Header from '@/components/header/Header';

const ProfileEdit = () => {
  const { data: user, isLoading: isUserLoading } = useGetUser();

  const isLoading = isUserLoading;

  return (
    <>
      <Header pageName="프로필 수정" />
      <Suspense>
        <DeferredSuspense fallback={<Loading />} isLoading={isLoading}>
          {user && (
            <main className="grow">
              <ProfileImageSection
                initialName={user.name || user.nickname || ''}
                initialImageSrc={user.profileImage || null}
              />
              <PhoneNumberSection initialPhoneNumber={user.phoneNumber || ''} />
            </main>
          )}
        </DeferredSuspense>
      </Suspense>
    </>
  );
};

export default ProfileEdit;
