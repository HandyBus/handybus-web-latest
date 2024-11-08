const Activity = () => {
  return (
    <section className="m-16 flex h-[94px] rounded-[12px] bg-grey-50 py-16">
      <BoxButton number={1} title="예약 내역" />
      <Divider />
      <BoxButton number={1} title="수요 신청 현황" />
      <Divider />
      <BoxButton number={1} title="지난 콘서트" />
    </section>
  );
};

export default Activity;

interface BoxButtonProps {
  number: number;
  title: string;
}

const BoxButton = ({ number, title }: BoxButtonProps) => {
  return (
    <button className="flex grow flex-col items-center gap-8">
      <span className="text-22 font-500 text-grey-900">{number}</span>
      <span className="text-12 font-400 text-grey-800">{title}</span>
    </button>
  );
};

const Divider = () => {
  return <div className="h-full w-[1px] rounded-full bg-grey-100" />;
};
