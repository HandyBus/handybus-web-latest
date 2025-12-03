'use client';

import Image from 'next/image';
import { logout } from '@/utils/handleToken.util';
import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';
import { usePathname } from 'next/navigation';
import dayjs from 'dayjs';
import { putUserPushToken } from '@/services/user.service';

export const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  const pathname = usePathname();

  useEffect(() => {
    Sentry.captureException(error, {
      tags: {
        component: 'ErrorBoundary',
        page: 'global-error',
        feature: 'error-handling',
        errorType: 'unhandled-error',
        environment: process.env.NODE_ENV || 'development',
      },
      extra: {
        errorName: error.name,
        errorMessage: error.message,
        errorStack: error.stack,
        errorDigest: error.digest,
        pathname,
        timestamp: dayjs().toISOString(),
      },
    });
    console.error(error);
  }, [error, pathname]);

  return (
    <div className="flex grow flex-col justify-between px-20 py-28">
      <div>
        <h2 className="pb-[10px] pt-140 text-center text-22 font-700 leading-[140%] text-basic-grey-700">
          예상치 못한 문제가 발생했어요
        </h2>
        <p className="pb-28 text-center text-16 font-500 leading-[160%] text-basic-grey-600">
          홈으로 돌아가거나
          <br />
          입력하신 주소가 맞는지 확인해주세요.
        </p>
        <div className="relative mb-40 h-200 w-full overflow-hidden rounded-12">
          <Image
            src="/images/error.png"
            alt="에러 이미지"
            fill
            className="aspect-auto object-cover"
          />
        </div>
      </div>
      <div>
        <button
          className="mb-20 h-44 w-full rounded-full bg-basic-grey-50 text-16 font-400 text-basic-grey-700"
          onClick={() => reset()}
        >
          다시 시도하기
        </button>
        <button
          className="h-44 w-full rounded-full bg-basic-grey-50 text-16 font-400 text-basic-grey-700"
          onClick={async () => {
            await putUserPushToken(null);
            await logout();
          }}
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default Error;
