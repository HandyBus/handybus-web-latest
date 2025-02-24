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
  options?: { showYear?: boolean; showTime?: boolean },
) => {
  if (!date) {
    return '';
  }
  const { showYear = true, showTime = false } = options || {};
  const weekday = WEEKDAYS[date.day()];
  const time = date
    .format('A hh:mm')
    .replace('AM', '오전')
    .replace('PM', '오후');

  return date.format(
    showYear && showTime
      ? `YYYY. MM. DD. (${weekday}) ${time}`
      : showYear
        ? `YYYY. MM. DD. (${weekday})`
        : showTime
          ? `MM. DD. HH:mm (${weekday})`
          : `MM. DD. (${weekday})`,
  );
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
  return `${singleDateString(min)} ~ ${singleDateString(max)}`;
};

export const ddayString = (date: string | null | undefined) => {
  if (!date) {
    return '';
  }

  const target = typeof date === 'string' ? dayjs(date).tz('Asia/Seoul') : date;

  const nowKST = dayjs().tz('Asia/Seoul');
  const diff = target.diff(nowKST, 'day');

  if (diff > 0) return `D-${diff}`;
  else if (diff < 0) return `D+${Math.abs(diff)}`;
  return 'D-Day';
};

export const compareToNow = (
  date: string | Dayjs,
  callback: (a: Dayjs, b: Dayjs) => boolean,
) => {
  const target = typeof date === 'string' ? dayjs(date).tz('Asia/Seoul') : date;
  const nowKST = dayjs().tz('Asia/Seoul');
  return callback(target, nowKST);
};
