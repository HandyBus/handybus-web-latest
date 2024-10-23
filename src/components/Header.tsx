'use client';

import UserIcon from '@/icons/user.svg';
import LogoIcon from '@/icons/logo.svg';

const Header = () => {
  const handleLogoClick = () => {};
  const handleProfileClick = () => {};

  return (
    <header className="flex h-48 w-full items-center justify-between bg-white px-16 py-12">
      <button onClick={handleLogoClick}>
        <LogoIcon fill="black" />
      </button>
      <button onClick={handleProfileClick}>
        <UserIcon />
      </button>
    </header>
  );
};

export default Header;
