import { authInstance } from './config';
import { useQuery } from '@tanstack/react-query';
import { RegionHubsResponseModelSchema } from '@/types/hub.type';

// ----- GET -----

const getHubsByRegionId = async (regionId?: string | null) => {
  if (!regionId) {
    return [];
  }
  const res = await authInstance.get(`/v1/location/regions/${regionId}/hubs`, {
    shape: {
      regionHubs: RegionHubsResponseModelSchema.array(),
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
