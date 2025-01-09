import { RegionHubType } from '@/types/hub.type';
import { authInstance } from './config';
import { useQuery } from '@tanstack/react-query';

const getHubsByRegionId = async (regionId?: number | null) => {
  if (!regionId) {
    return [];
  }
  const res = await authInstance.get<{ regionHubs: RegionHubType[] }>(
    `/v1/location/regions/${regionId}/hubs`,
  );
  return res.regionHubs;
};

export const useGetHubsByRegionId = (regionId?: number | null) => {
  return useQuery({
    queryKey: ['hubs', regionId],
    queryFn: () => getHubsByRegionId(regionId),
    enabled: !!regionId,
    initialData: [],
  });
};
