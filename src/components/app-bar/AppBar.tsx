'use client';

import type { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import BackIcon from 'public/icons/chevron-left.svg';

interface Props {
  children: ReactNode;
  handleBack?: () => void;
}

const AppBar = ({ children, handleBack }: Props) => {
  const router = useRouter();
  const handleClick = () => {
    if (handleBack) {
      handleBack();
      return;
    }
    router.back();
  };

  return (
    <div className="h-44 w-full px-16 py-12">
      <button onClick={handleClick} type="button" className="flex items-center">
        <BackIcon />
        <h1 className="ml-8 text-14 font-600 text-grey-500">{children}</h1>
      </button>
    </div>
  );
};

export default AppBar;
