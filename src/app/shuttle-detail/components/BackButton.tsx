'use client';

import ChveronLeftIcon from 'public/icons/chevron-left.svg';
import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();
  return (
    <nav className="relative left-12 top-[53px] z-10">
      <button aria-label="route back" onClick={() => router.back()}>
        <ChveronLeftIcon
          viewBox="0 0 20 20"
          width="32px"
          height="32px"
          className="[&>path]:stroke-white"
        />
      </button>
    </nav>
  );
};

export default BackButton;
