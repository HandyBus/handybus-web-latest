import type { ReactNode } from 'react';
import type { MDXContent } from 'mdx/types';

interface FAQ {
  title: string;
  content: ReactNode;
}

export const faqs: FAQ[] = (
  await Promise.all([
    import('./1-sure.mdx'),
    import('./2-change.mdx'),
    import('./3-refund.mdx'),
    import('./4-stop.mdx'),
    import('./5-no.mdx'),
    import('./6-threshold.mdx'),
    import('./7-bus.mdx'),
  ])
).map((module) => {
  const FaqContent = module.default satisfies MDXContent;
  return {
    title: module.metadata.title satisfies string,
    content: <FaqContent />,
  };
});
