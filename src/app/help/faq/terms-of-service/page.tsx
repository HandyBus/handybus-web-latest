'use client';

import { Stack } from '@/stacks';

const Page = () => {
  return (
    <Stack initialContext={{ req: { path: '/help/faq/terms-of-service' } }} />
  );
};

export default Page;
