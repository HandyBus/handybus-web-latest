'use client';

import { HTMLInputTypeAttribute, ReactNode } from 'react';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';

interface Props<T extends FieldValues> extends UseControllerProps<T> {
  children: ReactNode;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
}

const TextInput = <T extends FieldValues>({
  children,
  placeholder,
  ...controls
}: Props<T>) => {
  const { field, fieldState } = useController({
    ...controls,
  });

  console.log(fieldState.error);

  return (
    <div className="relative flex w-full flex-col gap-8">
      <label htmlFor={field.name} className="block h-[26px] text-16 font-500">
        {children}
      </label>
      <input
        id={field.name}
        placeholder={placeholder}
        {...field}
        className={`w-full border-b border-grey-100 p-12 text-16 font-400 outline-none placeholder:text-grey-300 ${fieldState?.error ? 'border-red-500' : 'focus:border-primary-main'}`}
      />
      {field.value && <div></div>}
      {fieldState?.error?.message && (
        <div className="h-[20px] text-12 font-400 text-red-500">
          {fieldState?.error?.message}
        </div>
      )}
    </div>
  );
};

export default TextInput;
