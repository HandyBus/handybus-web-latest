import { useState } from 'react';
import ArrowDownIcon from '../icons/arrow-down.svg';
import Accordion from '@/components/accordion/Accordion';
import { faqs } from '@/data/faq';
import { useFAQTracking } from '@/hooks/analytics/useFAQTracking';

interface Props {
  selectedTab: 'reservation' | 'boarding' | 'etc';
}

const FAQList = ({ selectedTab }: Props) => {
  const [showAll, setShowAll] = useState(false);
  const { trackFAQItemClick } = useFAQTracking();

  const filteredFAQs = faqs.filter((item) => {
    if (selectedTab === item.tag) return true;
    return false;
  });

  const visibleItems = showAll ? filteredFAQs : filteredFAQs.slice(0, 5);
  const hasMoreItems = filteredFAQs.length > 5;

  const handleFAQClick = (
    faqTitle: string,
    position: number,
    isOpen: boolean,
  ) => {
    trackFAQItemClick(
      faqTitle,
      selectedTab,
      position,
      isOpen ? 'open' : 'close',
    );
  };

  return (
    <div>
      <div className="mt-16">
        {visibleItems.map((item, index) => {
          const Content = item.content;
          const position = index + 1; // 1부터 시작하는 위치

          return (
            <Accordion
              key={item.title}
              title={
                <span className="text-16 font-600 leading-[160%] text-basic-black">
                  {item.title}
                </span>
              }
              containerClassName="px-8"
              titleClassName="py-12"
              onToggle={(isOpen) =>
                handleFAQClick(item.title, position, isOpen)
              }
            >
              <div className="whitespace-pre-line pb-8 text-14 font-500 leading-[160%] text-basic-grey-600 [&>summary>h3]:text-16 [&>summary>h3]:font-600 [&>summary>h3]:leading-[160%] [&>summary>h3]:text-basic-black [&_li]:ml-16 [&_ol>li]:ml-16 [&_ol>li]:whitespace-normal [&_ol>li]:text-16 [&_ol>li]:font-600 [&_ol]:list-decimal [&_ol]:whitespace-normal [&_strong]:text-basic-grey-600 [&_ul>li]:whitespace-normal [&_ul>li]:text-16 [&_ul]:list-disc [&_ul]:whitespace-normal">
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
