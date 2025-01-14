// +8210 1234-5678 -> 010-1234-5678
export const parsePhoneNumber = (phoneNumber: string) => {
  return '0' + phoneNumber.slice(3);
};
