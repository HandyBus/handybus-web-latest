import BannerImage from '@/app/demand/[id]/write/components/BannerImage';
import ProgressBar from '@/components/progress-bar/ProgressBar';
import useFunnel from '@/hooks/useFunnel';
import { TripType } from '@/types/shuttle-operation.type';
import { FormProvider, useForm } from 'react-hook-form';
import RouteSelectStep from './steps/RouteSelectStep';
import PassengerInfoStep from './steps/PassengerInfoStep';
import PaymentStep from './steps/payment-step/PaymentStep';
import {
  Event,
  ShuttleRoute,
  ShuttleRouteHub,
} from '@/types/shuttle-operation.type';

const STEPS = ['노선 선택', '탑승 정보 입력', '결제'] as const;

export interface ReservationFormValues {
  shuttleRoute: ShuttleRoute | undefined;
  type: TripType | undefined;
  hub: {
    toDestinationHub: ShuttleRouteHub | undefined;
    fromDestinationHub: ShuttleRouteHub | undefined;
  };
  passengerCount: number;
  issuedCouponId: string | undefined;
  isSupportingHandy: boolean;
  finalPrice: number;
}

interface Props {
  event: Event;
  initialDailyShuttleId: string;
  initialShuttleRouteId: string;
}

const Form = ({
  event,
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
      passengerCount: 1,
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
      <BannerImage event={event} />
      <FormProvider {...methods}>
        <form className="flex flex-col px-16 pb-100">
          <Funnel>
            <Step name="노선 선택">
              <RouteSelectStep
                handleNextStep={handleNextStep}
                event={event}
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
              <PaymentStep handlePrevStep={handlePrevStep} />
            </Step>
          </Funnel>
        </form>
      </FormProvider>
    </main>
  );
};

export default Form;
