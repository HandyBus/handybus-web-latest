import DemandingEmpty from '../icons/demanding-empty.svg';
import Link from 'next/link';

const Empty = async () => {
  return (
    <div className="flex w-full flex-col items-center gap-4 px-16 py-56">
      <DemandingEmpty />
      <span className="text-16 font-400 text-grey-300">
        수요 확인 중인 콘서트가 없어요
      </span>
      <Link href="/TODO">
        <span className="text-14 font-500 text-grey-600-sub underline">
          원하는 셔틀 요청하러 가기
        </span>
      </Link>
    </div>
  );
};

export default Empty;
