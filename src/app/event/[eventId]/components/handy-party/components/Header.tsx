'use client';

import { ReactNode } from 'react';
import BackIcon from '../icons/arrow-left.svg';
import CloseIcon from '../icons/close.svg';
import { useIsApp } from '@/hooks/useEnvironment';

interface Props {
  onBack: () => void;
  title: ReactNode;
  description?: ReactNode;
  displayCloseButton?: boolean;
}

const Header = ({
  onBack,
  title,
  description,
  displayCloseButton = false,
}: Props) => {
  const isApp = useIsApp();
  const headerStyle = isApp
    ? {
        paddingTop: 'var(--safe-area-inset-top)',
        height: 'calc(56px + var(--safe-area-inset-top))',
      }
    : {};

  return (
    <header className="shrink-0 px-24 pt-16" style={headerStyle}>
      <div
        className={`flex items-center ${displayCloseButton ? 'gap-[6px]' : 'gap-4'}`}
      >
        <button type="button" className="shrink-0" onClick={onBack}>
          {displayCloseButton ? <CloseIcon /> : <BackIcon />}
        </button>
        <h2 className="text-20 font-700 leading-[160%]">{title}</h2>
      </div>
      {description && (
        <p className="text-16 font-500 leading-[160%] text-basic-grey-600">
          {description}
        </p>
      )}
    </header>
  );
};

export default Header;
