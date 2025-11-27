import {
  UpdateMeRequest,
  UpdateMeRequestSchema,
  UsersViewEntitySchema,
  UserStatsReadModelSchema,
} from '@/types/user.type';
import { authInstance } from './config';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { silentParse } from '@/utils/config.util';
import { CustomError } from './custom-error';
import {
  removePendingPushToken,
  setPendingPushToken,
} from '@/utils/localStorage';
import { getIsAppFromUserAgent } from '@/utils/environment.util';
import * as Sentry from '@sentry/nextjs';

// ----- GET -----

export const getUser = async ({
  skipCheckOnboarding = false,
}: { skipCheckOnboarding?: boolean } = {}) => {
  const res = await authInstance.get('/v2/user-management/users/me', {
    shape: {
      user: UsersViewEntitySchema,
    },
    skipCheckOnboarding,
  });
  return res.user;
};

export const useGetUser = ({
  skipCheckOnboarding = false,
  enabled = true,
}: {
  skipCheckOnboarding?: boolean;
  enabled?: boolean;
} = {}) => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => getUser({ skipCheckOnboarding }),
    enabled,
  });
};

const getUserStats = async () => {
  const res = await authInstance.get('/v1/user-management/users/me/stats', {
    shape: {
      userStats: UserStatsReadModelSchema,
    },
  });
  return res.userStats;
};

export const useGetUserStats = () => {
  return useQuery({
    queryKey: ['user', 'stats'],
    queryFn: getUserStats,
  });
};

// ----- POST -----

export const putUser = async (
  body: UpdateMeRequest,
  options?: { skipCheckOnboarding?: boolean },
) => {
  return await authInstance.put(
    '/v1/user-management/users/me',
    silentParse(UpdateMeRequestSchema, body),
    options,
  );
};

export const usePutUser = ({
  onSuccess,
  onError,
  onSettled,
  options,
}: {
  onSuccess?: () => void;
  onError?: (e: CustomError) => void;
  onSettled?: () => void;
  options?: { skipCheckOnboarding?: boolean };
} = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateMeRequest) => putUser(body, options),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user', 'stats'] });
      onSuccess?.();
    },
    onError,
    onSettled,
  });
};

// 백엔드 서버에 푸시토큰 업데이트를 위한 함수
export const putUserPushToken = async (pushToken: string | null) => {
  const isApp = getIsAppFromUserAgent();
  if (!isApp) return;

  try {
    await putUser({ pushToken });
    removePendingPushToken();
  } catch (error) {
    console.error(error);
    setPendingPushToken(pushToken);
    Sentry.captureException(error, {
      tags: {
        function: 'putUserPushToken',
        action: 'failed-to-update-push-token',
        environment: process.env.NODE_ENV || 'development',
      },
    });
  }
};

export const deleteUser = async () => {
  await authInstance.delete('/v1/user-management/users/me');
};

export const useDeleteUser = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (e: CustomError) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user'] });
      onSuccess?.();
    },
    onError,
  });
};
