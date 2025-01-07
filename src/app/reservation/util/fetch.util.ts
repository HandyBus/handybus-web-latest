import type { ShuttleRouteType } from '@/types/shuttle.types';
import type { Region } from '@/hooks/useRegion';
import { instance } from '@/services/config';
import { toSearchParams } from '@/utils/searchParams';

export const fetchAllShuttles = async () => {
  const res = await instance.get<{ shuttleRouteDetails: ShuttleRouteType[] }>(
    '/v1/shuttle-operation/shuttles/all/dates/all/routes',
  );
  return res.shuttleRouteDetails;
};

export const fetchAllOpenShuttles = async () => {
  const res = await instance.get<{ shuttleRouteDetails: ShuttleRouteType[] }>(
    '/v1/shuttle-operation/shuttles/all/dates/all/routes?status=OPEN',
  );
  return res.shuttleRouteDetails;
};

export const fetchIncludingRelatedOpenShuttles = async (region: Region) => {
  if (region.bigRegion === undefined) {
    return fetchAllOpenShuttles();
  }
  const params = toSearchParams({
    status: 'OPEN',
    provinceFullName: region.bigRegion,
    cityFullName: region.smallRegion,
  }).toString();
  const res = await instance.get<{ shuttleRouteDetails: ShuttleRouteType[] }>(
    `/v1/shuttle-operation/shuttles/all/dates/all/routes?${params}`,
  );
  return res.shuttleRouteDetails;
};
