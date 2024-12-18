'use client';

import { FormProvider, useForm } from 'react-hook-form';
import ShuttleSelector from './ShuttleSelector';
import BottomBar from '@/components/shuttle-detail/bottom-bar/BottomBar';
import { useRouter } from 'next/navigation';
import ShuttleDemandStatus from './ShuttleDemandStatus';
import { EventDetailProps } from '@/types/event.types';
import { ID_TO_REGION, REGION_TO_ID } from '@/constants/regions';
import { useCallback } from 'react';

export interface ShuttleFormValues {
  dailyShuttle: {
    id: number;
    date: string;
  };
  bigLocation: string;
  smallLocation: string;
  route: string;
}

interface Props {
  shuttleId: number;
  data: EventDetailProps;
  type: 'DEMAND' | 'RESERVATION';
  shuttleStatus:
    | 'DEMAND_SURVEY'
    | 'SURVEY_CLOSED'
    | 'PENDING'
    | 'RESERVATION_CLOSED'
    | 'ENDED'
    | undefined;
}

const ShuttleForm = ({ shuttleId, type, data }: Props) => {
  const router = useRouter();

  const methods = useForm<ShuttleFormValues>({
    defaultValues: {
      dailyShuttle: {
        id: 0,
        date: '',
      },
      bigLocation: '',
      smallLocation: '',
      route: '',
    },
  });
  const bigLocation = methods.watch('bigLocation');
  const smallLocation = methods.watch('smallLocation');
  const dailyShuttle = methods.watch('dailyShuttle');

  const getRegionId = useCallback(() => {
    if (
      !REGION_TO_ID[bigLocation] ||
      !REGION_TO_ID[bigLocation][smallLocation]
    ) {
      return undefined;
    }
    return REGION_TO_ID[bigLocation][smallLocation];
  }, [bigLocation, smallLocation]);

  const onSubmit = () => {
    const queryParams = new URLSearchParams({
      dailyShuttleID: dailyShuttle.id.toString(),
      bigLocation: bigLocation,
      smallLocation: smallLocation,
      regionID: getRegionId()?.toString() ?? '',
    });

    if (type === 'DEMAND')
      router.push(`/demand/${shuttleId}/write?${queryParams}`);
    if (type === 'RESERVATION')
      router.push(`/shuttle/${shuttleId}/write?${queryParams}`);
  };

  const message판별기 = (
    shuttleStatus: 'OPEN' | 'CLOSED' | 'ENDED' | 'INACTIVE',
    type: 'DEMAND' | 'RESERVATION',
  ): string | undefined => {
    if (type === 'DEMAND' && shuttleStatus === 'OPEN') return '수요 신청하기';
    if (type === 'DEMAND' && shuttleStatus === 'CLOSED')
      return '수요 신청이 마감되었어요';
    // NOTES: needs to add reservation message
  };

  const variant판별기 = (
    shuttleStatus: 'OPEN' | 'CLOSED' | 'ENDED' | 'INACTIVE',
    type: 'DEMAND' | 'RESERVATION',
  ): 'primary' | 'secondary' | undefined => {
    if (
      type === 'DEMAND' &&
      shuttleStatus === 'OPEN' &&
      (!getRegionId() || dailyShuttle.id) === 0
    )
      return 'secondary';
    if (type === 'DEMAND' && shuttleStatus === 'OPEN') return 'primary';
    if (type === 'DEMAND' && shuttleStatus === 'CLOSED') return 'secondary';
    // NOTES: needs to add reservation button variant
  };

  const disabled판별기 = (
    shuttleStatus: 'OPEN' | 'CLOSED' | 'ENDED' | 'INACTIVE',
    type: 'DEMAND' | 'RESERVATION',
  ): boolean => {
    if (
      type === 'DEMAND' &&
      shuttleStatus === 'OPEN' &&
      (!getRegionId() || dailyShuttle.id === 0)
    )
      return true;
    if (type === 'DEMAND' && shuttleStatus === 'CLOSED') return true;
    // NOTES: needs to add reservation button disabled
    return false;
  };

  const locationFormatter = (regionId: number | undefined) => {
    if (!regionId) return '';
    return (
      ID_TO_REGION[regionId].bigRegion +
      ' ' +
      ID_TO_REGION[regionId].smallRegion
    );
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <ShuttleSelector control={methods.control} type={type} data={data} />
        <ShuttleDemandStatus
          type={type === 'DEMAND' ? 'DEMAND_SURVEY' : 'SELECT_SHUTTLE'}
          shuttleId={shuttleId}
          regionId={getRegionId()}
          dailyShuttle={dailyShuttle}
          shuttle_location={locationFormatter(getRegionId())}
          destination={data.destination.name}
        />
        <BottomBar
          onSubmit={methods.handleSubmit(onSubmit)}
          type={type}
          message={message판별기(data.status, type)}
          variant={variant판별기(data.status, type)}
          disabled={disabled판별기(data.status, type)}
          shuttleName={data.name}
        />
      </form>
    </FormProvider>
  );
};

export default ShuttleForm;
