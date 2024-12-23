import type { ShuttleRoute } from '@/types/shuttle.types';

export const containsRegionId = (regionId: number, shuttle: ShuttleRoute) => {
  return (
    shuttle.hubs.dropoff.some((h) => h.regionId === regionId) ||
    shuttle.hubs.pickup.some((h) => h.regionId === regionId)
  );
};

// TODO super terrible time complexity, refactor someday
export const containsRegionIds = (
  regionIds: number[],
  shuttle: ShuttleRoute,
) => {
  return (
    shuttle.hubs.dropoff.some((h) => regionIds.includes(h.regionId)) ||
    shuttle.hubs.pickup.some((h) => regionIds.includes(h.regionId))
  );
};
