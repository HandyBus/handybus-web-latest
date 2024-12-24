import type { ShuttleRoute } from '@/types/shuttle.types';

export const containsRegionID = (regionID: number, shuttle: ShuttleRoute) => {
  return (
    shuttle.hubs.dropoff.some((h) => h.regionID === regionID) ||
    shuttle.hubs.pickup.some((h) => h.regionID === regionID)
  );
};

// TODO super terrible time complexity, refactor someday
export const containsRegionIDs = (
  regionIDs: number[],
  shuttle: ShuttleRoute,
) => {
  return (
    shuttle.hubs.dropoff.some((h) => regionIDs.includes(h.regionID)) ||
    shuttle.hubs.pickup.some((h) => regionIDs.includes(h.regionID))
  );
};
