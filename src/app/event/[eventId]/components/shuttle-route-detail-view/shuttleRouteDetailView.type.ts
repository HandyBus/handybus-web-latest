import { TripType } from '@/types/shuttleRoute.type';

export type HubType = 'eventLocation' | 'primary' | 'secondary' | 'tertiary';

export type TripTypeWithoutRoundTrip = Exclude<TripType, 'ROUND_TRIP'>;
