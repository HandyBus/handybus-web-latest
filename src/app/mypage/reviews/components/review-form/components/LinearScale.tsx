interface Props {
  value: number;
  onChange: (v: number) => void;
}

const LinearScale = ({ value, onChange }: Props) => {
  return (
    <div className="flex flex-col items-stretch gap-8">
      <div className="px-2 relative flex items-center justify-between">
        {Array.from({ length: 5 }).map((_, idx) => (
          <label
            key={idx}
            className="relative flex flex-1 cursor-pointer flex-col items-center"
          >
            <input
              type="radio"
              name="linear-scale"
              value={idx + 1}
              checked={value === idx + 1}
              onChange={() => onChange(idx + 1)}
              className="sr-only z-10"
            />
            <span
              className={`
                bg-white flex h-24 w-24
                items-center justify-center
                rounded-full border-2 ${
                  value ? 'border-brand-primary-400' : 'border-basic-grey-300'
                } z-10 bg-basic-white transition-colors 
              `}
            >
              {value === idx + 1 && (
                <span className="block h-12 w-12 rounded-full bg-brand-primary-400" />
              )}
            </span>
            {idx < 4 && (
              <span
                className={`
                  absolute right-0 top-1/2 z-0 h-[2px] w-full -translate-y-1/2
                  ${value ? 'bg-brand-primary-400' : 'bg-basic-grey-300'} left-[60%] h-[2px] w-[80%]
                `}
              />
            )}
          </label>
        ))}
      </div>
      <div className="px-2 flex justify-between">
        {SCALE_LABELS.map((label, idx) => (
          <span
            key={idx}
            className={`
              text-14 font-500 leading-[160%] 
              ${idx === 4 && 'pr-12'}
              ${
                idx === 4 && value
                  ? 'text-brand-primary-400'
                  : 'text-basic-grey-400'
              }`}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LinearScale;

const SCALE_LABELS = ['매우 불만족', '', '보통', '', '매우 만족'];
