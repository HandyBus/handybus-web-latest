import { DEFAULT_PAGINATION_LIMIT } from '@/constants/common';
import { toSearchParams } from '@/utils/searchParams.util';
import { authInstance, instance } from './config';
import { withPagination } from '@/types/common.type';
import {
  CreateReviewRequest,
  CreateReviewRequestSchema,
  EditReviewRequest,
  EditReviewRequestSchema,
  ReviewStatisticsViewEntitySchema,
  ReviewsViewEntitySchema,
  WriteReviewResponse,
  WriteReviewResponseSchema,
} from '@/types/review.type';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { silentParse } from '@/utils/config.util';
import { toast } from 'react-toastify';

// ----- GET -----

export const getUserReviews = async () => {
  const res = await authInstance.get('/v2/user-management/users/me/reviews', {
    shape: {
      reviews: ReviewsViewEntitySchema.array(),
    },
  });
  return res.reviews;
};

export const useGetUserReviews = () =>
  useQuery({
    queryKey: ['user', 'review'],
    queryFn: getUserReviews,
  });

interface GetReviewsWithPaginationOptions {
  limit: number;
  page?: string;
  eventId?: string;
  userId?: string;
  orderBy?: 'eventName' | 'userNickname' | 'rating';
  additionalOrderOptions?: 'ASC' | 'DESC';
}

export const getReviewsWithPagination = async ({
  limit = DEFAULT_PAGINATION_LIMIT,
  page,
  eventId,
  orderBy,
  additionalOrderOptions,
}: Partial<GetReviewsWithPaginationOptions> = {}) => {
  const searchParams = toSearchParams({
    limit,
    page,
    eventId,
    orderBy,
    additionalOrderOptions,
  });
  const res = await instance.get(
    `/v2/shuttle-operation/reviews?${searchParams.toString()}`,
    {
      shape: withPagination({ reviews: ReviewsViewEntitySchema.array() }),
    },
  );
  return res;
};

export const useGetReviewsWithPagination = (
  options?: Partial<GetReviewsWithPaginationOptions>,
) =>
  useInfiniteQuery({
    queryKey: ['review', options],
    queryFn: ({ pageParam }: { pageParam: string | undefined }) =>
      getReviewsWithPagination({ page: pageParam, ...options }),
    initialPageParam: undefined,
    initialData: { pages: [], pageParams: [] },
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

export const getReview = async (reviewId: string) => {
  const res = await authInstance.get(
    `/v1/user-management/users/me/reviews/${reviewId}`,
    {
      shape: {
        review: ReviewsViewEntitySchema,
      },
    },
  );
  return res.review;
};

export const useGetReview = (reviewId: string) =>
  useQuery({
    queryKey: ['review', reviewId],
    queryFn: () => getReview(reviewId),
  });

export const getReviewStatistics = async () => {
  const res = await instance.get('/v2/shuttle-operation/reviews/all/stats', {
    shape: {
      totalReviewStatistics: ReviewStatisticsViewEntitySchema.array(),
    },
  });
  return res.totalReviewStatistics;
};

export const useGetReviewStatistics = () =>
  useQuery({
    queryKey: ['review', 'statistics'],
    queryFn: getReviewStatistics,
  });

// ----- POST -----

export const postReview = async (body: CreateReviewRequest) => {
  const res = await authInstance.post(
    '/v3/shuttle-operation/reviews',
    silentParse(CreateReviewRequestSchema, body),
    {
      shape: {
        review: WriteReviewResponseSchema,
      },
    },
  );
  return res.review;
};

export const usePostReview = ({
  onSuccess,
}: {
  onSuccess?: (res: WriteReviewResponse) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postReview,
    onSuccess: async (res) => {
      await queryClient.invalidateQueries({ queryKey: ['user', 'review'] });
      toast.success('후기가 등록되었어요!');
      onSuccess?.(res);
    },
  });
};

// ----- PUT -----

export const putReview = async (body: EditReviewRequest) => {
  return await authInstance.put(
    `/v3/shuttle-operation/reviews`,
    silentParse(EditReviewRequestSchema, body),
  );
};

export const usePutReview = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: putReview,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user', 'review'] });
      toast.success('후기가 수정되었어요!');
      onSuccess?.();
    },
  });
};
