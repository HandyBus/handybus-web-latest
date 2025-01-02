import { useInfiniteQuery } from '@tanstack/react-query';
import { authInstance } from './config';
import { ReviewType } from '@/types/client.types';

const getAllReviews = async (page: number, limit: number) => {
  const res = await authInstance.get<{
    reviews: ReviewType[];
    totalCount: number;
    nextPage: number | null;
  }>(`/shuttle-operation/reviews?page=${page}&limit=${limit}`);
  return res;
};

const REVIEW_PER_PAGE = 10;

export const useGetReviews = () => {
  return useInfiniteQuery({
    queryKey: ['reviews'],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      getAllReviews(pageParam, REVIEW_PER_PAGE),
    initialPageParam: 0,
    initialData: { pages: [], pageParams: [] },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    select: (data) => ({
      reviews: (data.pages ?? []).flatMap((page) => page.reviews),
      totalCount: data.pages?.[0]?.totalCount ?? 0,
    }),
  });
};
