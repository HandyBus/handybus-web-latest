'use client';

import Footer from '@/components/footer/Footer';
import Image from 'next/image';
import logout from './actions/logout.action';

export const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  console.error(error);
  return (
    <div className="flex grow flex-col px-20 py-28">
      <h2 className="pb-[10px] text-26 font-700 text-grey-900">
        알 수 없는 오류가 발생했어요
      </h2>
      <p className="pb-28 text-14 font-600 text-grey-500">
        홈으로 돌아가거나 입력하신 주소가 맞는지 확인해주세요. 오류가 반복되면
        하단 ‘카카오톡 문의하기’를 통해 문의를 남겨주세요.
      </p>
      <div className="relative mb-40 h-200 w-full overflow-hidden rounded-[12px]">
        <Image
          src="/images/error.png"
          alt="에러 이미지"
          fill
          className="aspect-auto object-cover"
        />
      </div>
      <button
        className="mb-20 h-44 w-full rounded-full bg-grey-50 text-16 font-400 text-grey-700"
        onClick={() => reset()}
      >
        다시 시도하기
      </button>
      <button
        className="h-44 w-full rounded-full bg-grey-50 text-16 font-400 text-grey-700"
        onClick={() => logout()}
      >
        홈으로 돌아가기
      </button>
      <div className="grow" />
      <Footer />
    </div>
  );
};

export default Error;
