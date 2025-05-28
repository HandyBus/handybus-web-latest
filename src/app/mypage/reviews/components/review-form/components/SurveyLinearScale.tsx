import LinearScale from './LinearScale';

interface Props {
  title: string;
  description: string;
  value: number;
  onChange: (v: number) => void;
  errorMessage?: string;
}

const SurveyLinearScale = ({
  title,
  description,
  value,
  onChange,
  errorMessage,
}: Props) => {
  return (
    <div className="flex flex-col gap-16">
      <div>
        <h2 className="text-18 font-600 leading-[160%]">{title}</h2>
        <p className="text-14 font-500 leading-[160%] text-basic-grey-600">
          {description}
        </p>
        {errorMessage && (
          <p className="text-14 font-400 leading-[160%] text-basic-red-400">
            {errorMessage}
          </p>
        )}
      </div>
      <LinearScale value={value} onChange={onChange} />
    </div>
  );
};

export default SurveyLinearScale;
