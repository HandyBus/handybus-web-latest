import BannerImage from '@/app/demand/[id]/write/components/BannerImage';
import ProgressBar from '@/components/progress-bar/ProgressBar';
import useFunnel from '@/hooks/useFunnel';
import { HubType } from '@/types/hub.type';
import { ShuttleRouteType, ShuttleType, TripType } from '@/types/shuttle.types';
import { FormProvider, useForm } from 'react-hook-form';
import RouteSelectStep from './steps/RouteSelectStep';
import PassengerInfoStep from './steps/PassengerInfoStep';
import PaymentStep from './steps/payment-step/PaymentStep';

const STEPS = ['노선 선택', '탑승 정보 입력', '결제'] as const;

export interface ReservationFormValues {
  shuttleRoute: ShuttleRouteType;
  type: TripType;
  hub: {
    toDestinationHub: HubType | undefined;
    fromDestinationHub: HubType | undefined;
  };
  passengers: {
    name: string;
    phoneNumber: string;
  }[];
  issuedCouponId: number | undefined;
  isSupportingHandy: boolean;
  finalPrice: number;
}

interface Props {
  shuttle: ShuttleType;
  initialDailyShuttleId: number;
  initialShuttleRouteId: number;
}

const Form = ({
  shuttle,
  initialDailyShuttleId,
  initialShuttleRouteId,
}: Props) => {
  const methods = useForm<ReservationFormValues>({
    defaultValues: {
      shuttleRoute: undefined,
      type: undefined,
      hub: {
        toDestinationHub: undefined,
        fromDestinationHub: undefined,
      },
      passengers: [{ name: '', phoneNumber: '' }],
      issuedCouponId: undefined,
      isSupportingHandy: false,
      finalPrice: 0,
    },
  });

  const { Funnel, Step, handleNextStep, handlePrevStep, stepName, stepIndex } =
    useFunnel(STEPS);

  return (
    <main>
      <ProgressBar
        numerator={stepIndex + 1}
        denominator={STEPS.length}
        title={stepName}
      />
      <BannerImage shuttle={shuttle} />
      <FormProvider {...methods}>
        <form className="flex flex-col px-16 pb-100">
          <button>제출</button>
          <Funnel>
            <Step name="노선 선택">
              <RouteSelectStep
                handleNextStep={handleNextStep}
                shuttle={shuttle}
                initialDailyShuttleId={initialDailyShuttleId}
                initialShuttleRouteId={initialShuttleRouteId}
              />
            </Step>
            <Step name="탑승 정보 입력">
              <PassengerInfoStep
                handleNextStep={handleNextStep}
                handlePrevStep={handlePrevStep}
              />
            </Step>
            <Step name="결제">
              <PaymentStep handlePrevStep={handlePrevStep} shuttle={shuttle} />
            </Step>
          </Funnel>
        </form>
      </FormProvider>
    </main>
  );
};

export default Form;
