import DemandingEmpty from '../icons/demanding-empty.svg';
import Link from 'next/link';

const Empty = async () => {
  const newShuttleFormUrl = process.env.NEXT_PUBLIC_NEW_SHUTTLE_FORM_URL ?? '';
  return (
    <div className="flex w-full flex-col items-center gap-4 px-16 py-56">
      <DemandingEmpty />
      <span className="text-basic-grey-300 text-16 font-400">
        수요 확인 중인 콘서트가 없어요
      </span>
      <Link href={newShuttleFormUrl}>
        <span className="text-basic-grey-600 text-14 font-500 underline">
          원하는 셔틀 요청하러 가기
        </span>
      </Link>
    </div>
  );
};

export default Empty;
