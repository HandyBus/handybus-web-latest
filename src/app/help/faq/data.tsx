'use server';

import 'server-only';
import type { ReactNode } from 'react';
import fs from 'fs/promises';
import { compileMDX } from 'next-mdx-remote/rsc';
import path from 'path';
import { FAQS_PATH, FAQ_MD_EXTENSION } from '@/constants/faq';

interface FAQ {
  title: string;
  content: ReactNode;
}

interface FAQMetadata extends Record<string, unknown> {
  title: string;
}

const faqs: Promise<FAQ[]> = fs.readdir(FAQS_PATH).then((subpaths) => {
  const a = subpaths
    .filter((v) => v.endsWith(FAQ_MD_EXTENSION))
    .map(async (fn: string): Promise<FAQ> => {
      const fullpath = path.resolve(FAQS_PATH, fn);
      const { content, frontmatter } = await compileMDX<FAQMetadata>({
        source: await fs.readFile(fullpath),
        options: {
          parseFrontmatter: true,
          mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [],
          },
        },
      });

      return {
        content,
        title: frontmatter.title,
      };
    });
  return Promise.all(a);
});

export const readFaqs = async (): Promise<FAQ[]> => faqs;
