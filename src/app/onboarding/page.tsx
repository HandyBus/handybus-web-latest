'use client';

import OnboardingFunnel from './components/OnboardingFunnel';
import { useGetUser } from '@/services/user-management.service';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';

const Page = () => {
  const { data: user, isLoading } = useGetUser({ skipCheckOnboarding: true });

  const isOnboardingComplete = user?.onboardingComplete || false;

  const isAgreementComplete =
    (user?.personalInfoConsent && user?.serviceTermsAgreement) || false;

  const initialGender =
    user?.gender && user?.gender !== 'NONE' ? user.gender : null;
  const initialAgeRange =
    user?.ageRange && user?.ageRange !== '연령대 미지정' ? user.ageRange : null;

  return (
    <div className="relative flex h-full w-full grow flex-col pt-36">
      <DeferredSuspense fallback={<Loading />} isLoading={isLoading}>
        {user && (
          <OnboardingFunnel
            isOnboardingComplete={isOnboardingComplete}
            isAgreementComplete={isAgreementComplete}
            initialGender={initialGender}
            initialAgeRange={initialAgeRange}
          />
        )}
      </DeferredSuspense>
    </div>
  );
};

export default Page;
