'use client';

import { SECTION } from '@/types/shuttle.types';
import { FormProvider, useForm } from 'react-hook-form';
import useFunnel from '@/hooks/useFunnel';
import NoticeSection, {
  NOTICE_TYPE,
} from '@/components/notice-section/NoticeSection';
import ShuttleRouteVisualizer from '@/components/shuttle/shuttle-route-visualizer/ShuttleRouteVisualizer';
import ReservationCompleted from './sections/ReservationCompleted';
import ApplyHandy from './sections/ApplyHandy';
import TotalPriceInfo from './sections/TotalPriceInfo';
import PriceDetail from './sections/PriceDetail';
import ReservationInfo from './sections/ReservationInfo';
import PassengerInfo from './sections/PassengerInfo';
import ReservationShuttleInfo from './sections/ReservationShuttleInfo';
import PassengerForm from './sections/PassengerForm';
import StepLayout from './sections/StepLayout';
import PassengerCount from '@/components/shuttle-detail/components/PassengerCount';

interface PassengerInfo {
  name: string;
  phone: string;
}

export interface ReservationFormData {
  boardingDate: string;
  routeType: string;
  tripType: string;
  passengerCount: number;
  passengers: PassengerInfo[];
  isHandy: boolean;
  pickupHubId: string;
  dropoffHubId: string;
}

const ShuttleWrite = () => {
  const ready = true; // TODO: need to apply API
  const { Funnel, Step, handleNextStep, handlePrevStep } = useFunnel([
    1, 2, 3, 4,
  ]);
  const methods = useForm<ReservationFormData>({
    defaultValues: {
      boardingDate: '',
      routeType: '',
      tripType: '',
      passengerCount: 0,
      passengers: [],
      isHandy: false,
      pickupHubId: '',
      dropoffHubId: '',
    },
  });

  // const { control, watch, setValue } = useForm<ReservationFormData>({
  //   defaultValues: {
  //     boardingDate: '',
  //     routeType: '',
  //     tripType: '',
  //     passengerCount: 0,
  //     passengers: [],
  //     isHandy: false,
  //   },
  // });
  const { control, watch, setValue } = methods;
  const passengerCount = watch('passengerCount');

  const handlePassengerCountChange = (
    newCount: number | ((prev: number) => number),
  ) => {
    const count =
      typeof newCount === 'function' ? newCount(passengerCount) : newCount;
    setValue('passengerCount', count);
    setValue('passengers', Array(count).fill({ name: '', phone: '' }));
  };

  return (
    <main>
      <FormProvider {...methods}>
        <Funnel>
          <Step name={1}>
            <StepLayout
              step={1}
              handleNextStep={handleNextStep}
              handlePrevStep={handlePrevStep}
            >
              <ReservationShuttleInfo control={control} />
              {ready ? (
                <>
                  <div id="divider" className="my-16 h-[8px] bg-grey-50" />
                  <ShuttleRouteVisualizer
                    object={RouteMockData}
                    section={SECTION.RESERVATION_DETAIL}
                  />
                  <NoticeSection type={NOTICE_TYPE.CANCELLATION_AND_REFUND} />
                  <NoticeSection type={NOTICE_TYPE.TERM_AND_CONDITION} />
                </>
              ) : null}
            </StepLayout>
          </Step>

          <Step name={2}>
            <StepLayout
              step={2}
              handleNextStep={handleNextStep}
              handlePrevStep={handlePrevStep}
            >
              <PassengerCount
                count={passengerCount}
                setCount={handlePassengerCountChange}
              />
              {Array.from({ length: passengerCount }).map((_, index) => (
                <PassengerForm
                  key={index}
                  index={index}
                  control={control}
                  setValue={setValue}
                />
              ))}
            </StepLayout>
          </Step>

          <Step name={3}>
            <StepLayout
              step={3}
              handleNextStep={handleNextStep}
              handlePrevStep={handlePrevStep}
            >
              <ReservationInfo />
              <Divider />
              <PassengerInfo />
              <Divider />
              <ApplyHandy />
              <Divider />
              <TotalPriceInfo />
              <Divider />
              <TossPayment />
            </StepLayout>
          </Step>

          <Step name={4}>
            <StepLayout
              step={4}
              handleNextStep={handleNextStep}
              handlePrevStep={handlePrevStep}
            >
              <ReservationCompleted />
              <ReservationInfo />
              <PassengerInfo />
              <section className="px-16 pb-24 pt-32">
                <PriceDetail />
              </section>
            </StepLayout>
          </Step>
        </Funnel>
      </FormProvider>
    </main>
  );
};

export default ShuttleWrite;

const Divider = () => <div className="h-[8px] bg-grey-50" />;

const TossPayment = () => {
  return <section className="h-[354px] bg-primary-400">TOSS PAYMENTS</section>;
};

const RouteMockData = [
  { time: '2024-03-20 14:30:00', hubName: '청주터미널', hubId: '1' },
  {
    time: '2024-03-20 14:40:00',
    hubName: '청주대학교',
    hubId: '2',
    isPickup: true,
  },
  { time: '2024-03-20 14:50:00', hubName: '장소3', hubId: '3' },
  { time: '2024-03-20 15:00:00', hubName: '장소4', hubId: '4' },
  {
    time: '2024-03-20 15:10:00',
    hubName: '장소5',
    hubId: '5',
    isDropoff: true,
  },
  { time: '2024-03-20 15:20:00', hubName: '장소6', hubId: '6' },
];
