import Article from '@/components/article/Article';
import { getAnnouncements } from '@/services/core.service';
import dayjs from 'dayjs';
import Link from 'next/link';
import ChevronRightEm from 'public/icons/chevron-right-em.svg';

const AnnouncementPreview = async () => {
  const announcements = await getAnnouncements();

  return (
    <Article richTitle="공지사항" showMore="/mypage/announcements">
      <div className="flex flex-col">
        {announcements.slice(0, 3).map((v) => (
          <Link
            key={v.id}
            href={`/mypage/announcements/${v.id}`}
            className="flex w-auto items-center py-12"
          >
            <div className="w-dvw flex-1 overflow-hidden">
              <p className="truncate text-14 font-600 leading-[160%] text-basic-black">
                {v.title}
              </p>
              <p className="text-12 font-500 leading-[160%] text-basic-grey-500">
                {dayjs(v.createdAt).format('YYYY.MM.DD HH:mm')}
              </p>
            </div>
            <ChevronRightEm className="ml-auto h-24 w-24 stroke-[1] text-basic-grey-400" />
          </Link>
        ))}
      </div>
    </Article>
  );
};

export default AnnouncementPreview;
