import Button from '@/components/buttons/button/Button';
import LogoLargeIcon from 'public/icons/logo-large.svg';
import Link from 'next/link';

interface Props {
  searchParams: {
    code?: string;
  };
}

const Page = ({ searchParams }: Props) => {
  const code = Number(searchParams.code);

  if (code === 409) {
    return (
      <main className="flex grow flex-col items-center justify-center gap-24">
        <LogoLargeIcon viewBox="0 0 121 75" width="90px" height="44px" />
        <section>
          <h1 className="flex justify-center text-28 font-700 leading-[39.2px] text-black">
            이미 완료된 예약결제입니다.
          </h1>
          <p className="flex justify-center text-16 font-500 leading-[25.6px] text-grey-500">
            내 예약 페이지에서 확인해주세요.
          </p>
        </section>
        <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-500 p-16">
          <Link href="/">
            <Button>홈으로 돌아가기</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex grow flex-col items-center justify-center gap-24">
      <LogoLargeIcon viewBox="0 0 121 75" width="90px" height="44px" />
      <section>
        <h1 className="flex justify-center text-28 font-700 leading-[39.2px] text-black">
          결제가 실패했어요
        </h1>
        <p className="flex justify-center text-16 font-500 leading-[25.6px] text-grey-500">
          처음부터 다시 시도해주세요.
        </p>
      </section>
      <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-500 p-16">
        <Link href="/">
          <Button>홈으로 돌아가기</Button>
        </Link>
      </div>
    </main>
  );
};

export default Page;
