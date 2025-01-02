import BannerImage from '@/app/demand/[id]/write/components/BannerImage';
import ProgressBar from '@/components/progress-bar/ProgressBar';
import Spacer from '@/components/shuttle-detail/components/Spacer';
import { ShuttleRouteEvent } from '@/types/shuttle.types';

interface StepLayoutProps {
  step: number;
  children: React.ReactNode;
  shuttleInfoData: ShuttleRouteEvent;
  // handleNextStep: () => void;
  // handlePrevStep: () => void;
}

const StepLayout = ({
  step,
  children,
  shuttleInfoData,
  // handleNextStep,
  // handlePrevStep,
}: StepLayoutProps) => {
  return (
    <>
      <ProgressBar numerator={step} denominator={4} />
      <div>
        {step === 4 ? (
          <>{children}</>
        ) : (
          <>
            <BannerImage demandData={shuttleInfoData} />
            {children}
          </>
        )}
      </div>
      <Spacer />
      {/* <BottomBar
        type={`RESERVATION_WRITE_${step}` as BottomBarType}
        handleNextStep={handleNextStep}
        handlePrevStep={handlePrevStep}
      /> */}
    </>
  );
};

export default StepLayout;
