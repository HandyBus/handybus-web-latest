'use client';

import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useCallback } from 'react';
import BottomBar from '@/components/shuttle-detail/components/BottomBar';
import RouteInfo from './RouteInfo';
import JourneyLocationPicker from './JourneyLocationPicker';
import PassengerCount from '@/components/shuttle-detail/utils/PassengerCount';
import { EventDetailProps } from '@/types/event.types';
import { authInstance } from '@/services/config';
import { RegionHubProps } from '@/types/shuttle.types';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '@/components/shuttle-detail/components/LoadingSpinner';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { DemandRequestFormValues, SubmitData } from './writeForm.type';

const WriteForm = ({
  demandData,
  searchParams,
}: {
  demandData: EventDetailProps;
  searchParams: {
    dailyShuttleID?: string;
    bigLocation?: string;
    smallLocation?: string;
    regionID?: string;
  };
}) => {
  const defaultValues: DemandRequestFormValues = {
    dailyShuttle: {
      id: Number(searchParams.dailyShuttleID),
      date:
        demandData.dailyShuttles.find(
          (shuttle) => shuttle.id === Number(searchParams.dailyShuttleID),
        )?.date || demandData.dailyShuttles[0].date,
    },
    bigLocation: searchParams.bigLocation || '',
    smallLocation: searchParams.smallLocation || '',
    regionID: searchParams.regionID || '',
    routeType: '',
    passengerCount: 1,
  };
  const methods = useForm<DemandRequestFormValues>({
    defaultValues,
    mode: 'onChange',
  });

  const router = useRouter();
  const regionId = methods.watch('regionID');
  const formValues = methods.watch();

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
        // NOTES: 백엔드에서 res.status 200과 함께 res.data.statusCode 409 를 동시에 전달해주고 있음 논의 필요
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

    const pickup = formValues.destinationStop?.isCustom
      ? {
          customHub: formValues.destinationStop?.customHub,
        }
      : {
          hubID: formValues.destinationStop?.hubId,
        };
    const dropoff = formValues.returnStop?.isCustom
      ? {
          customHub: formValues.returnStop?.customHub,
        }
      : {
          hubID: formValues.returnStop?.hubId,
        };
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

  const routeType에따른Stop유무판별기 = useCallback(() => {
    const 콘서트행 = formValues.destinationStop?.isCustom
      ? formValues.destinationStop?.customHub
      : formValues.destinationStop?.hubId;
    const 귀가행 = formValues.returnStop?.isCustom
      ? formValues.returnStop?.customHub
      : formValues.returnStop?.hubId;

    if (formValues.routeType === '콘서트행') return !!콘서트행;
    if (formValues.routeType === '귀가행') return !!귀가행;
    if (formValues.routeType === '왕복행') return !!콘서트행 && !!귀가행;
  }, [formValues]);

  const variant판별기 = useCallback(() => {
    if (
      formValues.dailyShuttle.id !== 0 &&
      formValues.bigLocation &&
      formValues.smallLocation &&
      formValues.regionID &&
      formValues.passengerCount &&
      routeType에따른Stop유무판별기()
    )
      return 'primary';
    return 'secondary';
  }, [formValues, routeType에따른Stop유무판별기]);

  const disabled판별기 = useCallback(() => {
    const disabled = true;
    const abled = false;
    if (
      formValues.dailyShuttle.id !== 0 &&
      formValues.bigLocation &&
      formValues.smallLocation &&
      formValues.regionID &&
      formValues.routeType &&
      formValues.passengerCount &&
      routeType에따른Stop유무판별기()
    )
      return abled;
    return disabled;
  }, [formValues, routeType에따른Stop유무판별기]);

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
        disabled={disabled판별기()}
        variant={variant판별기()}
      />
    </FormProvider>
  );
};

export default WriteForm;
