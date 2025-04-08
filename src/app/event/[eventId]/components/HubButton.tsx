'use client';

import PinIcon from '../icons/pin.svg';

interface Props {
  disabled?: boolean;
  onClick?: () => void;
}

const HubButton = ({ disabled = true, onClick }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-[78px] w-full flex-col gap-8 rounded-8 bg-basic-grey-50 p-12"
    >
      <div
        className={`flex items-center gap-4 text-12 font-600 ${
          disabled ? 'text-basic-grey-300' : 'text-basic-grey-700'
        }`}
      >
        <PinIcon />
        <span>정류장</span>
      </div>
      <p
        className={`h-[26px] text-left text-16 font-600 leading-[160%] ${
          disabled ? 'text-basic-grey-300' : 'text-basic-grey-500'
        }`}
      >
        {PLACEHOLDER_TEXT}
      </p>
    </button>
  );
};

export default HubButton;

const PLACEHOLDER_TEXT = '이용하실 정류장을 선택하세요.';
