import { SyntheticEvent } from 'react';

// +821012345678 -> 01012345678
export const formatPhoneNumber = (phoneNumber: string, withHyphen = false) => {
  const basePhoneNumber = '0' + phoneNumber.slice(3);
  const withHyphenPhoneNumber = `${basePhoneNumber.slice(0, 3)}-${basePhoneNumber.slice(3, 7)}-${basePhoneNumber.slice(7)}`;
  return withHyphen ? withHyphenPhoneNumber : basePhoneNumber;
};

export const handleClickAndStopPropagation = (callback: () => void) => {
  return (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    callback();
  };
};
