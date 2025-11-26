'use client';

import { Stack } from '@/stacks';

const Page = () => {
  return <Stack initialContext={{ req: { path: '/onboarding' } }} />;
};

export default Page;
