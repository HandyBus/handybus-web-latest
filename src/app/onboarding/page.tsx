'use client';

import OnboardingFunnel from './components/OnboardingFunnel';
import { useGetUser } from '@/services/user.service';
import DeferredSuspense from '@/components/loading/DeferredSuspense';
import Loading from '@/components/loading/Loading';

const Page = () => {
  const { data: user, isLoading } = useGetUser({ skipCheckOnboarding: true });

  const isOnboardingComplete = user?.onboardingComplete || false;

  return (
    <div className="relative flex h-full w-full grow flex-col">
      <DeferredSuspense fallback={<Loading />} isLoading={isLoading}>
        {user && (
          <OnboardingFunnel isOnboardingComplete={isOnboardingComplete} />
        )}
      </DeferredSuspense>
    </div>
  );
};

export default Page;
