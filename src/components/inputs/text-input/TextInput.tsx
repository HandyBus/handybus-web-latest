'use client';

import { KeyboardEvent, ReactNode } from 'react';
import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';
import DeleteIcon from 'public/icons/delete.svg';
import { twMerge } from 'tailwind-merge';

interface Props<T extends FieldValues> extends UseControllerProps<T> {
  children?: ReactNode;
  setValue: (name: FieldPath<T>, value: string) => void;
  placeholder?: string;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  value?: string;
  inputClassName?: string;
}

const TextInput = <T extends FieldValues>({
  children,
  setValue,
  placeholder,
  onKeyDown,
  inputClassName,
  ...controls
}: Props<T>) => {
  const { field, fieldState } = useController({
    ...controls,
  });

  const handleResetValue = () => {
    setValue(field.name, '');
  };

  return (
    <div className="relative flex w-full flex-col gap-8">
      {children && (
        <label
          htmlFor={field.name}
          className="block h-[26px] text-16 font-500 text-grey-600-sub"
        >
          {children}
        </label>
      )}
      <input
        id={field.name}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        {...field}
        className={twMerge(
          'h-48 w-full border-b border-grey-100 p-12 pr-44 text-16 font-400 outline-none placeholder:text-grey-300',
          fieldState?.error ? 'border-red-500' : 'focus:border-primary-main',
          inputClassName,
        )}
      />
      {field.value && (
        <button
          type="button"
          onClick={handleResetValue}
          className={`absolute right-12 ${
            fieldState?.error ? 'bottom-40' : 'bottom-12'
          }`}
        >
          <DeleteIcon />
        </button>
      )}
      {fieldState?.error?.message && (
        <p className="h-[20px] text-12 font-400 text-red-500">
          {fieldState?.error?.message}
        </p>
      )}
    </div>
  );
};

export default TextInput;
