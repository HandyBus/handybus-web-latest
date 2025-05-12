import Link from 'next/link';
import { ReactNode } from 'react';
import CalendarIcon from '../icons/calendar.svg';
import ListIcon from '../icons/list.svg';
import ReviewIcon from '../icons/review.svg';

const Activity = () => {
  return (
    <section className="mx-16 mb-32 flex h-96 items-center rounded-6 bg-basic-grey-50">
      <BoxButton
        title="수요조사 내역"
        icon={<ListIcon />}
        href="/mypage/shuttle?type=demand"
      />
      <Divider />
      <BoxButton
        title="예약 내역"
        icon={<CalendarIcon />}
        href="/mypage/shuttle?type=reservation"
      />
      <Divider />
      <BoxButton title="후기" icon={<ReviewIcon />} href="/mypage/reviews" />
    </section>
  );
};

export default Activity;

interface BoxButtonProps {
  title: string;
  icon: ReactNode;
  href: string;
}

const BoxButton = ({ title, icon, href }: BoxButtonProps) => {
  return (
    <Link
      href={href}
      className="flex flex-1 flex-col items-center justify-center gap-[6px]"
    >
      {icon}
      <span className="text-14 font-500">{title}</span>
    </Link>
  );
};

const Divider = () => {
  return <div className="h-40 w-[1px] bg-basic-grey-200" />;
};
