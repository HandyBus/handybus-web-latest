'use client';

import Button from '@/components/Button';
import { authInstance } from '@/services/config';
import { useEffect } from 'react';

const Home = () => {
  const test = async () => {
    const res = await authInstance.get('/regions/1/hubs');
    console.log(res.data);
  };
  useEffect(() => {
    test();
  }, []);
  return (
    <div className="bg-brand-primary-main h-100 w-100">
      HandyBus
      <Button>test button</Button>
    </div>
  );
};

export default Home;
