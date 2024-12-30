import { getUser } from '@/services/users';
import OnboardingFunnel from './components/OnboardingFunnel';
import { parseProgress } from '@/utils/parseProgress';

const Funnel = async () => {
  const user = await getUser();
  const progress = parseProgress(user.progresses);
  return (
    <OnboardingFunnel
      progress={progress}
      initialPhoneNumber={user?.phoneNumber}
    />
  );
};

export default Funnel;
