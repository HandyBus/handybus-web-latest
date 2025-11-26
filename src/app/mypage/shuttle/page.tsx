'use client';

import { useEffect } from 'react';

const Page = () => {
  useEffect(() => {
    window.location.href = '/history?type=demand';
  }, []);
  return null;
};

export default Page;
