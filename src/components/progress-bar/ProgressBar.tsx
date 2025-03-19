interface Props {
  numerator: number;
  denominator: number;
  title: string;
}

const ProgressBar = ({ numerator, denominator, title }: Props) => {
  return (
    <section className="flex flex-col gap-12 px-16 pt-8">
      <h2 className="text-basic-grey-600 flex items-center justify-center gap-4 text-18 font-700">
        <div className="w-24" />
        {title}
        <div className="w-24 text-12 font-400">
          ({numerator}/{denominator})
        </div>
      </h2>
      <div className="bg-basic-grey-100 relative h-[6px] w-full rounded-[4px]">
        <div
          className="bg-basic-grey-600 absolute inset-0 rounded-[4px] transition-all duration-300"
          style={{ width: `${(numerator / denominator) * 100}%` }}
        />
      </div>
    </section>
  );
};

export default ProgressBar;
