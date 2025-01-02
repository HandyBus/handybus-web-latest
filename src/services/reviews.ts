import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { authInstance } from './config';
import { ReviewType } from '@/types/client.types';
import { toast } from 'react-toastify';

const getReviews = async (page: number, limit: number) => {
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
      getReviews(pageParam, REVIEW_PER_PAGE),
    initialPageParam: 0,
    initialData: { pages: [], pageParams: [] },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    select: (data) => ({
      reviews: (data.pages ?? []).flatMap((page) => page.reviews),
      totalCount: data.pages?.[0]?.totalCount ?? 0,
    }),
  });
};

const getUserReviews = async () => {
  const res = await authInstance.get<{ reviews: ReviewType[] }>(
    '/user-management/users/me/reviews',
  );
  return res.reviews;
};

export const useGetUserReviews = () => {
  return useQuery({
    queryKey: ['user', 'reviews'],
    queryFn: getUserReviews,
    initialData: [],
  });
};

const postUserReview = async (body: {
  shuttleId: number;
  reservationId: number;
  rating: number;
  content: string;
  images: {
    imageUrl: string;
  }[];
}) => {
  return await authInstance.post('/shuttle-operation/reviews', body);
};

export const usePostUserReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postUserReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'review'] });
      toast.success('후기를 작성해주셔서 감사합니다!');
    },
    onError: () => {
      toast.error('후기 작성에 실패하였습니다.');
    },
  });
};
