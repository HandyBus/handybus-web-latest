'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useNotFoundTracking } from '@/hooks/useNotFoundTracking';

export const NotFound = () => {
  useNotFoundTracking();

  return (
    <div className="flex grow flex-col justify-between px-20 py-28">
      <div>
        <h2 className="pb-[10px] pt-140 text-center text-22 font-700 leading-[140%] text-basic-grey-700">
          페이지를 찾을 수 없어요
        </h2>
        <p className="pb-28 text-center text-16 font-500 leading-[160%] text-basic-grey-600">
          홈으로 돌아가거나
          <br />
          입력하신 주소가 맞는지 확인해주세요.
        </p>
        <div className="relative mb-40 h-200 w-full overflow-hidden rounded-12">
          <Image
            src="/images/not-found.png"
            alt="에러 이미지"
            fill
            className="aspect-auto object-cover"
          />
        </div>
      </div>
      <Link
        href="/"
        className="flex h-44 w-full items-center justify-center rounded-full bg-basic-grey-50 text-16 font-400 text-basic-grey-700"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default NotFound;
