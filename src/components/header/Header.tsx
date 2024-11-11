'use client';

import UserIcon from 'public/icons/user.svg';
import LogoIcon from 'public/icons/logo.svg';

const Header = () => {
  const handleLogoClick = () => {};
  const handleProfileClick = () => {};

  return (
    <div>
      <header className="fixed top-0 z-50 flex h-48 w-full items-center justify-between bg-white px-16 py-12">
        <button onClick={handleLogoClick}>
          <LogoIcon fill="black" />
        </button>
        <button onClick={handleProfileClick}>
          <UserIcon />
        </button>
      </header>
      <div className="relative h-48" />
    </div>
  );
};

export default Header;
