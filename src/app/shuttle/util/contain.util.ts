import type { ShuttleRoute } from '@/types/shuttle.types';

export const containsRegionId = (regionId: number, shuttle: ShuttleRoute) => {
  return (
    shuttle.hubs.fromDestination.some((h) => h.regionId === regionId) ||
    shuttle.hubs.toDestination.some((h) => h.regionId === regionId)
  );
};
