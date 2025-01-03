import type { ShuttleRoute } from '@/types/shuttle.types';
import type { Region } from '@/hooks/useRegion';
import { instance } from '@/services/config';
import { toSearchParams } from '@/utils/searchParams';

export const fetchAllShuttles = async () => {
  const res = await instance.get<{ shuttleRouteDetails: ShuttleRoute[] }>(
    '/shuttle-operation/shuttles/all/dates/all/routes',
  );
  return res.shuttleRouteDetails;
};

export const fetchIncludingRelatedShuttles = async (region: Region) => {
  if (region.bigRegion === undefined) {
    return fetchAllShuttles();
  }
  const params = toSearchParams({
    provinceFullName: region.bigRegion,
    cityFullName: region.smallRegion,
  }).toString();
  const res = await instance.get<{ shuttleRouteDetails: ShuttleRoute[] }>(
    `/shuttle-operation/shuttles/all/dates/all/routes?${params}`,
  );
  return res.shuttleRouteDetails;
};
