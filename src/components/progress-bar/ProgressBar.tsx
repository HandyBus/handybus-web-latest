interface Props {
  numerator: number;
  denominator: number;
  title: string;
}

const ProgressBar = ({ numerator, denominator, title }: Props) => {
  return (
    <section className="flex flex-col gap-12 px-16 pt-8">
      <h2 className="flex items-center justify-center gap-4 text-18 font-700 text-basic-grey-600">
        <div className="w-24" />
        {title}
        <div className="w-24 text-12 font-400">
          ({numerator}/{denominator})
        </div>
      </h2>
      <div className="relative h-[6px] w-full rounded-4 bg-basic-grey-100">
        <div
          className="absolute inset-0 rounded-4 bg-basic-grey-600 transition-all duration-300"
          style={{ width: `${(numerator / denominator) * 100}%` }}
        />
      </div>
    </section>
  );
};

export default ProgressBar;
