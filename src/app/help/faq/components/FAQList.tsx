import { useState } from 'react';
import ArrowDownIcon from '../icons/arrow-down.svg';
import Accordion from '@/components/accordion/Accordion';
import { faqs } from '@/data/faq';

interface Props {
  selectedTab: string;
}

const FAQList = ({ selectedTab }: Props) => {
  const [showAll, setShowAll] = useState(false);

  const filteredFAQs = faqs.filter((item) => {
    if (selectedTab === 'reserve') return item.title.includes('[예약하기]');
    if (selectedTab === 'boarding') return item.title.includes('[탑승하기]');
    if (selectedTab === 'etc') return item.title.includes('[그외]');
    return false;
  });

  const visibleItems = showAll ? filteredFAQs : filteredFAQs.slice(0, 5);
  const hasMoreItems = filteredFAQs.length > 5;

  return (
    <div>
      <div className="mt-16">
        {visibleItems.map((item, index) => {
          const Content = item.content;
          return (
            <Accordion
              key={index}
              title={
                <span className="text-16 font-600 leading-[160%] text-basic-black">
                  {item.title}
                </span>
              }
            >
              <div className="whitespace-pre-line px-16 text-14 font-500 leading-[160%] text-basic-grey-600 [&>summary>h3]:text-16 [&>summary>h3]:font-600 [&>summary>h3]:leading-[160%] [&>summary>h3]:text-basic-black [&_li]:ml-16 [&_ol>li]:ml-16 [&_ol>li]:whitespace-normal [&_ol>li]:text-16 [&_ol>li]:font-600 [&_ol]:list-decimal [&_ol]:whitespace-normal [&_strong]:text-basic-grey-600 [&_ul>li]:whitespace-normal [&_ul>li]:text-16 [&_ul]:list-disc [&_ul]:whitespace-normal">
                {Content}
              </div>
            </Accordion>
          );
        })}
      </div>

      {hasMoreItems && (
        <button
          className="mt-16 flex w-full items-center justify-center gap-[10px] py-[10px] text-16 font-600 leading-[160%] text-basic-grey-600"
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? '접기' : '모두 보기'}
          <ArrowDownIcon
            style={{
              transform: showAll ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </button>
      )}
    </div>
  );
};

export default FAQList;
