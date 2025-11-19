'use client';

import { Stack } from '@/stacks';

const Page = () => {
  return (
    <Stack initialContext={{ req: { path: '/help/faq/marketing-consent' } }} />
  );
};

export default Page;
