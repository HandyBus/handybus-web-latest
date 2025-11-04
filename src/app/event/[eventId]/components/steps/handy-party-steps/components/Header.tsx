'use client';

import { ReactNode } from 'react';
import BackIcon from '../icons/arrow-left.svg';
import CloseIcon from '../icons/close.svg';

interface Props {
  title: ReactNode;
  description?: ReactNode;
  variant: 'address' | 'reservation-info';
  onBack?: () => void;
  closeModal: () => void;
}

const Header = ({ title, description, variant, onBack, closeModal }: Props) => {
  const headerStyle = {
    paddingTop: 'calc(16px + var(--safe-area-inset-top))',
    height: 'calc(52px + var(--safe-area-inset-top))',
  };

  return (
    <header className="shrink-0 px-24" style={headerStyle}>
      <div className="flex items-center justify-between">
        <div
          className={`flex items-center ${variant === 'address' ? 'gap-[6px]' : 'gap-4'}`}
        >
          <button
            type="button"
            className="shrink-0"
            onClick={variant === 'address' ? closeModal : onBack}
          >
            {variant === 'address' ? <CloseIcon /> : <BackIcon />}
          </button>
          <h2 className="text-20 font-700 leading-[160%]">{title}</h2>
        </div>
        {variant === 'reservation-info' && (
          <button type="button" className="shrink-0" onClick={closeModal}>
            <CloseIcon />
          </button>
        )}
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
