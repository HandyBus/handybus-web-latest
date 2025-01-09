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

const singleDateString = (date: Date | null) => {
  if (!date) return '';

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  } as const;
  return new Intl.DateTimeFormat('ko-KR', options).format(date);
};

const dateString = (date: Date | Date[]) => {
  if (!Array.isArray(date)) return singleDateString(date);

  if (date.length === 0) return '';

  if (date.length === 1) {
    return new Date(date[0]).toLocaleDateString();
  }

  const { min, max } = findMinMaxDate(date);
  return `${singleDateString(min)} ~ ${singleDateString(max)}`;
};

export default dateString;

export const ddayString = (date: Date) => {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (diffDays > 0) return `D-${diffDays}`;
  else if (diffDays < 0) return `D+${Math.abs(diffDays)}`;
  return 'D-Day';
};

export const parseDateString = (date: string, showYear: boolean = true) => {
  const parsedDate = new Date(date);
  const formattedDate = parsedDate
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

export const compareToNow = (
  date: string | Date,
  callback: (a: Date, b: Date) => boolean,
) => {
  const targetDate = new Date(date);
  const nowKST = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }),
  );
  return callback(targetDate, nowKST);
};
