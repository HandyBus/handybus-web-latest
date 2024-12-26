import type { ShuttleRoute } from '@/types/shuttle.types';
import type { Region } from '@/hooks/useRegion';
import { instance } from '@/services/config';

export const fetchAllShuttles = async () => {
  const res = await instance.get<{ shuttleRouteDetails: ShuttleRoute[] }>(
    '/shuttle-operation/shuttles/all/dates/all/routes',
  );
  return res.shuttleRouteDetails;
};

export const fetchIncludingRelatedShuttles = async (region: Region) => {
  if (region.bigRegion === undefined || region.smallRegion === undefined) {
    return fetchAllShuttles();
  }
  const params = new URLSearchParams({
    provinceFullName: region.bigRegion,
    ...(region.smallRegion && { cityFullName: region.smallRegion }),
  }).toString();
  const res = await instance.get<{ shuttleRouteDetails: ShuttleRoute[] }>(
    `/shuttle-operation/shuttles/all/dates/all/routes?${params}`,
  );
  return res.shuttleRouteDetails;
};
