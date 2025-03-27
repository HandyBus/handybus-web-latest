'use client';

import { customTwMerge } from 'tailwind.config';
import PinIcon from '../icons/pin.svg';

const PLACEHOLDER_TEXT = '이용하실 정류장을 선택하세요.';

const HubButton = () => {
  return (
    <button
      type="button"
      className="flex h-[78px] w-full flex-col gap-8 bg-basic-grey-50 p-12"
    >
      <div className="flex items-center gap-4 text-12 font-600 text-basic-grey-700">
        <PinIcon />
        <span>정류장</span>
      </div>
      <p
        className={customTwMerge(
          'h-[26px] text-left text-16 font-600 leading-[160%] text-basic-grey-500',
          '',
        )}
      >
        {PLACEHOLDER_TEXT}
      </p>
    </button>
  );
};

export default HubButton;
