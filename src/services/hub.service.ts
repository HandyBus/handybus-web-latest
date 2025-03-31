import { authInstance } from './config';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { RegionHubsResponseModelSchema } from '@/types/hub.type';
import {
  Combinations,
  PaginationParams,
  withPagination,
} from '@/types/common.type';
import { toSearchParams } from '@/utils/searchParams.util';
import { BigRegionsType } from '@/constants/regions';
import { LONG_QUERY_STALE_TIME } from '@/constants/common';

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

interface GetHubsParams {
  provinceFullName?: BigRegionsType;
  provinceShortName?: string;
  cityFullName?: string;
  cityShortName?: string;
  name?: string;
  address?: string;
  usageType?: Combinations<'EVENT_DESTINATION' | 'SHUTTLE_HUB'>;
  page?: string;
  limit?: number;
}

const getHubs = async (options?: PaginationParams<GetHubsParams>) => {
  const searchParams = toSearchParams({ ...options });
  const res = await authInstance.get(
    `/v2/location/regions/all/hubs?${searchParams}`,
    {
      shape: withPagination({
        regionHubs: RegionHubsResponseModelSchema.array(),
      }),
    },
  );
  return res;
};

export const useGetHubsWithPagination = (
  params?: PaginationParams<GetHubsParams>,
  {
    enabled = true,
  }: {
    enabled?: boolean;
  } = {},
) =>
  useInfiniteQuery({
    queryKey: ['hub', params],
    queryFn: ({ pageParam }: { pageParam: string | undefined }) =>
      getHubs({ ...params, page: pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage;
    },
    enabled,
    staleTime: LONG_QUERY_STALE_TIME,
  });
