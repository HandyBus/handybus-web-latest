export const parsePhoneNumber = (phoneNumber: string) => {
  return '0' + phoneNumber.slice(3);
};
