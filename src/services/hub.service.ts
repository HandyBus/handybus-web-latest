import { authInstance } from './config';
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import { RegionHubsResponseModelSchema } from '@/types/hub.type';
import { Combinations, withPagination } from '@/types/common.type';
import { toSearchParams } from '@/utils/searchParams.util';
import { BigRegionsType } from '@/constants/regions';

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

interface GetHubsOptions {
  provinceFullName?: BigRegionsType;
  provinceShortName?: string;
  cityFullName?: string;
  cityShortName?: string;
  name?: string;
  address?: string;
  usageType?: Combinations<'EVENT_DESTINATION' | 'SHUTTLE_HUB'>;
}

interface GetHubsOptionsWithPagination extends GetHubsOptions {
  page?: string;
  limit?: number;
}

const getHubs = async (options?: GetHubsOptionsWithPagination) => {
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
  options?: GetHubsOptionsWithPagination,
  {
    enabled = true,
  }: {
    enabled?: boolean;
  } = {},
) =>
  useInfiniteQuery({
    queryKey: ['hub', options],
    queryFn: ({ pageParam }: { pageParam: string | undefined }) =>
      getHubs({ ...options, page: pageParam }),
    initialPageParam: undefined,
    initialData: { pages: [], pageParams: [] },
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage;
    },
    placeholderData: keepPreviousData,
    enabled,
  });
