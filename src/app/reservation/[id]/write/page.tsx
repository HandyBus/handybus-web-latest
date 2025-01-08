'use client';

import { ShuttleRouteType } from '@/types/shuttle.types';
import { HubType } from '@/types/hub.type';
import { FormProvider, useForm } from 'react-hook-form';
import useFunnel from '@/hooks/useFunnel';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { IssuedCouponType } from '@/types/client.types';
import ShuttleWriteStep2 from './components/ShuttleWriteStep2';
import ShuttleWriteStep1 from './components/ShuttleWriteStep1';
import ShuttleWriteStep3 from './components/ShuttleWriteStep3';
import ShuttleWriteStep4 from './components/ShuttleWriteStep4';
import StepLayout from './sections/StepLayout';
import { useSearchParams } from 'next/navigation';
import { getAllRoutes } from '@/services/shuttleOperation';
import { parseDateString } from '@/utils/dateString';

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
  const [isInitialMount, setIsInitialMount] = useState(true);
  const searchParams = useSearchParams();
  const dailyShuttleId = searchParams.get('dailyShuttleId');
  const shuttleRouteId = searchParams.get('shuttleRouteId');
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

  const { watch, setValue } = methods;
  const watchDailyShuttle: { label: string; value: number } | undefined =
    watch('dailyShuttle');
  const watchShuttleRoute: { label: string; value: number } | undefined =
    watch('shuttleRoute');
  const [shuttleData, setShuttleData] = useState<ShuttleRouteType[]>([]);
  const [dailyShuttleRouteArray, setDailyShuttleRouteArray] = useState<
    ShuttleRouteType[]
  >([]);
  const [dailyShuttleArray, setDailyShuttleArray] = useState<
    DailyShuttle[] | undefined
  >(undefined);
  const [routeHubsToDestination, setRouteHubsToDestination] = useState<
    HubType[]
  >([]);
  const [routeHubsFromDestination, setRouteHubsFromDestination] = useState<
    HubType[]
  >([]);
  const [currentShuttleData, setCurrentShuttleData] = useState<
    ShuttleRouteType | undefined
  >(undefined);

  const { data } = useQuery({
    queryKey: ['shuttle', params.id],
    queryFn: () => getAllRoutes({ status: 'OPEN' }),
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

  useEffect(() => {
    if (!isInitialMount || !shuttleData || !shuttleData.length) return;
    if (dailyShuttleId)
      setValue('dailyShuttle', {
        label: parseDateString(
          shuttleData[0].shuttle.dailyShuttles?.find(
            (v) => v.dailyShuttleId === Number(dailyShuttleId),
          )?.date ?? '',
        ),
        value: Number(dailyShuttleId),
      });
    if (shuttleRouteId)
      setValue('shuttleRoute', {
        label:
          shuttleData.find((v) => v.shuttleRouteId === Number(shuttleRouteId))
            ?.name ?? '',
        value: Number(shuttleRouteId),
      });
    setIsInitialMount(false);
  }, [shuttleData]);

  if (!data || !dailyShuttleArray || !dailyShuttleRouteArray) return;
  return (
    <main className="h-screen overflow-y-auto [&::-webkit-scrollbar]:hidden">
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
