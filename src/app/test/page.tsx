'use client';

import { authInstance } from '@/services/config';

const Test = () => {
  const handleAuthClick = async () => {
    const a = await authInstance('/user-management/users/me/dashboard');
    console.log(a);
  };
  const handleInstanceClick = async () => {
    const a = await authInstance('/shuttle-operation/artists');
    // const a = await fetch('/api/shuttle-operation/artists');
    // const b = await a.json();
    console.log(a);
  };

  return (
    <div className="flex flex-col gap-12">
      test
      <button onClick={handleInstanceClick}>SEND</button>
      <button onClick={handleAuthClick}>AUTH SEND</button>
    </div>
  );
};

export default Test;

// import { authInstance, instance } from '@/services/config';

// const Test = async () => {
//   const a = await authInstance('/shuttle-operation/artists');

//   if (!a) {
//     return <div>FAIL</div>;
//   }

//   console.log('TEST: ', a);

//   return <div className="flex flex-col gap-12">{a.data.artists[0].name}</div>;
// };

// export default Test;
