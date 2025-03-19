'use client';

import BottomSheet from '@/components/bottom-sheet/BottomSheet';
import useBottomSheet from '@/hooks/useBottomSheet';
import ChevronEnabledIcon from 'public/icons/chevron-enabled.svg';
import ChevronDisabledIcon from 'public/icons/chevron-disabled.svg';
import { ReactNode, useMemo } from 'react';

interface Props<T> {
  options: readonly T[];
  value: T | undefined;
  setValue: (value: T) => void;
  renderValue?: (value: T) => ReactNode;
  placeholder?: string;
  disabled?: boolean;
  bottomSheetTitle?: string;
  bottomSheetDescription?: string;
  bottomSheetOnBack?: () => void;
  isUnderLined?: boolean;
  defaultText?: string;
  sort?: boolean;
  sortBy?: (a: T, b: T) => number;
  disableOption?: (value: T) => boolean;
  extraContent?: ReactNode;
}

const Select = <T,>({
  options,
  value,
  setValue,
  renderValue,
  placeholder,
  disabled,
  bottomSheetTitle,
  bottomSheetDescription,
  bottomSheetOnBack,
  isUnderLined,
  defaultText,
  sort = false,
  sortBy,
  disableOption,
  extraContent,
}: Props<T>) => {
  const { bottomSheetRef, contentRef, openBottomSheet, closeBottomSheet } =
    useBottomSheet();

  // 옵션들을 sort 함수 기반으로 정렬. 이때 disabled 된 옵션들은 뒤로 모아짐.
  const sortedOptions = useMemo(() => {
    if (!sort) {
      return options;
    }

    return [...options].sort((a, b) => {
      const isADisabled = disableOption?.(a) ?? false;
      const isBDisabled = disableOption?.(b) ?? false;

      if (isADisabled === isBDisabled) {
        return sortBy?.(a, b) ?? 0;
      }

      return isADisabled ? 1 : -1;
    }) as T[];
  }, [options, sort, sortBy, disableOption]);

  return (
    <>
      <button
        onClick={openBottomSheet}
        type="button"
        disabled={disabled}
        className={`is-selected group relative w-full p-12 pr-32 text-left font-400 ${value ? 'text-basic-grey-700' : 'text-basic-grey-300'} ${isUnderLined ? 'border-b border-basic-grey-100' : ''}`}
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
      <BottomSheet
        ref={bottomSheetRef}
        title={bottomSheetTitle}
        description={bottomSheetDescription}
        onBack={bottomSheetOnBack}
      >
        <div
          ref={contentRef}
          className="relative h-full w-full overflow-y-auto overflow-x-hidden bg-basic-white"
        >
          <section className="flex flex-col">
            {sortedOptions?.length === 0 ? (
              <div className="py-16 text-left text-16 font-400 text-basic-grey-400">
                {defaultText}
              </div>
            ) : (
              sortedOptions?.map((option, index) => (
                <button
                  key={index}
                  className="group/select-option py-16 text-left"
                  type="button"
                  onClick={() => {
                    setValue(option);
                    closeBottomSheet();
                  }}
                  disabled={disableOption?.(option) ?? false}
                >
                  {renderValue ? renderValue(option) : String(option)}
                </button>
              ))
            )}
          </section>
          {extraContent}
        </div>
      </BottomSheet>
    </>
  );
};

export default Select;
