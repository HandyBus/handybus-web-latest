import { EventDetailProps } from '@/types/event.types';
import {
  DemandRequestFormValues,
  DemandWriteSearchParams,
} from './writeForm.type';

export const getDefaultValues = (
  searchParams: DemandWriteSearchParams,
  demandData: EventDetailProps,
): DemandRequestFormValues => ({
  dailyShuttle: {
    dailyShuttleId: Number(searchParams.dailyShuttleId),
    date:
      demandData.dailyShuttles.find(
        (shuttle) =>
          shuttle.dailyShuttleId === Number(searchParams.dailyShuttleId),
      )?.date || demandData.dailyShuttles[0].date,
  },
  bigLocation: searchParams.bigLocation || '',
  smallLocation: searchParams.smallLocation || '',
  regionId: searchParams.regionId || '',
  routeType: '',
  passengerCount: 1,
});

export const createStopData = (formValues: DemandRequestFormValues) => {
  const createStop = (
    stop:
      | DemandRequestFormValues['destinationStop']
      | DemandRequestFormValues['returnStop'],
  ) =>
    stop?.isCustom ? { customHub: stop.customHub } : { hubId: stop?.hubId };

  return {
    pickup: createStop(formValues.destinationStop),
    dropoff: createStop(formValues.returnStop),
  };
};
