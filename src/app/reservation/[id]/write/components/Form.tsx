import BannerImage from '@/app/demand/[id]/write/components/BannerImage';
import ProgressBar from '@/components/progress-bar/ProgressBar';
import useFunnel from '@/hooks/useFunnel';
import { TripType } from '@/types/v2-temp/shuttle-operation.type';
import { FormProvider, useForm } from 'react-hook-form';
import RouteSelectStep from './steps/RouteSelectStep';
import PassengerInfoStep from './steps/PassengerInfoStep';
import PaymentStep from './steps/payment-step/PaymentStep';
import {
  Event,
  ShuttleRoute,
  ShuttleRouteHub,
} from '@/types/v2-temp/shuttle-operation.type';

const STEPS = ['노선 선택', '탑승 정보 입력', '결제'] as const;

export interface ReservationFormValues {
  shuttleRoute: ShuttleRoute | undefined;
  type: TripType | undefined;
  hub: {
    toDestinationHub: ShuttleRouteHub | undefined;
    fromDestinationHub: ShuttleRouteHub | undefined;
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
  event: Event;
  initialDailyShuttleId: number;
  initialShuttleRouteId: number;
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
              <PaymentStep handlePrevStep={handlePrevStep} event={event} />
            </Step>
          </Funnel>
        </form>
      </FormProvider>
    </main>
  );
};

export default Form;
