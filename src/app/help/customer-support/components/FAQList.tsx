import { FAQ_ITEMS } from '../page';
import { customTwMerge } from 'tailwind.config';
import { ReactNode } from 'react';
import ArrowDownIcon from '../icons/arrow-down.svg';

interface FAQListProps {
  selectedTab: string;
  containerClassName: string;
}

const FAQList = ({ selectedTab, containerClassName }: FAQListProps) => {
  const filteredFAQs = FAQ_ITEMS.filter((item) => {
    if (selectedTab === 'reserve') return item.label.includes('[예약하기]');
    if (selectedTab === 'boarding') return item.label.includes('[탑승하기]');
    if (selectedTab === 'etc') return item.label.includes('[그외]');
    return false;
  });

  return (
    <>
      {filteredFAQs.map((item, index) => {
        const Content = item.content;
        return (
          <Accordion
            key={index}
            title={item.label}
            containerClassName={containerClassName}
          >
            <Content />
          </Accordion>
        );
      })}
    </>
  );
};

export default FAQList;

interface Props {
  title: string;
  children: ReactNode;
  containerClassName?: string;
  open?: boolean;
}

const Accordion = ({
  title,
  children,
  containerClassName,
  open = false,
}: Props) => {
  return (
    <details
      open={open}
      className={customTwMerge(
        'group flex w-full flex-col px-16 [&>summary::-webkit-details-marker]:hidden [&>summary::marker]:hidden',
        containerClassName,
      )}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-16 py-16">
        <h3 className={customTwMerge('py-12 text-16 font-600 leading-[160%] ')}>
          {title}
        </h3>
        <span className="transition-transform duration-100 group-open:rotate-[180deg]">
          <ArrowDownIcon />
        </span>
      </summary>
      {children}
    </details>
  );
};
