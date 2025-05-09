import Link from 'next/link';
import ChevronRight from '/public/icons/chevron-right.svg';
import dayjs from 'dayjs';

interface Props {
  announcementId: string;
  title: string;
  date: string;
  read: boolean;
  href: string;
}

const AnnouncementItem = ({ title, date, read, href }: Props) => (
  <Link
    href={href}
    className={`flex justify-between gap-[9px] py-12 group-hover:cursor-pointer`}
  >
    <div className="flex w-dvw flex-col overflow-hidden">
      <span
        className={`truncate text-14 font-600 leading-[160%] ${read ? 'text-basic-grey-600' : 'text-basic-black'}`}
      >
        {title}
      </span>
      <span className="text-12 font-500 leading-[160%] text-basic-grey-500">
        {dayjs(date).format('YYYY.MM.DD HH:mm')}
      </span>
    </div>
    <ChevronRight className="stroke-[1.5] text-basic-grey-400" />
  </Link>
);

export default AnnouncementItem;
