import ThumbsUpIcon from '../icons/thumbs-up.svg';

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const RecommendOption = ({ checked, onChange }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-18 font-600 leading-[160%]">
        지인들에게 추천하시나요? (선택사항)
      </h2>
      <button
        className={`flex h-40 w-40 items-center justify-center rounded-full border-[1px] border-basic-grey-300 p-8 ${
          checked ? 'border-brand-primary-400' : 'border-basic-grey-300'
        }`}
        type="button"
        onClick={() => onChange(!checked)}
      >
        <ThumbsUpIcon
          className={`h-24 w-24 ${
            checked
              ? 'fill-brand-primary-400 text-brand-primary-400'
              : 'fill-basic-grey-300 text-basic-grey-300'
          }`}
        />
      </button>
    </div>
  );
};

export default RecommendOption;
