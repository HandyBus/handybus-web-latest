import LinearScale from './LinearScale';

interface Props {
  title: string;
  description: string;
  value: number;
  onChange: (v: number) => void;
}

const SurveyLinearScale = ({ title, description, value, onChange }: Props) => {
  return (
    <div className="flex flex-col gap-16">
      <div>
        <h2 className="text-18 font-600 leading-[160%]">{title}</h2>
        <p className="text-14 font-500 leading-[160%] text-basic-grey-600">
          {description}
        </p>
      </div>
      <LinearScale value={value} onChange={onChange} />
    </div>
  );
};

export default SurveyLinearScale;
