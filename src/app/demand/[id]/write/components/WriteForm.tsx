'use client';

import { Controller, FormProvider } from 'react-hook-form';
import { useCallback } from 'react';
import { EventDetailProps } from '@/types/event.types';
import { authInstance } from '@/services/config';
import { RegionHubProps } from '@/types/shuttle.types';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '@/components/shuttle-detail/components/LoadingSpinner';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { SubmitData, DemandWriteSearchParams } from './writeForm.type';
import PassengerCount from '@/components/shuttle-detail/components/PassengerCount';
import BottomBar from '@/components/shuttle-detail/bottom-bar/BottomBar';

import { createStopData } from './writeForm.util';
import { useShuttleDemandForm } from '../hooks/useShuttleDemandForm';
import { useShuttleFormValidation } from '../hooks/useValidation';
import RouteInfo from '../components/RouteInfo';
import JourneyLocationPicker from '../components/JourneyLocationPicker';

interface WriteFormProps {
  demandData: EventDetailProps;
  searchParams: DemandWriteSearchParams;
}

const WriteForm = ({ demandData, searchParams }: WriteFormProps) => {
  const { methods, formValues, regionId } = useShuttleDemandForm(
    searchParams,
    demandData,
  );
  const { determineVariant, determineDisabled } =
    useShuttleFormValidation(formValues);
  const router = useRouter();

  const getRegionHubs = async () => {
    try {
      const res = await authInstance.get(`/location/regions/${regionId}/hubs`);

      if (res.data.statusCode === 401) {
        router.push('/login');
      }
      return res.data;
    } catch (error) {
      console.error('Error fetching region hubs:', error);
      throw error;
    }
  };

  const {
    data: regionHubsData,
    error,
    isLoading,
  } = useQuery<RegionHubProps>({
    queryKey: ['regionHubs', regionId],
    queryFn: () => getRegionHubs(),
  });

  const postDemand = async (
    submitData: SubmitData,
    dailyShuttleID: number,
    shuttleID: number,
  ) => {
    try {
      const res = await authInstance.post(
        `/shuttle-operation/shuttles/${shuttleID}/dates/${dailyShuttleID}/demands`,
        submitData,
      );
      if (res.data.statusCode === 201) {
        await router.push(`/demand/${shuttleID}`);
        toast.success('수요 신청에 성공했어요');
        return res.data;
      }
      if (res.data.statusCode === 409) {
        toast.error('해당 일자와 경로의 수요조사를 이미 신청완료했어요.');
        return res.data;
      }
      throw new Error(res.data.error);
    } catch (error) {
      console.error('수요조사를 제출하는데 실패했어요 \n', error);
      alert('수요조사를 제출하는데 실패했어요 \n' + error);
    }
  };

  const onSubmit = useCallback(async () => {
    const dailyShuttleID = formValues.dailyShuttle.id;
    const shuttleID = demandData.shuttleID;
    const translatedRouteType =
      formValues.routeType === '콘서트행'
        ? 'TO_DESTINATION'
        : formValues.routeType === '귀가행'
          ? 'FROM_DESTINATION'
          : 'ROUND_TRIP';

    const { pickup, dropoff } = createStopData(formValues);

    const routeTypeToData = {
      콘서트행: { pickup },
      귀가행: { dropoff },
      왕복행: { pickup, dropoff },
      '': {},
    };

    const submitData = {
      regionID: formValues.regionID,
      type: translatedRouteType,
      passengerCount: formValues.passengerCount,
      ...routeTypeToData[formValues.routeType as keyof typeof routeTypeToData],
    };
    await postDemand(submitData, dailyShuttleID, shuttleID);
  }, [formValues]);

  if (error) return <div>error occured!</div>;
  if (isLoading) return <LoadingSpinner />;
  return (
    <FormProvider {...methods}>
      <RouteInfo demandData={demandData} />
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
      <JourneyLocationPicker
        routeType={methods.watch('routeType')}
        regionHubsData={regionHubsData}
      />
      <BottomBar
        type={'DEMAND_WRITE'}
        onSubmit={methods.handleSubmit(onSubmit)}
        disabled={determineDisabled()}
        variant={determineVariant()}
      />
    </FormProvider>
  );
};

export default WriteForm;
