'use client';

import { ReactNode } from 'react';
import {
  FieldValues,
  UseControllerProps,
  UseFormSetValue,
  useController,
} from 'react-hook-form';
import DeleteIcon from 'public/icons/delete.svg';

interface Props<T extends FieldValues> extends UseControllerProps<T> {
  children: ReactNode;
  placeholder?: string;
  setValue: UseFormSetValue<FieldValues>;
}

const TextInput = <T extends FieldValues>({
  children,
  placeholder,
  setValue,
  ...controls
}: Props<T>) => {
  const { field, fieldState } = useController({
    ...controls,
  });

  const handleResetValue = () => {
    setValue<string>(field.name, '');
  };

  return (
    <div className="relative flex w-full flex-col gap-8">
      <label htmlFor={field.name} className="block h-[26px] text-16 font-500">
        {children}
      </label>
      <input
        id={field.name}
        placeholder={placeholder}
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
      {fieldState?.error?.message && (
        <div className="h-[20px] text-12 font-400 text-red-500">
          {fieldState?.error?.message}
        </div>
      )}
    </div>
  );
};

export default TextInput;
