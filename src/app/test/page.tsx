'use client';

import { authInstance } from '@/services/config';
import { setRefreshToken } from '@/utils/handleToken';

const Test = () => {
  const handleFetchClick = async () => {
    const a = await fetch('/api/shuttle-operation/artists');
    const b = await a.json();
    console.log('FETCH: ', b);
  };
  const handleInstanceClick = async () => {
    const a = await authInstance('/shuttle-operation/artists');
    console.log(a);
  };
  return (
    <div>
      test
      <button onClick={() => setRefreshToken('HELLO')}>CICK</button>
      <button onClick={handleFetchClick}>SEND</button>
      <button onClick={handleInstanceClick}>SEND</button>
    </div>
  );
};

export default Test;
