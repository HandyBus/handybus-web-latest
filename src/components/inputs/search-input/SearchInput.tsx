'use client';

import ArrowLeft from 'public/icons/arrow-left.svg';
import DeleteIcon from 'public/icons/delete.svg';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  handleBack: () => void;
  placeholder?: string;
}

const SearchInput = ({ value, setValue, handleBack, placeholder }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue('');
  };

  return (
    <div className="border-basic-grey-100 relative flex h-48 w-full shrink-0 items-center border-b">
      <input
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="placeholder:text-basic-grey-300 h-full w-full py-12 pl-[50px] pr-[46px] outline-none"
      />
      <button
        type="button"
        onClick={handleBack}
        className="absolute left-16 top-1/2 -translate-y-1/2"
      >
        <ArrowLeft />
      </button>
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-16 top-1/2 -translate-y-1/2"
        >
          <DeleteIcon />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
