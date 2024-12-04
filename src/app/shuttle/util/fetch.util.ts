import type { ShuttleRoute } from '@/types/shuttle.types';
import type { Region } from '@/hooks/useRegion';
import { authInstance } from '@/services/config';

export const fetchAllShuttles = async () => {
  const response = await authInstance.get(
    '/shuttle-operation/shuttles/all/dates/all/routes',
  );
  return response.data.shuttleRouteDetails as ShuttleRoute[];
};

export const fetchRelatedShuttles = async (region: Region) => {
  if (region.bigRegion === undefined) {
    return [];
  }

  const response = await authInstance.get(
    '/shuttle-operation/shuttles/all/dates/all/routes',
    { params: { ...region } },
  );

  return response.data.shuttleRouteDetails as ShuttleRoute[];
};
