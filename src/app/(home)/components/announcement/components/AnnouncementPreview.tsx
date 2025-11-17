'use client';

import Article from '@/components/article/Article';
import dayjs from 'dayjs';
import Link from 'next/link';
import ArrowRightIcon from 'public/icons/arrow-right.svg';
import { AnnouncementResponseModel } from '@/types/announcement.type';

interface Props {
  announcements: AnnouncementResponseModel[];
}

const AnnouncementPreview = ({ announcements }: Props) => {
  const announcementsSorted = announcements?.sort((a, b) => {
    return dayjs(b.createdAt).diff(dayjs(a.createdAt));
  });

  return (
    <Article
      richTitle="공지사항"
      showMore="/announcements"
      className="h-300 px-16 pb-24 pt-32"
    >
      <div className="flex flex-col">
        {announcementsSorted?.slice(0, 3).map((v) => (
          <Link
            key={v.id}
            href={`/announcements/${v.id}`}
            className="flex w-auto items-center py-12"
          >
            <div className="w-dvw flex-1 overflow-hidden">
              <p className="truncate text-14 font-600 leading-[160%] text-basic-black">
                {v.title}
              </p>
              <p className="text-12 font-500 leading-[160%] text-basic-grey-500">
                {dayjs(v.createdAt).tz('Asia/Seoul').format('YYYY.MM.DD HH:mm')}
              </p>
            </div>
            <ArrowRightIcon className="ml-auto" />
          </Link>
        ))}
      </div>
    </Article>
  );
};

export default AnnouncementPreview;
