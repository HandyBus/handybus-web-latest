'use client';

import { useGetAnnouncements } from '@/services/core.service';
import AnnouncementItem from './AnnouncementItem';
import LoadingCircle from 'public/icons/loading-circle.svg';

export const READ_NOTICE_LIST_KEY = 'readNoticeList';

export const getReadNoticeList = () => {
  if (typeof window === 'undefined') return [];
  const list = localStorage.getItem(READ_NOTICE_LIST_KEY);
  return list ? JSON.parse(list) : [];
};

const AnnouncementList = () => {
  const { data: announcements, isLoading } = useGetAnnouncements();

  return (
    <div className="px-16">
      <h1 className="pb-24 pt-12 text-22 font-700 leading-[140%]">공지사항</h1>
      {isLoading ? (
        <div className="flex w-full items-center justify-center">
          <LoadingCircle className=" animate-spin" />
        </div>
      ) : (
        announcements?.map((announcement, idx) => (
          <AnnouncementItem
            key={idx}
            announcementId={announcement.id}
            title={announcement.title}
            date={announcement.createdAt}
            read={getReadNoticeList().includes(String(announcement.id))}
            href={`/mypage/announcements/${announcement.id}`}
          />
        ))
      )}
    </div>
  );
};

export default AnnouncementList;
