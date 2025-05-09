'use client';

import { useEffect, useState } from 'react';
import { useGetAnnouncements } from '@/services/core.service';
import AnnouncementItem from './AnnouncementItem';

export const READ_NOTICE_LIST_KEY = 'readNoticeList';

export const getReadNoticeList = () => {
  if (typeof window === 'undefined') return [];
  const list = localStorage.getItem(READ_NOTICE_LIST_KEY);
  return list ? JSON.parse(list) : [];
};

const AnnouncementList = () => {
  const { data: announcements } = useGetAnnouncements();
  const [readNoticeList, setReadNoticeList] = useState<string[]>([]);

  useEffect(() => {
    setReadNoticeList(getReadNoticeList());
  }, []);

  return (
    <div className="px-16">
      <h1 className="pb-24 pt-12 text-22 font-700 leading-[140%]">공지사항</h1>
      {announcements?.map((announcement, idx) => (
        <AnnouncementItem
          key={idx}
          announcementId={announcement.id}
          title={announcement.title}
          date={announcement.createdAt}
          read={readNoticeList.includes(String(announcement.id))}
          href={`/mypage/announcements/${announcement.id}`}
        />
      ))}
    </div>
  );
};

export default AnnouncementList;
