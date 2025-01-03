'use client';

import { ShuttleRoute, ShuttleRouteHubObject } from '@/types/shuttle.types';
import { FormProvider, useForm } from 'react-hook-form';
import useFunnel from '@/hooks/useFunnel';
import { fetchAllShuttles } from '../../util/fetch.util';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { IssuedCouponType } from '@/types/client.types';
import ShuttleWriteStep2 from './components/ShuttleWriteStep2';
import ShuttleWriteStep1 from './components/ShuttleWriteStep1';
import ShuttleWriteStep3 from './components/ShuttleWriteStep3';
import ShuttleWriteStep4 from './components/ShuttleWriteStep4';
import StepLayout from './sections/StepLayout';

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
  toDestinationHubId: string;
  fromDestinationHubId: string;
  selectedCoupon: IssuedCouponType;
  finalPrice: number;
  postCoupon: string;
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
  const { Funnel, Step, handleNextStep, handlePrevStep } = useFunnel([
    1, 2, 3, 4,
  ]);
  const methods = useForm<ReservationFormData>({
    defaultValues: {
      shuttleRoute: undefined,
      dailyShuttle: undefined,
      tripType: undefined,
      passengerCount: 1,
      passengers: [],
      isHandy: false,
      toDestinationHubId: '',
      fromDestinationHubId: '',
      selectedCoupon: undefined,
      finalPrice: 0,
      postCoupon: '',
    },
    mode: 'onBlur',
  });

  const { watch } = methods;
  const watchDailyShuttle: { label: string; value: number } | undefined =
    watch('dailyShuttle');
  const watchShuttleRoute: { label: string; value: number } | undefined =
    watch('shuttleRoute');
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
  const [currentShuttleData, setCurrentShuttleData] = useState<
    ShuttleRoute | undefined
  >(undefined);

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
      setShuttleData(shuttleData);
      setDailyShuttleArray(shuttleData[0].shuttle.dailyShuttles);
    }
  }, [data, params.id]);

  useEffect(() => {
    if (watchDailyShuttle) {
      const dailyShuttleRoutes = shuttleData.filter(
        (v) => v.dailyShuttleId === watchDailyShuttle.value,
      );
      setDailyShuttleRouteArray(dailyShuttleRoutes);
    }
  }, [watchDailyShuttle]);

  useEffect(() => {
    if (watchShuttleRoute) {
      const routeHubsToDestination =
        shuttleData.find((v) => v.shuttleRouteId === watchShuttleRoute.value)
          ?.hubs.toDestination ?? [];
      const routeHubsFromDestination =
        shuttleData.find((v) => v.shuttleRouteId === watchShuttleRoute.value)
          ?.hubs.fromDestination ?? [];
      setRouteHubsToDestination(routeHubsToDestination);
      setRouteHubsFromDestination(routeHubsFromDestination);
      setCurrentShuttleData(
        shuttleData.find((v) => v.shuttleRouteId === watchShuttleRoute.value),
      );
    }
  }, [watchShuttleRoute]);

  if (!data || !dailyShuttleArray || !dailyShuttleRouteArray) return;
  return (
    <main>
      <FormProvider {...methods}>
        <Funnel>
          <Step name={1}>
            <StepLayout step={1} shuttleInfoData={shuttleData[0].shuttle}>
              <ShuttleWriteStep1
                handleNextStep={handleNextStep}
                handlePrevStep={handlePrevStep}
                dailyShuttleArray={dailyShuttleArray}
                dailyShuttleRouteArray={dailyShuttleRouteArray}
                routeHubsToDestination={routeHubsToDestination}
                routeHubsFromDestination={routeHubsFromDestination}
              />
            </StepLayout>
          </Step>

          <Step name={2}>
            <StepLayout step={2} shuttleInfoData={shuttleData[0].shuttle}>
              <ShuttleWriteStep2
                handleNextStep={handleNextStep}
                handlePrevStep={handlePrevStep}
                currentShuttleData={currentShuttleData}
              />
            </StepLayout>
          </Step>

          <Step name={3}>
            <StepLayout step={3} shuttleInfoData={shuttleData[0].shuttle}>
              <ShuttleWriteStep3
                handleNextStep={handleNextStep}
                handlePrevStep={handlePrevStep}
                shuttleData={shuttleData}
              />
            </StepLayout>
          </Step>

          <Step name={4}>
            <StepLayout step={4} shuttleInfoData={shuttleData[0].shuttle}>
              <ShuttleWriteStep4 shuttleData={shuttleData} />
            </StepLayout>
          </Step>
        </Funnel>
      </FormProvider>
    </main>
  );
};

export default ShuttleWrite;
