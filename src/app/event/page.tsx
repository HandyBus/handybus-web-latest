'use client';

import { EventStack } from '@/stacks/event-stack';

const Page = () => {
  return <EventStack initialContext={{ req: { path: '/event' } }} />;
};

export default Page;
