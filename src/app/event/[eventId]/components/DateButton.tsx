'use client';

import { customTwMerge } from 'tailwind.config';
import CalendarIcon from '../icons/calendar.svg';

const PLACEHOLDER_TEXT = '언제 참가하시나요?';

const DateButton = () => {
  return (
    <button
      type="button"
      className="flex h-[78px] w-full flex-col gap-8 bg-basic-grey-50 p-12"
    >
      <div className="flex items-center gap-4 text-12 font-600 text-basic-grey-700">
        <CalendarIcon />
        <span>일자</span>
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

export default DateButton;
