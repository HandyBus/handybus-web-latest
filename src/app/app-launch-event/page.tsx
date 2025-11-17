'use client';

import { Stack } from '@/stacks';

const Page = () => {
  return <Stack initialContext={{ req: { path: '/app-launch-event' } }} />;
};

export default Page;
