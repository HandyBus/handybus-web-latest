'use client';

import BackIcon from 'public/icons/chevron-left.svg';

interface Props {
  handleBack: () => void;
}

const AppBar = ({ handleBack }: Props) => {
  return (
    <div className="flex h-44 w-full items-center px-16 py-12">
      <button type="button" onClick={handleBack}>
        <BackIcon />
      </button>
      <h1 className="ml-8 text-14 font-600 text-grey-500">회원가입</h1>
    </div>
  );
};

export default AppBar;
