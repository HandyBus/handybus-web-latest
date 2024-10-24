import type { PropsWithChildren } from 'react';

import HandyDescCheckIcon from '@/icons/handy-desc-check.svg';

interface Props extends PropsWithChildren {
  disabled?: boolean;
}

const HandyDescCheck = ({ disabled, children }: Props) => {
  return (
    <div className="flex flex-row items-center gap-[10px] rounded-lg bg-grey-50 px-16">
      <span
        className={`text-20 ${disabled ? 'text-grey-600-sub' : 'text-primary-main'}`}
      >
        <HandyDescCheckIcon />
      </span>
      <span className="my-12 text-grey-700">{children}</span>
    </div>
  );
};

export default HandyDescCheck;
