import { getProgress } from '@/services/users';
import OnboardingFunnel from './components/OnboardingFunnel';

const Funnel = async () => {
  const progress = await getProgress();
  return <OnboardingFunnel progress={progress} />;
};

export default Funnel;
