import dayjs from 'dayjs';

export const dayjsTz = (date: Date | string | null | undefined) => {
  return dayjs(date).tz('Asia/Seoul').toDate();
};
