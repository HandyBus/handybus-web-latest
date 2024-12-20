import type { ShuttleRoute } from '@/types/shuttle.types';
import type { Region } from '@/hooks/useRegion';
import { instance } from '@/services/config';

export const fetchAllShuttles = async () => {
  const res = await instance.get<{ shuttleRouteDetails: ShuttleRoute[] }>(
    '/shuttle-operation/shuttles/all/dates/all/routes',
  );
  return res.shuttleRouteDetails;
};

export const fetchRelatedShuttles = async (region: Region) => {
  if (region.bigRegion === undefined) {
    return [];
  }

  const params = new URLSearchParams({
    bigRegion: region.bigRegion,
    ...(region.smallRegion && { smallRegion: region.smallRegion }),
  }).toString();
  const res = await instance.get<{ shuttleRouteDetails: ShuttleRoute[] }>(
    `/shuttle-operation/shuttles/all/dates/all/routes?${params}`,
  );

  return res.shuttleRouteDetails;
};
