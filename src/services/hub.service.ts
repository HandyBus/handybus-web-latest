import { authInstance } from './config';
import { useQuery } from '@tanstack/react-query';
import { RegionHubsResponseModelSchema } from '@/types/hub.type';
import { withPagination } from '@/types/common.type';

// ----- GET -----
/**
 * @description 지역 아이디를 기반으로 허브 목록을 조회합니다.  api v2 에서는 페이지네이션 형식으로 변경되었습니다. 사용하는 곳이 수요조사하기 한 곳 뿐입니다. 해당 페이지는 페이지네이션을 사용하지 않아 아래와 같이 shape는 페이지네이션을 받지만, 실제로는 limit 를 주지 않고 불러오기 때문에 모든 hubs를 가져옵니다.
 * @param regionId 지역 아이디
 * @returns 허브 목록
 */
const getHubsByRegionId = async (regionId?: string | null) => {
  if (!regionId) {
    return [];
  }
  const res = await authInstance.get(`/v2/location/regions/${regionId}/hubs`, {
    shape: withPagination({
      regionHubs: RegionHubsResponseModelSchema.array(),
    }),
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
