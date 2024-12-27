'use client';

import {
  SECTION,
  ShuttleRoute,
  ShuttleRouteHubObject,
} from '@/types/shuttle.types';
import { Controller, FormProvider, useForm } from 'react-hook-form';
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
import ReservationShuttleInfo from './sections/ReservationShuttleInfo';
import PassengerForm from './sections/PassengerForm';
import StepLayout from './sections/StepLayout';
import PassengerCount from '@/components/shuttle-detail/components/PassengerCount';
import TossPayment from './sections/TossPayments';
import { fetchAllShuttles } from '../../util/fetch.util';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import PassengerInfo from './sections/PassengerInfo';

export interface PassengerInfoType {
  name: string;
  phoneNumber: string;
}

export interface ReservationFormData {
  shuttleRoute: { label: string; value: number };
  dailyShuttle: { label: string; value: number };
  tripType: { label: string; value: string };
  passengerCount: number;
  passengers: PassengerInfoType[];
  isHandy: boolean;
  toDestinationShuttleRouteHubId: string;
  fromDestinationShuttleRouteHubId: string;
}

export interface DailyShuttle {
  dailyShuttleId: number;
  date: string;
  status: 'OPEN' | 'CLOSED' | 'ENDED' | 'INACTIVE';
}

interface Props {
  params: {
    id: string;
  };
}

const ShuttleWrite = ({ params }: Props) => {
  const ready = true; // TODO: need to apply API
  const { Funnel, Step, handleNextStep, handlePrevStep } = useFunnel([
    1, 2, 3, 4,
  ]);
  const methods = useForm<ReservationFormData>({
    defaultValues: {
      shuttleRoute: undefined,
      dailyShuttle: undefined,
      tripType: undefined,
      passengerCount: 0,
      passengers: [],
      isHandy: false,
      toDestinationShuttleRouteHubId: '',
      fromDestinationShuttleRouteHubId: '',
    },
  });

  const { control, watch, setValue } = methods;
  const passengerCount = watch('passengerCount');
  const tripType: { label: string; value: string } | undefined =
    watch('tripType');
  const watchDailyShuttle: { label: string; value: number } | undefined =
    watch('dailyShuttle');
  const watchShuttleRoute: { label: string; value: number } | undefined =
    watch('shuttleRoute');
  const watchPassengers: PassengerInfoType[] = watch('passengers');
  const [shuttleData, setShuttleData] = useState<ShuttleRoute[]>([]);
  const [dailyShuttleRouteArray, setDailyShuttleRouteArray] = useState<
    ShuttleRoute[]
  >([]);
  const [dailyShuttleArray, setDailyShuttleArray] = useState<
    DailyShuttle[] | undefined
  >(undefined);
  const [routeHubsToDestination, setRouteHubsToDestination] = useState<
    ShuttleRouteHubObject[]
  >([]);
  const [routeHubsFromDestination, setRouteHubsFromDestination] = useState<
    ShuttleRouteHubObject[]
  >([]);

  const { data } = useQuery({
    queryKey: ['shuttle', params.id],
    queryFn: () => fetchAllShuttles(),
  });

  // ShuttleId 에 해당하는 DATA
  useEffect(() => {
    if (data && data.length > 0) {
      const shuttleData = data.filter(
        (v) => v.shuttle.shuttleId === Number(params.id),
      );
      console.log('💵 shuttleData', shuttleData);
      setShuttleData(shuttleData);
      setDailyShuttleArray(shuttleData[0].shuttle.dailyShuttles);
    }
  }, [data, params.id]);

  useEffect(() => {
    console.log('✅ watchDailyShuttle', watchDailyShuttle);
    if (watchDailyShuttle) {
      const dailyShuttleRoutes = shuttleData.filter(
        (v) => v.dailyShuttleId === watchDailyShuttle.value,
      );
      setDailyShuttleRouteArray(dailyShuttleRoutes);
    }
  }, [watchDailyShuttle]);

  useEffect(() => {
    if (watchShuttleRoute) {
      console.log('✅ watchShuttleRoute', watchShuttleRoute);
      const routeHubsToDestination =
        shuttleData.find((v) => v.shuttleRouteId === watchShuttleRoute.value)
          ?.hubs.toDestination ?? [];
      const routeHubsFromDestination =
        shuttleData.find((v) => v.shuttleRouteId === watchShuttleRoute.value)
          ?.hubs.fromDestination ?? [];
      console.log('✅ routeHubsToDestination', routeHubsToDestination);
      console.log('✅ routeHubsFromDestination', routeHubsFromDestination);
      setRouteHubsToDestination(routeHubsToDestination);
      setRouteHubsFromDestination(routeHubsFromDestination);
    }
  }, [watchShuttleRoute]);

  // const handlePassengerCountChange = (
  //   newCount: number | ((prev: number) => number),
  // ) => {
  //   const count =
  //     typeof newCount === 'function' ? newCount(passengerCount) : newCount;
  //   setValue('passengerCount', count);
  //   setValue('passengers', Array(count).fill({ name: '', phoneNumber: '' }));
  // };

  if (!data || !dailyShuttleArray || !dailyShuttleRouteArray) return null;
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
              <ReservationShuttleInfo
                control={control}
                dailyShuttleArray={dailyShuttleArray}
                dailyShuttleRouteArray={dailyShuttleRouteArray}
              />
              {ready && (
                <>
                  <div id="divider" className="my-16 h-[8px] bg-grey-50" />
                  <ShuttleRouteVisualizer
                    type={
                      tripType?.value as
                        | 'ROUND_TRIP'
                        | 'TO_DESTINATION'
                        | 'FROM_DESTINATION'
                    }
                    toDestinationObject={routeHubsToDestination}
                    fromDestinationObject={routeHubsFromDestination}
                    section={SECTION.RESERVATION_DETAIL}
                  />
                </>
              )}
              <NoticeSection type={NOTICE_TYPE.CANCELLATION_AND_REFUND} />
              <NoticeSection type={NOTICE_TYPE.TERM_AND_CONDITION} />
            </StepLayout>
          </Step>

          <Step name={2}>
            <StepLayout
              step={2}
              handleNextStep={handleNextStep}
              handlePrevStep={handlePrevStep}
            >
              <Controller
                control={methods.control}
                name="passengerCount"
                render={({ field: { value, onChange } }) => (
                  <PassengerCount
                    count={value}
                    setCount={(newValue) => onChange(newValue)}
                  />
                )}
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
              <PassengerInfo passengers={watchPassengers} />
              <Divider />
              <ApplyHandy />
              <Divider />
              <TotalPriceInfo />
              <Divider />
              <TossPayment
                shuttleRouteId={watchShuttleRoute?.value}
                type={
                  tripType?.value as
                    | 'ROUND_TRIP'
                    | 'TO_DESTINATION'
                    | 'FROM_DESTINATION'
                }
                toDestinationShuttleRouteHubId={
                  routeHubsToDestination[0]?.shuttleRouteHubId
                }
                fromDestinationShuttleRouteHubId={
                  routeHubsFromDestination[0]?.shuttleRouteHubId
                }
                passengers={watchPassengers}
              />
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
              <PassengerInfo passengers={watchPassengers} />
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
