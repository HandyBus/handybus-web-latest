import dayjs, { Dayjs } from 'dayjs';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

const findMinMaxDate = (dates: Dayjs[]) => {
  if (dates.length === 0) {
    return { min: null, max: null };
  }

  let minDate = dates[0];
  let maxDate = dates[0];

  dates.forEach((date) => {
    if (date.isBefore(minDate)) minDate = date;
    if (date.isAfter(maxDate)) maxDate = date;
  });

  return { min: minDate, max: maxDate };
};

const singleDateString = (
  date: Dayjs | null,
  options?: { showYear?: boolean; showTime?: boolean; showWeekday?: boolean },
) => {
  if (!date) {
    return '';
  }
  const {
    showYear = true,
    showTime = false,
    showWeekday = true,
  } = options || {};

  const yearDateString = showYear
    ? date.format('YYYY.MM.DD')
    : date.format('MM.DD');
  const weekdayString = showWeekday ? `(${WEEKDAYS[date.day()]})` : null;
  const timeString = showTime
    ? date.format('A hh:mm').replace('AM', '오전').replace('PM', '오후')
    : null;

  const resultString = [yearDateString, weekdayString, timeString]
    .filter((item) => item !== null)
    .join(' ');
  return resultString;
};

// 날짜 및 날짜 배열을 받아 형식에 맞추어 리턴
export const dateString = (
  date: string | string[] | Dayjs | Dayjs[] | null | undefined,
  options?: {
    showYear?: boolean;
    showTime?: boolean;
  },
) => {
  if (!date) {
    return '';
  }
  if (!Array.isArray(date)) {
    const target =
      typeof date === 'string' ? dayjs(date).tz('Asia/Seoul') : date;
    return singleDateString(target, options);
  }
  if (date.length === 0) {
    return '';
  }
  if (date.length === 1) {
    const target =
      typeof date[0] === 'string' ? dayjs(date[0]).tz('Asia/Seoul') : date[0];
    return singleDateString(target, options);
  }

  const targetDates = date.map((date) =>
    typeof date === 'string' ? dayjs(date).tz('Asia/Seoul') : date,
  );

  const { min, max } = findMinMaxDate(targetDates);
  return `${singleDateString(min, { showYear: true, showWeekday: false })} - ${singleDateString(
    max,
    {
      showYear: false,
      showWeekday: false,
    },
  )}`;
};

export const compareToNow = (
  date: string | Dayjs,
  callback: (a: Dayjs, b: Dayjs) => boolean,
) => {
  const target = typeof date === 'string' ? dayjs(date).tz('Asia/Seoul') : date;
  const nowKST = dayjs().tz('Asia/Seoul');
  return callback(target, nowKST);
};
