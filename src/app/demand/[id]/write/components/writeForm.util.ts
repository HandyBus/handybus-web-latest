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
});

export const createStopData = (formValues: DemandRequestFormValues) => {
  const createStop = (
    stop:
      | DemandRequestFormValues['destinationStop']
      | DemandRequestFormValues['returnStop'],
  ) =>
    stop?.isCustom ? { customHub: stop.customHub } : { hubID: stop?.hubId };

  return {
    pickup: createStop(formValues.destinationStop),
    dropoff: createStop(formValues.returnStop),
  };
};
