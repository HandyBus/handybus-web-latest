'use client';

import { useEffect, useState } from 'react';
import Header from '../Header';
import SearchIcon from '../../icons/search.svg';

interface Props {
  onBack: () => void;
  onNext: () => void;
}

const AddressStep = ({ onBack }: Props) => {
  const [value, setValue] = useState('');

  return (
    <div className="flex grow flex-col">
      <Header
        onBack={onBack}
        title="주소를 입력해 주세요"
        description="원하는 승하차 장소를 정확하게 입력해 주세요. 왕복 선택 시, 탑승 장소에서 하차해요."
      />
      <DebouncedInput value={value} setValue={setValue} />
    </div>
  );
};

export default AddressStep;

interface DebouncedInputProps {
  value: string;
  setValue: (value: string) => void;
  delay?: number;
}

const DebouncedInput = ({
  value: debouncedValue,
  setValue: setDebouncedValue,
  delay = 200,
}: DebouncedInputProps) => {
  const [value, setValue] = useState(debouncedValue);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="relative mx-12">
      <input
        value={value}
        onChange={setValue && ((e) => setValue(e.target.value))}
        className="w-full rounded-12 border border-basic-grey-200 p-12 pl-44 text-16 font-500 leading-[160%] outline-none placeholder:text-basic-grey-400"
        placeholder="도로명, 지번, 건물명으로 검색"
      />
      <div className="absolute left-12 top-1/2 -translate-y-1/2">
        <SearchIcon />
      </div>
    </div>
  );
};
