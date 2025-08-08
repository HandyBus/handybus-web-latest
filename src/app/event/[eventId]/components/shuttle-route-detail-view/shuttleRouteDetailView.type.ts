import { TripType } from '@/types/shuttleRoute.type';

export type HubType = 'destination' | 'primary' | 'secondary' | 'tertiary';

export type TripTypeWithoutRoundTrip = Exclude<TripType, 'ROUND_TRIP'>;
