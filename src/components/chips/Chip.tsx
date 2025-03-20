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
      className="bg-basic-grey-100 text-basic-grey-700 active:bg-basic-grey-200 flex h-32 items-center justify-center whitespace-nowrap break-keep rounded-full px-16 text-16 font-600"
    >
      {children}
    </button>
  );
};

export default Chip;
