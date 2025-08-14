'use client';

import OnboardingFunnel from './components/OnboardingFunnel';
import { useGetUser } from '@/services/user.service';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';
import { formatPhoneNumber } from '@/utils/common.util';

const Page = () => {
  const { data: user, isLoading } = useGetUser({ skipCheckOnboarding: true });

  const isOnboardingComplete = user?.onboardingComplete || false;

  const initialPhoneNumber = user?.phoneNumber
    ? formatPhoneNumber(user.phoneNumber, true)
    : '';
  const initialName = user?.name || '';
  const initialGender =
    user?.gender && user?.gender !== 'NONE' ? user.gender : null;
  const initialAgeRange =
    user?.ageRange && user?.ageRange !== '연령대 미지정' ? user.ageRange : null;

  return (
    <div className="relative flex h-full w-full grow flex-col">
      <DeferredSuspense fallback={<Loading />} isLoading={isLoading}>
        {user && (
          <OnboardingFunnel
            isOnboardingComplete={isOnboardingComplete}
            initialPhoneNumber={initialPhoneNumber}
            initialName={initialName}
            initialGender={initialGender}
            initialAgeRange={initialAgeRange}
          />
        )}
      </DeferredSuspense>
    </div>
  );
};

export default Page;
