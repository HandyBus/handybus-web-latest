'use client';

import { useState } from 'react';
import InfoIcon from 'public/icons/info.svg';

const PhoneNumberSection = () => {
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/[^0-9]/g, '');
    if (numbers.length > 11) {
      return value;
    }
    if (numbers.length <= 3) {
      return numbers;
    }
    if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    }
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
  };

  const [value, setValue] = useState('');

  // const isPhoneNumberComplete = (phoneNumber: string) => {
  //   const numbers = phoneNumber.replace(/[^0-9]/g, '');
  //   return numbers.length === 11;
  // };

  const handlePhoneNumberChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    setValue(formatted);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 숫자와 백스페이스, 삭제 키만 허용
    if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
      e.preventDefault();
    }
  };

  return (
    <section className="flex flex-col gap-8 p-16">
      <label
        htmlFor="phoneNumber"
        className="h-[26px] text-16 font-600 leading-[160%]"
      >
        받는 사람
      </label>
      <div className="relative">
        <input
          id="phoneNumber"
          type="tel"
          inputMode="numeric"
          maxLength={13}
          placeholder="010-0000-0000"
          value={value}
          onChange={(e) => handlePhoneNumberChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="h-48 w-full rounded-[0px] border-b border-basic-grey-200 p-12 pr-80 text-16 font-500 outline-none placeholder:text-basic-grey-400 focus:[&:not([disabled])]:border-brand-primary-400"
        />
      </div>
      <p className="flex items-center gap-[2px]">
        <InfoIcon />
        <span className="text-14 font-400 leading-[160%] text-basic-grey-500">
          탑승권은 입력하신 연락처로 발송됩니다.
        </span>
      </p>
    </section>
  );
};

export default PhoneNumberSection;
