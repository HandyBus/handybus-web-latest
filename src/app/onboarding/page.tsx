'use client';

import OnboardingFunnel from './components/OnboardingFunnel';
import { useGetUser } from '@/services/user-management.service';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';

const Page = () => {
  const { data: user, isLoading } = useGetUser({ skipCheckOnboarding: true });
  const isOnboardingComplete =
    user?.progresses?.find((el) => el.progressType === 'ONBOARDING_COMPLETE')
      ?.isCompleted || false;

  return (
    <div className="relative flex h-full w-full grow flex-col pt-36">
      <DeferredSuspense fallback={<Loading />} isLoading={isLoading}>
        {user && (
          <OnboardingFunnel isOnboardingComplete={isOnboardingComplete} />
        )}
      </DeferredSuspense>
    </div>
  );
};

export default Page;
