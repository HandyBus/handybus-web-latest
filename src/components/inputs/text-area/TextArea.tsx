import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';

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
        className={`h-[136px] w-full resize-none rounded-xl border border-brand-grey-100 p-12 text-16 font-400 outline-none placeholder:text-brand-grey-300 ${fieldState?.error ? 'border-basic-red-500' : 'focus:border-brand-primary-100'}`}
      />
      {fieldState?.error?.message && (
        <div className="h-[20px] pl-12 text-12 font-400 text-basic-red-100">
          {fieldState?.error?.message}
        </div>
      )}
    </div>
  );
};

export default TextArea;
