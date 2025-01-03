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
import { CustomError } from '@/services/custom-error';

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
      const res = await authInstance.get<RegionHubProps>(
        `/location/regions/${regionId}/hubs`,
      );
      return res;
    } catch (e) {
      const error = e as CustomError;
      if (error.statusCode === 401) {
        router.push('/login');
      }
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
    dailyShuttleId: number,
    shuttleId: number,
  ) => {
    try {
      const res = await authInstance.post(
        `/shuttle-operation/shuttles/${shuttleId}/dates/${dailyShuttleId}/demands`,
        submitData,
      );

      router.push(`/demand/${shuttleId}`);
      toast.success('수요 신청에 성공했어요');
      return res;
    } catch (e) {
      const error = e as CustomError;
      if (error.statusCode === 409) {
        toast.error('해당 일자와 경로의 수요조사를 이미 신청완료했어요.');
        return;
      }
      console.error('수요조사를 제출하는데 실패했어요 \n', error);
      alert('수요조사를 제출하는데 실패했어요 \n' + error);
    }
  };

  const onSubmit = useCallback(async () => {
    const dailyShuttleId = formValues.dailyShuttle.dailyShuttleId;
    const shuttleId = demandData.shuttleId;
    const translatedRouteType =
      formValues.routeType === '콘서트행'
        ? 'TO_DESTINATION'
        : formValues.routeType === '귀가행'
          ? 'FROM_DESTINATION'
          : 'ROUND_TRIP';

    const { toDestinationRegionHub, fromDestinationRegionHub } =
      createStopData(formValues);

    const routeTypeToData = {
      콘서트행: { toDestinationRegionHub },
      귀가행: { fromDestinationRegionHub },
      왕복행: { toDestinationRegionHub, fromDestinationRegionHub },
      '': {},
    };

    const submitData = {
      regionId: formValues.regionId,
      type: translatedRouteType,
      passengerCount: formValues.passengerCount,
      ...routeTypeToData[formValues.routeType as keyof typeof routeTypeToData],
    };

    await postDemand(submitData, dailyShuttleId, shuttleId);
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
