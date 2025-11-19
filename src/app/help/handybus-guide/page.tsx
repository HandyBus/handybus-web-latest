'use client';

import { Stack } from '@/stacks';

const Page = () => {
  return <Stack initialContext={{ req: { path: '/help/handybus-guide' } }} />;
};

export default Page;
