import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { DEFAULT_PAGINATION_LIMIT } from '@/constants/common';
import { toSearchParams } from '@/utils/searchParams.util';
import { withPagination } from '@/types/common.type';
import { instance } from './config';
import { ArtistsViewEntitySchema } from '@/types/artist.type';

// ----- GET -----

interface GetArtistsOptions {
  searchKeyword?: string;
  page?: string;
  limit?: number;
}

export const getArtists = async ({
  limit = DEFAULT_PAGINATION_LIMIT,
  page,
  searchKeyword,
}: GetArtistsOptions = {}) => {
  const searchParams = toSearchParams({ limit, page, searchKeyword });
  const res = await instance.get(
    `/v3/shuttle-operation/artists?${searchParams.toString()}`,
    {
      shape: withPagination({ artists: ArtistsViewEntitySchema.array() }),
    },
  );
  return res;
};

export const useGetArtists = (options?: GetArtistsOptions) =>
  useInfiniteQuery({
    queryKey: ['artist', options],
    queryFn: ({ pageParam }: { pageParam: string | undefined }) =>
      getArtists({ page: pageParam, ...options }),
    initialPageParam: undefined,
    initialData: { pages: [], pageParams: [] },
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

export const getArtist = async (artistId: string) => {
  const res = await instance.get(`/v2/shuttle-operation/artists/${artistId}`, {
    shape: {
      artist: ArtistsViewEntitySchema.nullable(),
    },
  });
  return res.artist;
};

export const useGetArtist = (artistId: string) =>
  useQuery({
    queryKey: ['artist', artistId],
    queryFn: () => getArtist(artistId),
    enabled: !!artistId,
  });
