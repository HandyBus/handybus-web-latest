'use client';

interface Props {
  numerator: number;
  denominator: number;
}
const ProgressBar = ({ numerator, denominator }: Props) => {
  return (
    <section className="flex flex-col gap-12 px-16 py-28">
      <h2 className="justify-center text-18 font-700 leading-[25.2px] text-grey-800">
        노선 선택 ({numerator} / {denominator})
      </h2>
      <div className="relative h-[6px] w-full rounded-[4px] bg-grey-100">
        <div
          className="absolute inset-0 rounded-[4px] bg-grey-600-sub transition-all duration-300"
          style={{ width: `${(numerator / denominator) * 100}%` }}
        />
      </div>
    </section>
  );
};

export default ProgressBar;
