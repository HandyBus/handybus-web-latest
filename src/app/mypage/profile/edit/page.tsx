'use client';

import Header from '@/components/header/Header';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { useGetUser } from '@/services/user.service';
import { Suspense } from 'react';
import ProfileImageSection from './components/ProfileImageSection';
import PhoneNumberSection from './components/PhoneNumberSection';

const Page = () => {
  const { data: user, isLoading: isUserLoading } = useGetUser();

  const isLoading = isUserLoading;

  return (
    <Suspense>
      <Header />
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
  );
};

export default Page;
