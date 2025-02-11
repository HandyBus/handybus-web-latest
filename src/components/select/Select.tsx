'use client';

import BottomSheet from '@/components/bottom-sheet/BottomSheet';
import useBottomSheet from '@/hooks/useBottomSheet';
import ChevronEnabledIcon from 'public/icons/chevron-enabled.svg';
import ChevronDisabledIcon from 'public/icons/chevron-disabled.svg';
import { ReactNode } from 'react';

interface Props<T> {
  options: readonly T[];
  value: T | undefined;
  setValue: (value: T) => void;
  renderValue?: (value: T) => ReactNode;
  placeholder?: string;
  disabled?: boolean;
  bottomSheetTitle?: string;
  isUnderLined?: boolean;
  defaultText?: string;
}

const Select = <T,>({
  options,
  value,
  setValue,
  renderValue,
  placeholder,
  disabled,
  bottomSheetTitle,
  isUnderLined,
  defaultText,
}: Props<T>) => {
  const { bottomSheetRef, contentRef, openBottomSheet, closeBottomSheet } =
    useBottomSheet();

  return (
    <>
      <button
        onClick={openBottomSheet}
        type="button"
        disabled={disabled}
        className={`relative w-full p-12 pr-32 text-left ${value ? 'text-grey-800' : 'text-grey-300'} ${isUnderLined ? 'border-b border-grey-100' : ''}`}
      >
        {value
          ? renderValue
            ? renderValue(value)
            : String(value)
          : placeholder}
        <div className="absolute right-12 top-16">
          {disabled ? <ChevronDisabledIcon /> : <ChevronEnabledIcon />}
        </div>
      </button>
      <BottomSheet ref={bottomSheetRef} title={bottomSheetTitle}>
        <div
          ref={contentRef}
          className="flex h-full w-full flex-col overflow-y-auto bg-white"
        >
          {options?.length === 0 ? (
            <div className="py-16 text-left text-16 font-400 text-grey-400">
              {defaultText}
            </div>
          ) : (
            options?.map((option, index) => (
              <button
                key={index}
                className="py-16 text-left"
                type="button"
                onClick={() => {
                  setValue(option);
                  closeBottomSheet();
                }}
              >
                {renderValue ? renderValue(option) : String(option)}
              </button>
            ))
          )}
        </div>
      </BottomSheet>
    </>
  );
};

export default Select;
