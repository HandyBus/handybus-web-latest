'use client';

import { Stack } from '@/stacks';

const Page = () => {
  return (
    <Stack initialContext={{ req: { path: '/help/faq/privacy-policy' } }} />
  );
};

export default Page;
