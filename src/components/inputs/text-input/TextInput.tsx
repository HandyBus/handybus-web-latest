'use client';

import { KeyboardEvent, ReactNode } from 'react';
import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';
import DeleteIcon from 'public/icons/delete.svg';
import { customTwMerge } from 'tailwind.config';

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
        <label htmlFor={field.name} className="block h-20 text-14 font-600">
          {children}
        </label>
      )}
      <input
        id={field.name}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        {...field}
        className={customTwMerge(
          'h-48 w-full rounded-[0px] border-b border-basic-grey-200 p-12 pr-44 text-16 font-500 outline-none placeholder:text-basic-grey-400',
          fieldState?.error
            ? 'border-basic-red-500'
            : 'focus:border-brand-primary-400',
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
        <p className="h-[20px] text-12 font-400 text-basic-red-500">
          {fieldState?.error?.message}
        </p>
      )}
    </div>
  );
};

export default TextInput;
