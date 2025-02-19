import Link from 'next/link';
import { ReactNode } from 'react';

interface Pros {
  title: ReactNode;
  content: string;
  isLink?: boolean;
}

const DetailRow = ({ title, content, isLink = false }: Pros) => {
  return (
    <div className="grid grid-cols-[80px_1fr] gap-32 text-16 font-400">
      <h5 className="break-keep text-grey-600-sub">{title}</h5>
      <div className="text-grey-900">
        {isLink ? (
          <Link href={content} className="underline">
            {content}
          </Link>
        ) : (
          <>{content}</>
        )}
      </div>
    </div>
  );
};

export default DetailRow;
