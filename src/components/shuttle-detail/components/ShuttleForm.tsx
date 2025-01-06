'use client';

import { FormProvider, useForm } from 'react-hook-form';
import ShuttleSelector from './ShuttleSelector';
import BottomBar from '@/components/shuttle-detail/bottom-bar/BottomBar';
import { useRouter, useSearchParams } from 'next/navigation';
import { ShuttleDemandStats } from './ShuttleDemandStats';
import { ShuttlePriceStatus } from './ShuttleDemandStats';
import { useMemo } from 'react';
import { SECTION, ShuttleRouteType, ShuttleType } from '@/types/shuttle.types';
import ShuttleRouteVisualizer from '@/components/shuttle/shuttle-route-visualizer/ShuttleRouteVisualizer';
import { ShuttleFormValues } from './shuttleForm.type';
import {
  determineDisabled,
  determineMessage,
  getRegionId,
  locationFormatter,
} from './shuttleForm.util';

interface Props {
  shuttleId: number;
  shuttle: ShuttleType;
  routes?: ShuttleRouteType[];
  type: 'DEMAND' | 'RESERVATION';
}

const ShuttleForm = ({ shuttleId, type, shuttle, routes }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const methods = useForm<ShuttleFormValues>({
    defaultValues: {
      dailyShuttle: {
        dailyShuttleId: Number(searchParams.get('dailyShuttleId')),
        date:
          shuttle.dailyShuttles.find(
            (v) =>
              v.dailyShuttleId === Number(searchParams.get('dailyShuttleId')),
          )?.date ?? '',
      },
      bigLocation: '',
      smallLocation: '',
      shuttleRoute: {
        label:
          routes?.find(
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

  const { shuttleRouteSelected, shuttleRouteId } = useMemo(() => {
    const shuttleRouteSelected = routes?.find(
      (route) => route.name === shuttleRoute?.label,
    );
    const shuttleRouteId = shuttleRouteSelected?.shuttleRouteId;
    return { shuttleRouteSelected, shuttleRouteId };
  }, [shuttleRoute, routes]);

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
          data={shuttle}
          reservData={routes}
        />
        <div id="divider" className="my-16 h-[8px] bg-grey-50" />
        {type === 'DEMAND' && (
          <ShuttleDemandStats
            type={'DEMAND_SURVEY'}
            shuttleId={shuttleId}
            regionId={getRegionId(bigLocation, smallLocation)}
            dailyShuttle={dailyShuttle}
            shuttleLocation={locationFormatter(
              getRegionId(bigLocation, smallLocation),
            )}
            destination={shuttle.destination.name}
          />
        )}
        {type === 'RESERVATION' && (
          <>
            <ShuttleRouteVisualizer
              toDestinationObject={
                routes?.find((route) => route.shuttleRouteId === shuttleRouteId)
                  ?.hubs.toDestination
              }
              fromDestinationObject={
                routes?.find((route) => route.shuttleRouteId === shuttleRouteId)
                  ?.hubs.fromDestination
              }
              section={SECTION.SHUTTLE_DETAIL}
            />
            <ShuttlePriceStatus
              destination={shuttle.destination.name}
              reservData={routes ?? []}
              shuttleRouteId={shuttleRouteId}
            />
          </>
        )}
        <BottomBar
          onSubmit={methods.handleSubmit(onSubmit)}
          type={type}
          message={determineMessage(shuttleRouteSelected?.status, type)}
          disabled={determineDisabled(
            shuttleRouteSelected?.status,
            type,
            bigLocation,
            smallLocation,
            dailyShuttle,
            shuttleRoute,
          )}
          shuttleName={shuttle.name}
        />
      </form>
    </FormProvider>
  );
};

export default ShuttleForm;
