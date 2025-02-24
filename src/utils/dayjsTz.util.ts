import dayjs from 'dayjs';

export const dayjsTz = (date: Date | string | null | undefined) => {
  console.log(
    dayjs(date).tz('Asia/Seoul').toDate(),
    dayjs(date).tz('Asia/Seoul'),
  );
  return dayjs(date).tz('Asia/Seoul').toDate();
};
