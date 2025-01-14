import { z } from 'zod';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

/**
 * zod schema를 이용하여 데이터를 파싱합니다.
 * 파싱에 실패하더라도 오류를 throw하지 않고, 대신 콘솔 및 toast에 오류를 출력합니다.
 * 프로덕션 환경에서는 오류를 출력하지 않습니다.
 *
 * @param zod zod schema
 * @param input data to parse
 * @returns parsed data
 */
export const silentParse = <T extends z.ZodTypeAny>(
  zod: T,
  input: unknown,
): z.infer<T> => {
  const parseResult = zod.safeParse(input);
  const isServer = typeof window === 'undefined';
  const isProduction = process.env.NODE_ENV !== 'development';
  if (isProduction) {
    return input as z.infer<T>;
  }

  if (!parseResult.success) {
    if (!isServer) {
      toast.error('파싱 과정에서 타입 오류가 발생했습니다.');
    }
    console.error(
      `데이터를 파싱하는데에 실패했습니다. 다음 오류 정보를 참고하세요.`,
      parseResult.error,
    );
    return input as z.infer<T>;
  }
  return parseResult.data;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const replacer = (key: string, value: unknown) => {
  if (value instanceof Date) {
    const date = dayjs(value);

    if (date.startOf('day').isSame(date)) {
      return date.format('YYYY-MM-DD');
    }

    return date.format('YYYY-MM-DD HH:mm:ss');
  }
  return value;
};

export default replacer;
