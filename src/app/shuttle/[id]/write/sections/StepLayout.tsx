import BannerImage from '@/app/demand/[id]/write/components/BannerImage';
import ProgressBar from '@/components/progress-bar/ProgressBar';
import BottomBar from '@/components/shuttle-detail/bottom-bar/BottomBar';
import { BottomBarType } from '@/components/shuttle-detail/bottom-bar/BottomBar.type';
import Spacer from '@/components/shuttle-detail/components/Spacer';

interface StepLayoutProps {
  step: number;
  children: React.ReactNode;
  handleNextStep: () => void;
  handlePrevStep: () => void;
}

const StepLayout = ({
  step,
  children,
  handleNextStep,
  handlePrevStep,
}: StepLayoutProps) => {
  return (
    <>
      <ProgressBar numerator={step} denominator={4} />
      <div>
        <BannerImage />
        {children}
      </div>
      <Spacer />
      <BottomBar
        type={`RESERVATION_WRITE_${step}` as BottomBarType}
        handleNextStep={handleNextStep}
        handlePrevStep={handlePrevStep}
      />
    </>
  );
};

export default StepLayout;
