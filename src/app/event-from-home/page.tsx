'use client';

import { Stack } from '@/stacks';

const Page = () => {
  return <Stack initialContext={{ req: { path: '/event-from-home' } }} />;
};

export default Page;
