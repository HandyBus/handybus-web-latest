'use client';

import { setIsLoggedIn } from '@/utils/handleToken.util';

const Page = () => {
  const handleClick = () => {
    setIsLoggedIn();
  };
  return (
    <div>
      test
      <button onClick={handleClick}>click</button>
    </div>
  );
};

export default Page;
