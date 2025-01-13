import OnboardingFunnel from './components/OnboardingFunnel';
import { parseProgress } from '@/utils/parseProgress';
import { redirect } from 'next/navigation';
import { removeOnboardingToken } from '@/utils/handleToken';
import { getUser } from '@/services/v2-temp/user-management.service';

const Funnel = async () => {
  const user = await getUser();
  const onboardingProgress = parseProgress(user.progresses);
  if (onboardingProgress === 'ONBOARDING_COMPLETE') {
    await removeOnboardingToken();
    return redirect('/mypage');
  }
  return (
    <OnboardingFunnel
      onboardingProgress={onboardingProgress}
      initialPhoneNumber={user?.phoneNumber}
    />
  );
};

export default Funnel;
