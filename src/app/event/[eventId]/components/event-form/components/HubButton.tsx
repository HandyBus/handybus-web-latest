'use client';

import { useAtomValue } from 'jotai';
import PinIcon from '../../../icons/pin.svg';
import { selectedHubWithInfoForDetailViewAtom } from '../../../store/selectedHubWithInfoForDetailViewAtom';

interface Props {
  disabled?: boolean;
  onClick: () => void;
}

const HubButton = ({ disabled = true, onClick }: Props) => {
  const selectedHubWithInfoForDetailView = useAtomValue(
    selectedHubWithInfoForDetailViewAtom,
  );

  const formattedHubName = selectedHubWithInfoForDetailView
    ? selectedHubWithInfoForDetailView.hubWithInfo.name
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
        <PinIcon />
        <span>정류장</span>
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
        {formattedHubName}
      </p>
    </button>
  );
};

export default HubButton;

const PLACEHOLDER_TEXT = '어디서 이용하시나요?';
