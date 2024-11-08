'use client';

import { ButtonHTMLAttributes } from 'react';
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';

interface Props<T extends FieldValues, U> extends UseControllerProps<T> {
  values: readonly U[];
  setValue: (name: FieldPath<T>, value: string) => void;
  disabled?: boolean;
}

const RadioButtons = <T extends FieldValues, U extends string>({
  values,
  setValue,
  disabled = false,
  ...controls
}: Props<T, U>) => {
  const { field, fieldState } = useController({
    ...controls,
  });

  return (
    <section>
      <div className="flex w-full flex-wrap gap-8">
        {values.map((value) => (
          <RadioButton
            key={value}
            onClick={() => setValue(field.name, value)}
            selected={value === field.value}
            disabled={disabled}
          >
            {value}
          </RadioButton>
        ))}
      </div>
      <p className="mt-8 h-[20px] text-12 font-400 text-red-500">
        {fieldState?.error?.message}
      </p>
    </section>
  );
};

export default RadioButtons;

interface RadioButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected: boolean;
}

const RadioButton = ({
  children,
  onClick,
  selected,
  disabled,
}: RadioButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`h-[42px] shrink-0 rounded-full border border-grey-100 px-32 text-16 font-500 disabled:opacity-50 ${selected ? 'bg-grey-700 text-white' : 'bg-white text-grey-600-sub active:bg-grey-50'}`}
    >
      {children}
    </button>
  );
};
