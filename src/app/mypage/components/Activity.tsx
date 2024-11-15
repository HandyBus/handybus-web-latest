import Link from 'next/link';

const Activity = () => {
  return (
    <section className="m-16 flex h-[94px] rounded-[12px] bg-grey-50 py-16">
      <BoxButton
        number={1}
        title="예약 내역"
        href="/mypage/shuttle?type=current"
      />
      <Divider />
      <BoxButton
        number={1}
        title="수요 신청 현황"
        href="/mypage/shuttle?type=demand"
      />
      <Divider />
      <BoxButton
        number={1}
        title="지난 콘서트"
        href="/mypage/shuttle?type=past"
      />
    </section>
  );
};

export default Activity;

interface BoxButtonProps {
  number: number;
  title: string;
  href: string;
}

const BoxButton = ({ number, title, href }: BoxButtonProps) => {
  return (
    <Link href={href} className="flex grow flex-col items-center gap-8">
      <span className="text-22 font-500 text-grey-900">{number}</span>
      <span className="text-12 font-400 text-grey-800">{title}</span>
    </Link>
  );
};

const Divider = () => {
  return <div className="h-full w-[1px] rounded-full bg-grey-100" />;
};
