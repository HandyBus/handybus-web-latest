'use client';

import {
  SECTION,
  ShuttleRoute,
  ShuttleRouteHubObject,
} from '@/types/shuttle.types';
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
import TossPayment from './sections/TossPayments';
import { fetchAllShuttles } from '../../util/fetch.util';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

interface PassengerInfo {
  name: string;
  phone: string;
}

export interface ReservationFormData {
  shuttleRouteId: string;
  boardingDate: string;
  routeType: string;
  tripType: string;
  passengerCount: number;
  passengers: PassengerInfo[];
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
      shuttleRouteId: '',
      boardingDate: '',
      routeType: '',
      tripType: '',
      passengerCount: 0,
      passengers: [],
      isHandy: false,
      toDestinationShuttleRouteHubId: '',
      fromDestinationShuttleRouteHubId: '',
    },
  });

  const { control, watch, setValue } = methods;
  const passengerCount = watch('passengerCount');
  const shuttleRouteId: string = watch('shuttleRouteId');
  // const routeType = watch('routeType');
  const [shuttleRoutes, setShuttleRoutes] = useState<ShuttleRoute[]>([]);
  const [dailyShuttle, setDailyShuttle] = useState<DailyShuttle[] | undefined>(
    undefined,
  );
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

  useEffect(() => {
    if (data && data.length > 0) {
      const filteredRoutes = data.filter(
        (v) => v.shuttle.shuttleId === Number(params.id),
      );
      const dailyShuttles = data.find(
        (v) => v.shuttle.shuttleId === Number(params.id),
      )?.shuttle.dailyShuttles;

      setShuttleRoutes(filteredRoutes);
      setDailyShuttle(dailyShuttles);
    }
  }, [data, params.id]);

  useEffect(() => {
    if (shuttleRoutes && shuttleRoutes.length > 0) {
      setRouteHubsToDestination(
        shuttleRoutes.find((v) => v.shuttleRouteId === Number(shuttleRouteId))
          ?.hubs.pickup ?? [],
      );
      setRouteHubsFromDestination(
        shuttleRoutes.find((v) => v.shuttleRouteId === Number(shuttleRouteId))
          ?.hubs.dropoff ?? [],
      );
    }
  }, [shuttleRoutes, shuttleRouteId]);

  const handlePassengerCountChange = (
    newCount: number | ((prev: number) => number),
  ) => {
    const count =
      typeof newCount === 'function' ? newCount(passengerCount) : newCount;
    setValue('passengerCount', count);
    setValue('passengers', Array(count).fill({ name: '', phone: '' }));
  };

  if (!data || !dailyShuttle || !shuttleRoutes) return null;
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
                dailyShuttle={dailyShuttle}
                shuttleRoutes={shuttleRoutes}
              />
              {ready && (
                <>
                  <div id="divider" className="my-16 h-[8px] bg-grey-50" />
                  <ShuttleRouteVisualizer
                    toDestinationObject={routeHubsToDestination}
                    fromDestinationObject={routeHubsFromDestination}
                    section={SECTION.RESERVATION_DETAIL}
                    isLoading={!shuttleRoutes || shuttleRoutes.length === 0}
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
