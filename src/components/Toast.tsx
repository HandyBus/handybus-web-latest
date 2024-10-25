import type { PropsWithChildren } from 'react';

import HandyDescCheckIcon from '@/icons/handy-desc-check.svg';

const Toast = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-row items-center gap-[10px] rounded-lg bg-primary-800 px-16">
      <span className={`text-20 text-white`}>
        <HandyDescCheckIcon />
      </span>
      <span className="my-12 text-white">{children}</span>
    </div>
  );
};

export default Toast;
