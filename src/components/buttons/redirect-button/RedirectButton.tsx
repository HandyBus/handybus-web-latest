import type { PropsWithChildren } from 'react';
import Link from 'next/link';
import ChevronRight from 'public/icons/chevron-right.svg';

interface Props extends PropsWithChildren {
  href: string;
  description: string;
}

const RedirectButton = ({ description, children, href }: Props) => {
  return (
    <Link href={href}>
      <div className="flex w-full flex-row items-center justify-between gap-16 rounded-[10px] bg-grey-50 p-24">
        <div className="flex flex-col justify-start gap-4 text-left">
          <span className="text-12 font-400 text-grey-600-sub">
            {description}
          </span>
          <span className="text-22 font-500 text-grey-800">{children}</span>
        </div>
        <span className="text-24 text-grey-600-sub">
          <ChevronRight />
        </span>
      </div>
    </Link>
  );
};

export default RedirectButton;
