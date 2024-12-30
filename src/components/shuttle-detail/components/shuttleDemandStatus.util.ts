import { Hub } from '@/types/shuttle.types';

export const displayRouteInfo = (
  tripType: '왕복' | '콘서트행' | '귀가행' | undefined,
  destination: string,
  shuttleLocation?: string,
) => {
  if (!shuttleLocation) return;
  if (tripType === '왕복') return `${shuttleLocation} ↔ ${destination}`;
  if (tripType === '콘서트행') return `${shuttleLocation} → ${destination}`;
  if (tripType === '귀가행') return `${destination} → ${shuttleLocation}`;
};

export const displayRouteInfoForReservation = (
  tripType: '왕복' | '콘서트행' | '귀가행' | undefined,
  hubs?: Hub,
) => {
  const startLocation = hubs?.toDestination.find((v) => v.sequence === 1);
  const length = hubs?.toDestination?.length ?? 0;
  const endLocation = hubs?.fromDestination.find(
    (v) => v.sequence === length - 1,
  );

  if (!hubs) return;
  if (tripType === '왕복') return '';
  if (tripType === '콘서트행')
    return `${startLocation?.name} → ${endLocation?.name}`;
  if (tripType === '귀가행')
    return `${endLocation?.name} → ${startLocation?.name}`;
};
