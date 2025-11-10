import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

import { useWatch } from 'react-hook-form';
import { CANCEL_REASON_OPTIONS } from '../const/refund.const';
import { CancelReasonForm } from './CancelBottomSheet';

interface RadioInputGroupProps {
  options: Record<string, string>;
  name: keyof CancelReasonForm;
  otherOptionName?: keyof CancelReasonForm;
  register: UseFormRegister<CancelReasonForm>;
  setValue: UseFormSetValue<CancelReasonForm>;
  errors?: FieldErrors<CancelReasonForm>;
  otherOptionPlaceholder?: string;
  control?: Control<CancelReasonForm>;
}

const RadioInputGroup = ({
  options,
  name,
  otherOptionName,
  register,
  setValue,
  errors,
  otherOptionPlaceholder = '직접 입력해주세요. (50자 내외)',
  control,
}: RadioInputGroupProps) => {
  const selectedItem = useWatch({ control, name });

  const handleRadioChange = (value: string) => {
    setValue(name, value);
  };

  return (
    <div className="flex flex-col gap-16">
      {Object.entries(options).map(([key, item]) => (
        <div key={key} onClick={() => handleRadioChange(item)}>
          <div className="flex items-center gap-[6px]">
            <input
              type="radio"
              {...register(name)}
              value={item}
              checked={selectedItem === item}
              className="h-[18px] w-[18px] accent-basic-black"
            />
            <label className="text-16 font-600 leading-[160%]">{item}</label>
          </div>
          {item === CANCEL_REASON_OPTIONS.OTHER && otherOptionName && (
            <div>
              <input
                type="text"
                {...register(otherOptionName, {
                  required:
                    selectedItem === item ? '내용을 입력해주세요.' : false,
                  pattern: {
                    value: /^.{1,50}$/,
                    message: '최대 50자까지 입력할 수 있어요.',
                  },
                })}
                className={`w-full border-b border-basic-grey-200 p-12 text-16 font-500 leading-[160%] text-basic-grey-700 focus:outline-none ${
                  selectedItem !== item ? 'opacity-50' : ''
                } ${errors?.[otherOptionName] ? 'border-basic-red-400' : ''}`}
                placeholder={otherOptionPlaceholder}
              />
              {errors?.[otherOptionName] && (
                <p className="mt-4 text-12 font-500 text-basic-red-400">
                  {errors[otherOptionName].message}
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RadioInputGroup;
