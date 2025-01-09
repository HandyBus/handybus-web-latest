'use client';

import { FormProvider, useForm } from 'react-hook-form';
import ShuttleSelector from './ShuttleSelector';
import BottomBar from '@/components/shuttle-detail/bottom-bar/BottomBar';
import { useRouter, useSearchParams } from 'next/navigation';
import { ShuttleDemandStatus } from './ShuttleDemandStatus';
import { ShuttlePriceStatus } from './ShuttleDemandStatus';
import { EventDetailProps } from '@/types/event.types';
import { useMemo } from 'react';
import {
  SECTION,
  ShuttleRoute,
  ShuttleRouteEvent,
} from '@/types/shuttle.types';
import ShuttleRouteVisualizer from '@/components/shuttle/shuttle-route-visualizer/ShuttleRouteVisualizer';
import { ShuttleFormValues } from './shuttleForm.type';
import {
  determineDisabled,
  determineMessage,
  determineVariant,
  getRegionId,
  locationFormatter,
} from './shuttleForm.util';

interface Props {
  shuttleId: number;
  data: EventDetailProps | ShuttleRouteEvent;
  reservData?: ShuttleRoute[];
  type: 'DEMAND' | 'RESERVATION';
}

const ShuttleForm = ({ shuttleId, type, data, reservData }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const methods = useForm<ShuttleFormValues>({
    defaultValues: {
      dailyShuttle: {
        dailyShuttleId: Number(searchParams.get('dailyShuttleId')),
        date:
          data.dailyShuttles.find(
            (v) =>
              v.dailyShuttleId === Number(searchParams.get('dailyShuttleId')),
          )?.date ?? '',
      },
      bigLocation: '',
      smallLocation: '',
      shuttleRoute: {
        label:
          reservData?.find(
            (route) =>
              route.shuttleRouteId ===
              Number(searchParams.get('shuttleRouteId')),
          )?.name ?? '',
        value: Number(searchParams.get('shuttleRouteId')),
      },
    },
  });
  const bigLocation = methods.watch('bigLocation');
  const smallLocation = methods.watch('smallLocation');
  const dailyShuttle = methods.watch('dailyShuttle');
  const shuttleRoute = methods.watch('shuttleRoute');
  const shuttleRouteId = useMemo(
    () =>
      Number(
        reservData?.find((route) => route.name === shuttleRoute?.label)
          ?.shuttleRouteId,
      ),
    [shuttleRoute, reservData],
  );

  const onSubmit = () => {
    if (type === 'DEMAND') {
      const queryParams = new URLSearchParams({
        dailyShuttleId: dailyShuttle.dailyShuttleId?.toString() ?? '',
        bigLocation: bigLocation,
        smallLocation: smallLocation,
        regionId: getRegionId(bigLocation, smallLocation)?.toString() ?? '',
      });
      router.push(`/demand/${shuttleId}/write?${queryParams}`);
    }
    if (type === 'RESERVATION') {
      const queryParams = new URLSearchParams({
        dailyShuttleId: dailyShuttle.dailyShuttleId?.toString() ?? '',
        shuttleRouteId: shuttleRouteId?.toString() ?? '',
      });
      router.push(`/shuttle/${shuttleId}/write?${queryParams}`);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <ShuttleSelector
          control={methods.control}
          type={type}
          data={data}
          reservData={reservData}
        />
        <div id="divider" className="my-16 h-[8px] bg-grey-50" />
        {type === 'DEMAND' && (
          <ShuttleDemandStatus
            type={'DEMAND_SURVEY'}
            shuttleId={shuttleId}
            regionId={getRegionId(bigLocation, smallLocation)}
            dailyShuttle={dailyShuttle}
            shuttle_location={locationFormatter(
              getRegionId(bigLocation, smallLocation),
            )}
            destination={data.destination.name}
          />
        )}
        {type === 'RESERVATION' && (
          <>
            <ShuttleRouteVisualizer
              toDestinationObject={
                reservData?.find(
                  (route) => route.shuttleRouteId === shuttleRouteId,
                )?.hubs.toDestination
              }
              fromDestinationObject={
                reservData?.find(
                  (route) => route.shuttleRouteId === shuttleRouteId,
                )?.hubs.fromDestination
              }
              section={SECTION.SHUTTLE_DETAIL}
            />
            <ShuttlePriceStatus
              destination={data.destination.name}
              reservData={reservData ?? []}
              shuttleRouteId={shuttleRouteId}
            />
          </>
        )}
        <BottomBar
          onSubmit={methods.handleSubmit(onSubmit)}
          type={type}
          message={determineMessage(data.status, type)}
          variant={determineVariant(
            data.status,
            type,
            bigLocation,
            smallLocation,
            dailyShuttle,
          )}
          disabled={determineDisabled(
            data.status,
            type,
            bigLocation,
            smallLocation,
            dailyShuttle,
            shuttleRoute,
          )}
          shuttleName={data.name}
        />
      </form>
    </FormProvider>
  );
};

export default ShuttleForm;
