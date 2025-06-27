import { TripType } from '@/types/shuttleRoute.type';
import { toSearchParams } from '@/utils/searchParams.util';

export const PAYMENT_PARAMS_KEYS = {
  tripType: 'tripType',
  toDestinationHubId: 'toDestinationHubId',
  fromDestinationHubId: 'fromDestinationHubId',
  passengerCount: 'passengerCount',
};

export const createPaymentPageUrl = ({
  eventId,
  dailyEventId,
  shuttleRouteId,
  tripType,
  toDestinationHubId,
  fromDestinationHubId,
  passengerCount,
}: {
  eventId: string;
  dailyEventId: string;
  shuttleRouteId: string;
  tripType: TripType;
  toDestinationHubId?: string;
  fromDestinationHubId?: string;
  passengerCount: number;
}) => {
  const params = {
    [PAYMENT_PARAMS_KEYS.tripType]: tripType,
    [PAYMENT_PARAMS_KEYS.toDestinationHubId]: toDestinationHubId,
    [PAYMENT_PARAMS_KEYS.fromDestinationHubId]: fromDestinationHubId,
    [PAYMENT_PARAMS_KEYS.passengerCount]: passengerCount,
  };
  return `/event/${eventId}/dailyevent/${dailyEventId}/route/${shuttleRouteId}/payment?${toSearchParams(params)}`;
};
