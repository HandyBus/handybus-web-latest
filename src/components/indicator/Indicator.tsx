interface Props {
  variant?: 'primary' | 'secondary';
  value: number;
  max: number;
}

const Indicator = ({ variant = 'primary', value, max }: Props) => {
  return (
    <div className="flex flex-row gap-[6px]">
      {Array.from({ length: max }, (_, index) => (
        <span
          key={index}
          className={`min-h-[6px] rounded-full
            ${index + 1 === value ? (variant === 'primary' ? 'min-w-[14px] bg-primary-main' : 'min-w-[14px] bg-black') : 'min-w-[6px] bg-grey-100'}
            `}
        />
      ))}
    </div>
  );
};

export default Indicator;
