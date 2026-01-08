'use client';

import { useGetAnnouncementsWithPagination } from '@/services/core.service';
import AnnouncementItem from './AnnouncementItem';
import LoadingCircle from 'public/icons/loading-circle.svg';
import dayjs from 'dayjs';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { AnnouncementResponseModel } from '@/types/announcement.type';
import { DEFAULT_PAGINATION_LIMIT } from '@/constants/common';

export const READ_NOTICE_LIST_KEY = 'readNoticeList';

export const getReadNoticeList = () => {
  if (typeof window === 'undefined') return [];
  const list = localStorage.getItem(READ_NOTICE_LIST_KEY);
  return list ? JSON.parse(list) : [];
};

const AnnouncementList = () => {
  const {
    data: announcementPages,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useGetAnnouncementsWithPagination({
    limit: DEFAULT_PAGINATION_LIMIT,
  });

  const announcementsSorted = announcementPages?.pages
    .flatMap((page) => page.announcements)
    .sort((a, b) => {
      return dayjs(b.createdAt).diff(dayjs(a.createdAt));
    });

  const ref = useInfiniteScroll(fetchNextPage);

  return (
    <div className="px-16">
      {isLoading ? (
        <div className="flex w-full items-center justify-center">
          <LoadingCircle className=" animate-spin" />
        </div>
      ) : (
        announcementsSorted?.map(
          (announcement: AnnouncementResponseModel, idx: number) => (
            <AnnouncementItem
              key={idx}
              announcementId={announcement.id}
              title={announcement.title}
              date={announcement.createdAt}
              read={getReadNoticeList().includes(String(announcement.id))}
              href={`/announcements/${announcement.id}`}
            />
          ),
        )
      )}
      {!isLoading && hasNextPage && (
        <div ref={ref} className="flex flex-col items-center py-28" />
      )}
    </div>
  );
};

export default AnnouncementList;
