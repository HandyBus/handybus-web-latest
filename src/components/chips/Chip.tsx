import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClick?: () => void;
}

const Chip = ({ children, onClick }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-32 items-center justify-center whitespace-nowrap break-keep rounded-full bg-brand-grey-100 px-16 text-16 font-600 text-brand-grey-700 active:bg-brand-grey-200"
    >
      {children}
    </button>
  );
};

export default Chip;
