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
  if (!date) {
    return '';
  }
  if (typeof date === 'string') {
    console.error('singleDateString: date is string');
  }

  const target = new Date(date);

  const formattedDate = target
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
  date: Date | Date[] | string | string[] | null | undefined,
  showYear: boolean = true,
) => {
  if (!date) {
    return '';
  }
  if (!Array.isArray(date)) {
    const target = typeof date === 'string' ? new Date(date) : date;
    return singleDateString(target, showYear);
  }
  if (date.length === 0) {
    return '';
  }
  if (date.length === 1) {
    const target = typeof date[0] === 'string' ? new Date(date[0]) : date[0];
    return singleDateString(target, showYear);
  }

  const targetDates = date.map((date) =>
    typeof date === 'string' ? new Date(date) : date,
  );

  const { min, max } = findMinMaxDate(targetDates);
  return `${singleDateString(min)} ~ ${singleDateString(max)}`;
};

export const ddayString = (date: Date | string | null | undefined) => {
  if (!date) {
    return '';
  }

  const target = typeof date === 'string' ? new Date(date) : date;

  const now = new Date();
  const diff = target.getTime() - now.getTime();
  const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (diffDays > 0) return `D-${diffDays}`;
  else if (diffDays < 0) return `D+${Math.abs(diffDays)}`;
  return 'D-Day';
};

export const compareToNow = (
  date: Date | string,
  callback: (a: Date, b: Date) => boolean,
) => {
  const target = typeof date === 'string' ? new Date(date) : date;
  const nowKST = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }),
  );
  return callback(target, nowKST);
};
