import Link from 'next/link';
import ChevronRight from 'public/icons/chevron-right.svg';
import { ReactNode } from 'react';

interface Props {
  href?: string;
  onClick?: () => void; // for opening bottom sheet
  description: string;
  target?: string;
  children: ReactNode;
}

const RedirectButton = ({
  description,
  children,
  href,
  onClick,
  target,
}: Props) => {
  return (
    <>
      {href && (
        <Link href={href} target={target}>
          <div className="flex w-full flex-row items-center justify-between gap-16 rounded-[10px] bg-grey-50 p-24">
            <div className="flex flex-col justify-start gap-4 text-left">
              <span className="text-12 font-400 text-grey-600">
                {description}
              </span>
              <span className="text-22 font-500 text-grey-700">{children}</span>
            </div>
            <span className="text-24 text-grey-600">
              <ChevronRight />
            </span>
          </div>
        </Link>
      )}
      {onClick && (
        <button type="button" onClick={onClick}>
          <div className="flex w-full flex-row items-center justify-between gap-16 rounded-[10px] bg-grey-50 p-24">
            <div className="flex flex-col justify-start gap-4 text-left">
              <span className="text-12 font-400 text-grey-600">
                {description}
              </span>
              <span className="text-22 font-500 text-grey-700">{children}</span>
            </div>
            <span className="text-24 text-grey-600">
              <ChevronRight />
            </span>
          </div>
        </button>
      )}
    </>
  );
};

export default RedirectButton;
