import UserIcon from 'public/icons/user.svg';
import LogoIcon from 'public/icons/logo.svg';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { IS_LOGGED_IN } from '@/constants/token';

const Header = async () => {
  const isLoggedIn = Boolean(cookies().get(IS_LOGGED_IN));

  return (
    <header className="sticky top-0 z-50 flex h-48 w-full items-center justify-between bg-white px-16 py-12">
      <h1 className="sr-only">핸디버스</h1>
      <Link href="/">
        <LogoIcon fill="black" />
      </Link>
      {isLoggedIn ? (
        <Link href="/mypage">
          <UserIcon />
        </Link>
      ) : (
        <Link
          href="/mypage"
          className="flex h-full w-72 items-center justify-center rounded-[6px] bg-black text-14 font-400 text-white"
        >
          시작하기
        </Link>
      )}
    </header>
  );
};

export default Header;
