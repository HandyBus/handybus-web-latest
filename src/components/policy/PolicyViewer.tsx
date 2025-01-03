'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { PolicyNameType } from '@/app/api/policy/route';
import { useEffect, useState } from 'react';
import { CustomError } from '@/services/custom-error';
import { useMDXComponents } from '@/app/mdx-components';

interface Props {
  type: PolicyNameType;
}

const PolicyViewer = ({ type }: Props) => {
  const components = useMDXComponents({});
  const [content, setContent] = useState<MDXRemoteSerializeResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getPolicy = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/policy?policy=${type}`);

      if (!res.ok) {
        throw new CustomError(res.status, res.statusText);
      }

      const mdxSource = await res.json();
      setContent(mdxSource);
    } catch (err) {
      setError(
        err instanceof CustomError
          ? err.message
          : '알 수 없는 오류가 발생했습니다.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPolicy();
  }, [type]);

  if (isLoading) {
    return <div />;
  }
  if (error) {
    return <div>오류가 발생했습니다.</div>;
  }
  if (!content) {
    return <div>내용을 찾을 수 없습니다.</div>;
  }

  return <MDXRemote {...content} components={components} />;
};

export default PolicyViewer;
