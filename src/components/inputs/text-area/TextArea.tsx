import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';
import { customTwMerge } from 'tailwind.config';

interface Props<T extends FieldValues> extends UseControllerProps<T> {
  placeholder?: string;
}

const TextArea = <T extends FieldValues>({
  placeholder,
  ...controls
}: Props<T>) => {
  const { field, fieldState } = useController({
    ...controls,
  });

  return (
    <div className="flex w-full flex-col gap-8">
      <textarea
        {...field}
        placeholder={placeholder}
        className={customTwMerge(
          'border-basic-grey-200 placeholder:text-basic-grey-400 disabled:text-basic-grey-300 h-160 rounded-[12px] border p-12 text-16 font-500 outline-none',
          fieldState?.error
            ? 'border-basic-red-500'
            : 'focus:border-brand-primary-100',
        )}
      />
      {fieldState?.error?.message && (
        <div className="h-[20px] pl-12 text-12 font-400 text-basic-red-400">
          {fieldState?.error?.message}
        </div>
      )}
    </div>
  );
};

export default TextArea;
