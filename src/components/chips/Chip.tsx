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
      className={`inline-flex h-32 items-center justify-center whitespace-nowrap break-keep rounded-[28px] px-12 text-14 font-600 leading-[160%] ${
        isSelected
          ? 'bg-basic-black text-basic-white'
          : 'bg-basic-grey-100 text-basic-grey-700'
      }`}
    >
      {children}
    </button>
  );
};

export default Chip;
