import { z } from 'zod';
import { authInstance, instance } from './config';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { AdminHandleBannerRequestBannersSchema } from '@/types/banner.type';
import { AnnouncementResponseModelSchema } from '@/types/announcement.type';
import { PaginationParams, withPagination } from '@/types/common.type';
import { toSearchParams } from '@/utils/searchParams.util';

type KeyType = 'concerts' | 'users/profiles' | 'reviews';
type ExtensionType = 'jpg' | 'jpeg' | 'png' | 'webp' | 'svg' | 'gif';

const getPresignedUrl = async (key: KeyType, extension: ExtensionType) => {
  const params = new URLSearchParams({ key, extension });
  const res = await authInstance.get(`/v1/core/image/presigned-url?${params}`, {
    cache: 'no-store',
    shape: {
      presignedUrl: z.string(),
      cdnUrl: z.string(),
    },
  });
  return res;
};

const uploadImageToS3 = async (url: string, file: File) => {
  const imageFormData = new FormData();
  imageFormData.append('file', file);
  const buffer = await file.arrayBuffer();

  await fetch(url, {
    method: 'PUT',
    cache: 'no-store',
    body: file,
    headers: {
      'Content-Type': file.type,
      'Content-Length': String(buffer.byteLength),
    },
  });
};

export const getImageUrl = async ({
  key,
  file,
}: {
  key: KeyType;
  file: File | null;
}) => {
  if (!file) {
    return;
  }
  let extension = file.type.split('/').pop();
  if (extension === 'svg+xml') {
    extension = 'svg';
  }

  const urls = await getPresignedUrl(key, extension as ExtensionType);
  await uploadImageToS3(urls.presignedUrl, file);
  return urls.cdnUrl;
};

// ----- Banner -----

export const getBanners = async (options?: { revalidate?: number }) => {
  const res = await instance.get('/v1/core/banners', {
    next: { revalidate: options?.revalidate },
    shape: {
      banners: AdminHandleBannerRequestBannersSchema.array(),
    },
  });
  return res.banners;
};

export const useGetBanners = (options?: { revalidate?: number }) =>
  useQuery({
    queryKey: ['banners'],
    queryFn: () => getBanners(options),
  });

// ----- Announcement -----

export const getAnnouncements = async (params?: PaginationParams<unknown>) => {
  const searchParams = toSearchParams(params);
  const res = await instance.get(
    `/v1/core/announcements?${searchParams.toString()}`,
    {
      shape: withPagination({
        announcements: AnnouncementResponseModelSchema.array(),
      }),
    },
  );
  return res;
};

export const useGetAnnouncementsWithPagination = (
  params?: PaginationParams<unknown>,
) =>
  useInfiniteQuery({
    queryKey: ['announcements', params],
    queryFn: ({ pageParam }: { pageParam: string | undefined }) =>
      getAnnouncements({ ...params, page: pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage;
    },
  });

export const getAnnouncement = async (announcementId: string) => {
  const res = await instance.get(`/v1/core/announcements/${announcementId}`, {
    shape: {
      announcement: AnnouncementResponseModelSchema,
    },
  });
  return res.announcement;
};

export const useGetAnnouncement = (announcementId: string) =>
  useQuery({
    queryKey: ['announcement', announcementId],
    queryFn: () => getAnnouncement(announcementId),
  });

// ----- Feedback -----

export const postFeedback = async (body: {
  subject: string;
  content: string;
}) => {
  const res = await authInstance.post('/v1/core/feedbacks', body);
  return res;
};

export const usePostFeedback = () =>
  useMutation({
    mutationFn: (body: { subject: string; content: string }) =>
      postFeedback(body),
  });
