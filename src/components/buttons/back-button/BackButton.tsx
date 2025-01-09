'use client';

import ChveronLeftIcon from 'public/icons/chevron-left.svg';
import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();
  return (
    <button
      aria-label="route back"
      onClick={() => router.push('/')}
      className="absolute left-12 top-[12px] z-10"
    >
      <ChveronLeftIcon
        viewBox="0 0 20 20"
        width="32px"
        height="32px"
        className="[&>path]:stroke-white"
      />
    </button>
  );
};

export default BackButton;
