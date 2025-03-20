'use client';

import BottomSheet from '@/components/bottom-sheet/BottomSheet';
import useBottomSheet from '@/hooks/useBottomSheet';
import ChevronEnabledIcon from 'public/icons/chevron-enabled.svg';
import ChevronDisabledIcon from 'public/icons/chevron-disabled.svg';

interface Props<T> {
  options: readonly { label: string; value: T }[];
  value: { label: string; value: T } | undefined;
  setValue: (value: { label: string; value: T }) => void;
  placeholder?: string;
  disabled?: boolean;
  bottomSheetTitle?: string;
  isUnderLined?: boolean;
}

const SelectLabeled = <T extends string | number>({
  options,
  value,
  setValue,
  placeholder,
  disabled,
  bottomSheetTitle,
  isUnderLined,
}: Props<T>) => {
  const { bottomSheetRef, contentRef, openBottomSheet, closeBottomSheet } =
    useBottomSheet();

  return (
    <>
      <button
        onClick={openBottomSheet}
        type="button"
        disabled={disabled}
        className={`relative w-full p-12 pr-32 text-left ${value?.label ? 'text-basic-grey-700' : 'text-basic-grey-300'} ${isUnderLined ? 'border-basic-grey-100 border-b' : ''}`}
      >
        {value?.label || placeholder}
        <div className="absolute right-12 top-16">
          {disabled ? <ChevronDisabledIcon /> : <ChevronEnabledIcon />}
        </div>
      </button>
      <BottomSheet ref={bottomSheetRef} title={bottomSheetTitle}>
        <div
          ref={contentRef}
          className="flex h-full w-full flex-col overflow-y-auto bg-basic-white"
        >
          {options?.map((option) => (
            <button
              key={option.value}
              className="py-16 text-left"
              type="button"
              onClick={() => {
                setValue(option);
                closeBottomSheet();
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      </BottomSheet>
    </>
  );
};

export default SelectLabeled;
