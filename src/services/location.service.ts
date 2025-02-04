import { authInstance } from './config';
import { useQuery } from '@tanstack/react-query';
import { RegionHubSchema } from '@/types/location.type';

const getHubsByRegionId = async (regionId?: string | null) => {
  if (!regionId) {
    return [];
  }
  const res = await authInstance.get(`/v1/location/regions/${regionId}/hubs`, {
    shape: {
      regionHubs: RegionHubSchema.array(),
    },
  });
  return res.regionHubs;
};

export const useGetHubsByRegionId = (regionId?: string | null) =>
  useQuery({
    queryKey: ['hub', regionId],
    queryFn: () => getHubsByRegionId(regionId),
    enabled: !!regionId,
    initialData: [],
  });
