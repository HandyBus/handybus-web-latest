'use client';

import { ReactNode } from 'react';
import BackIcon from '../icons/arrow-left.svg';

interface Props {
  onBack: () => void;
  title: ReactNode;
  description?: ReactNode;
}

const Header = ({ onBack, title, description }: Props) => {
  return (
    <header className="shrink-0 px-16 py-24">
      <div className="flex items-center gap-4">
        <button type="button" className="shrink-0" onClick={onBack}>
          <BackIcon />
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
