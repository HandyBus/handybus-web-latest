'use client';

import { KeyboardEvent, ReactNode } from 'react';
import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';
import DeleteIcon from 'public/icons/delete.svg';

interface Props<T extends FieldValues> extends UseControllerProps<T> {
  children: ReactNode;
  setValue: (name: FieldPath<T>, value: string) => void;
  placeholder?: string;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const TextInput = <T extends FieldValues>({
  children,
  setValue,
  placeholder,
  onKeyDown,
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
      <label
        htmlFor={field.name}
        className="block h-[26px] text-16 font-500 text-grey-600-sub"
      >
        {children}
      </label>
      <input
        id={field.name}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        {...field}
        className={`h-48 w-full border-b border-grey-100 p-12 pr-44 text-16 font-400 outline-none placeholder:text-grey-300 ${fieldState?.error ? 'border-red-500' : 'focus:border-primary-main'}`}
      />
      {field.value && (
        <button
          type="button"
          onClick={handleResetValue}
          className="absolute right-12 top-48"
        >
          <DeleteIcon />
        </button>
      )}
      <p className="h-[20px] text-12 font-400 text-red-500">
        {fieldState?.error?.message}
      </p>
    </div>
  );
};

export default TextInput;
