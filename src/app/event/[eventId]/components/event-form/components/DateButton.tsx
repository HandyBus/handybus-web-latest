'use client';

import { dateString } from '@/utils/dateString.util';
import CalendarIcon from '../../../icons/calendar.svg';
import { useAtomValue } from 'jotai';
import { selectedHubWithInfoForDetailViewAtom } from '../../../store/selectedHubWithInfoForDetailViewAtom';

interface Props {
  disabled?: boolean;
  onClick: () => void;
}

const DateButton = ({ disabled = true, onClick }: Props) => {
  const selectedHubWithInfoForDetailView = useAtomValue(
    selectedHubWithInfoForDetailViewAtom,
  );

  const formattedDateString = selectedHubWithInfoForDetailView
    ? dateString(selectedHubWithInfoForDetailView.dailyEvent.date)
    : PLACEHOLDER_TEXT;
  const isTextPlaceholder = !selectedHubWithInfoForDetailView;

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
        <CalendarIcon />
        <span>일자</span>
      </div>
      <p
        className={`h-[26px] text-left text-16 font-600 leading-[160%] ${
          disabled
            ? 'text-basic-grey-300'
            : isTextPlaceholder
              ? 'text-basic-grey-500'
              : 'text-basic-grey-700'
        }`}
      >
        {formattedDateString}
      </p>
    </button>
  );
};

export default DateButton;

const PLACEHOLDER_TEXT = '언제 참가하시나요?';
