'use client';

import { useState } from 'react';

const Radio = () => {
  const [selected, setSelected] = useState(false);

  return (
    <button
      onClick={() => setSelected((prev) => !prev)}
      className={`h-[18px] w-[18px] shrink-0 rounded-full border-[1.5px] p-[2px] ${selected ? 'border-grey-800' : 'border-grey-100'}`}
    >
      <div
        className={`h-full w-full rounded-full ${selected ? 'bg-grey-800' : 'bg-transparent'}`}
      />
    </button>
  );
};

export default Radio;
