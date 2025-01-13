const findMinMaxDate = (dates: Date[]) => {
  if (dates.length === 0) return { min: null, max: null };

  let minDate = dates[0];
  let maxDate = dates[0];

  dates.forEach((date) => {
    if (date < minDate) minDate = date;
    if (date > maxDate) maxDate = date;
  });

  return { min: minDate, max: maxDate };
};

const singleDateString = (date: Date | null, showYear: boolean = true) => {
  if (!date || !(date instanceof Date)) {
    return '';
  }

  const formattedDate = date
    .toLocaleDateString('ko-KR', {
      year: showYear ? 'numeric' : undefined,
      month: '2-digit',
      day: '2-digit',
      weekday: 'short',
    })
    .replace(/\./g, '. ')
    .replace(/\s*\((.*?)\)/, ' ($1)');
  return formattedDate;
};

// 날짜 및 날짜 배열을 받아 형식에 맞추어 리턴
export const dateString = (
  date: Date | Date[] | null | undefined,
  showYear: boolean = true,
) => {
  if (!date) {
    return '';
  }
  if (!Array.isArray(date)) {
    return singleDateString(date, showYear);
  }
  if (date.length === 0) {
    return '';
  }
  if (date.length === 1) {
    return singleDateString(date[0], showYear);
  }

  const { min, max } = findMinMaxDate(date);
  return `${singleDateString(min)} ~ ${singleDateString(max)}`;
};

export const ddayString = (date: Date | null | undefined) => {
  if (!date || !(date instanceof Date)) {
    return '';
  }

  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (diffDays > 0) return `D-${diffDays}`;
  else if (diffDays < 0) return `D+${Math.abs(diffDays)}`;
  return 'D-Day';
};

export const compareToNow = (
  date: Date,
  callback: (a: Date, b: Date) => boolean,
) => {
  const nowKST = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }),
  );
  return callback(date, nowKST);
};
