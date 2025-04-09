import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClick?: () => void;
  isSelected?: boolean;
}

const Chip = ({ children, onClick, isSelected }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center whitespace-nowrap break-keep rounded-[28px] px-12 py-8 text-14 font-600 leading-[160%] ${
        isSelected
          ? 'bg-brand-primary-400 text-basic-white active:bg-brand-primary-500'
          : 'bg-basic-grey-100 text-basic-grey-700 active:bg-basic-grey-200'
      }`}
    >
      {children}
    </button>
  );
};

export default Chip;
