'use client';

import type { PropsWithChildren } from 'react';
import { useRouter } from 'next/navigation';
import BackIcon from 'public/icons/chevron-left.svg';

const AppBar = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex h-44 w-full items-center px-16 py-12">
      <button onClick={handleBack}>
        <BackIcon />
      </button>
      <h1 className="ml-8 text-14 font-600 text-grey-500">{children}</h1>
    </div>
  );
};

export default AppBar;
