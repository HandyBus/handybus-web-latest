import { TripType } from '@/types/shuttleRoute.type';
import { toSearchParams } from '@/utils/searchParams.util';

export const PAYMENT_PARAMS_KEYS = {
  tripType: 'trip-type',
  toDestinationHubId: 'to-destination-hub-id',
  fromDestinationHubId: 'from-destination-hub-id',
  passengerCount: 'passenger-count',
  desiredHubAddress: 'desired-hub-address',
  desiredHubLatitude: 'desired-hub-latitude',
  desiredHubLongitude: 'desired-hub-longitude',
  reservationStartTime: 'reservation-start-time',
  referralCode: 'referral-code',
};

export const createPaymentPageUrl = ({
  eventId,
  dailyEventId,
  shuttleRouteId,
  tripType,
  toDestinationHubId,
  fromDestinationHubId,
  passengerCount,
  desiredHubAddress,
  desiredHubLatitude,
  desiredHubLongitude,
  reservationStartTime,
  referralCode,
}: {
  eventId: string;
  dailyEventId: string;
  shuttleRouteId: string;
  tripType: TripType;
  toDestinationHubId?: string;
  fromDestinationHubId?: string;
  passengerCount: number;
  desiredHubAddress?: string;
  desiredHubLatitude?: number;
  desiredHubLongitude?: number;
  reservationStartTime?: string;
  referralCode?: string;
}) => {
  const params = {
    [PAYMENT_PARAMS_KEYS.tripType]: tripType,
    [PAYMENT_PARAMS_KEYS.toDestinationHubId]: toDestinationHubId,
    [PAYMENT_PARAMS_KEYS.fromDestinationHubId]: fromDestinationHubId,
    [PAYMENT_PARAMS_KEYS.passengerCount]: passengerCount,
    [PAYMENT_PARAMS_KEYS.desiredHubAddress]: desiredHubAddress,
    [PAYMENT_PARAMS_KEYS.desiredHubLatitude]: desiredHubLatitude,
    [PAYMENT_PARAMS_KEYS.desiredHubLongitude]: desiredHubLongitude,
    [PAYMENT_PARAMS_KEYS.reservationStartTime]: reservationStartTime,
    [PAYMENT_PARAMS_KEYS.referralCode]: referralCode,
  };
  return `/event/${eventId}/dailyevent/${dailyEventId}/route/${shuttleRouteId}/payment?${toSearchParams(params)}`;
};
