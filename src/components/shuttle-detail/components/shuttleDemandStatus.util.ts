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
  const toDestinationLength = hubs?.toDestination?.length ?? 0;
  const toDestinationStartLocation = hubs?.toDestination.find(
    (v) => v.sequence === 1,
  );
  const toDestinationEndLocation = hubs?.toDestination.find(
    (v) => v.sequence === toDestinationLength,
  );

  const fromDestinationLength = hubs?.fromDestination?.length ?? 0;
  const fromDestinationStartLocation = hubs?.fromDestination.find(
    (v) => v.sequence === 1,
  );
  const fromDestinationEndLocation = hubs?.fromDestination.find(
    (v) => v.sequence === fromDestinationLength,
  );

  if (!hubs) return;
  if (tripType === '왕복') return '';
  if (tripType === '콘서트행')
    return `${toDestinationStartLocation?.name} → ${toDestinationEndLocation?.name}`;
  if (tripType === '귀가행')
    return `${fromDestinationEndLocation?.name} → ${fromDestinationStartLocation?.name}`;
};
