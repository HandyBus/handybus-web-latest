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

interface DateStringOptions {
  showYear?: boolean;
  showWeekday?: boolean;
  showDate?: boolean;
  showTime?: boolean;
  showTimeWithoutAmPm?: boolean;
}

const singleDateString = (date: Dayjs | null, options?: DateStringOptions) => {
  if (!date) {
    return '';
  }
  const {
    showYear = true,
    showDate = true,
    showTime = false,
    showWeekday = true,
    showTimeWithoutAmPm = false,
  } = options || {};

  const yearDateString =
    showYear && showDate
      ? date.format('YYYY.MM.DD')
      : showYear
        ? date.format('YYYY')
        : showDate
          ? date.format('MM.DD')
          : null;
  const weekdayString = showWeekday ? `(${WEEKDAYS[date.day()]})` : null;
  const timeString = showTime
    ? date.format('A hh:mm').replace('AM', '오전').replace('PM', '오후')
    : showTimeWithoutAmPm
      ? date.format('HH:mm')
      : null;

  const resultString = [yearDateString, weekdayString, timeString]
    .filter((item) => item !== null)
    .join(' ');
  return resultString;
};

// 날짜 및 날짜 배열을 받아 형식에 맞추어 리턴
export const dateString = (
  date: string | string[] | Dayjs | Dayjs[] | null | undefined,
  options?: DateStringOptions,
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
  return `${singleDateString(min, options)} - ${singleDateString(max, {
    showYear: false,
    ...options,
  })}`;
};

export const compareToNow = (
  date: string | Dayjs,
  callback: (a: Dayjs, b: Dayjs) => boolean,
) => {
  const target = typeof date === 'string' ? dayjs(date).tz('Asia/Seoul') : date;
  const nowKST = dayjs().tz('Asia/Seoul');
  return callback(target, nowKST);
};
