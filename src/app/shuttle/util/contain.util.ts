import type { ShuttleRoute } from '@/types/shuttle.types';

export const containsRegionID = (regionId: number, shuttle: ShuttleRoute) => {
  return (
    shuttle.hubs.dropoff.some((h) => h.regionId === regionId) ||
    shuttle.hubs.pickup.some((h) => h.regionId === regionId)
  );
};

// TODO super terrible time complexity, refactor someday
export const containsRegionIDs = (
  regionIDs: number[],
  shuttle: ShuttleRoute,
) => {
  return (
    shuttle.hubs.dropoff.some((h) => regionIDs.includes(h.regionId)) ||
    shuttle.hubs.pickup.some((h) => regionIDs.includes(h.regionId))
  );
};
