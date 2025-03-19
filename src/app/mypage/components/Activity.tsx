import Link from 'next/link';

interface Props {
  reservationCount: number;
  pastReservationCount: number;
  shuttleDemandCount: number;
}

const Activity = ({
  reservationCount,
  pastReservationCount,
  shuttleDemandCount,
}: Props) => {
  return (
    <section className="bg-basic-grey-50 m-16 flex h-[94px] rounded-[12px] py-16">
      <BoxButton
        number={reservationCount}
        title="예약 현황"
        href="/mypage/shuttle?type=current"
      />
      <Divider />
      <BoxButton
        number={shuttleDemandCount}
        title="수요조사 현황"
        href="/mypage/shuttle?type=demand"
      />
      <Divider />
      <BoxButton
        number={pastReservationCount}
        title="지난 예약"
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
      <span className="text-basic-grey-700 text-22 font-500">{number}</span>
      <span className="text-basic-grey-700 text-12 font-400">{title}</span>
    </Link>
  );
};

const Divider = () => {
  return <div className="bg-basic-grey-100 h-full w-[1px] rounded-full" />;
};
