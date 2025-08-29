'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useNotFoundTracking } from '@/hooks/useNotFoundTracking';

export const NotFound = () => {
  useNotFoundTracking();

  return (
    <div className="flex grow flex-col px-20 py-28">
      <h2 className="pb-[10px] text-26 font-700 text-basic-grey-700">
        요청하신 페이지를 찾지 못했어요
      </h2>
      <p className="pb-28 text-14 font-600 text-basic-grey-500">
        홈으로 돌아가거나 입력하신 주소가 맞는지 확인해주세요.
      </p>
      <div className="relative mb-40 h-200 w-full overflow-hidden rounded-12">
        <Image
          src="/images/error.png"
          alt="에러 이미지"
          fill
          className="aspect-auto object-cover"
        />
      </div>
      <Link
        href="/"
        className="flex h-44 w-full items-center justify-center rounded-full bg-basic-grey-50 text-16 font-400 text-basic-grey-700"
      >
        홈으로 돌아가기
      </Link>
      <div className="grow" />
    </div>
  );
};

export default NotFound;
