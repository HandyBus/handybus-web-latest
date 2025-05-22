import { useEffect, useRef, useState } from 'react';
import ChevronRightEmIcon from 'public/icons/chevron-right-em.svg';
import { ReviewSortType } from './ReviewListWithMyReview';

interface FilterButtonProps {
  sort: ReviewSortType;
  onSort: (sort: ReviewSortType) => void;
}

const FilterButton = ({ sort, onSort }: FilterButtonProps) => {
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!filterOpen) return;

    const handleClick = (event: MouseEvent | TouchEvent) => {
      if (
        filterRef.current &&
        event.target instanceof Node &&
        !filterRef.current.contains(event.target)
      ) {
        setFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [filterOpen]);

  const handleSort = (newSort: ReviewSortType) => {
    onSort(newSort);
    setFilterOpen(false);
  };

  return (
    <div className="relative" ref={filterRef}>
      <div className="flex items-center justify-between">
        <h1 className="text-20 font-700 leading-[140%] ">이용 후기</h1>
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="flex h-[38px]  items-center gap-8 break-keep rounded-8 border-[1px] border-basic-grey-200 px-12 py-8 text-14 font-600 leading-[160%] text-basic-grey-600 active:bg-basic-grey-50"
        >
          {sort === 'DATE_DESC'
            ? '최신순'
            : sort === 'RATING_ASC'
              ? '별점낮은순'
              : '별점높은순'}
          <ChevronRightEmIcon className="h-16 w-16 rotate-90 stroke-2 text-basic-grey-300" />
        </button>
      </div>
      {filterOpen && (
        <div className="absolute right-0 top-44 z-50 w-[110px] rounded-[8px] border border-basic-grey-200 bg-basic-white shadow-lg">
          <button
            onClick={() => handleSort('DATE_DESC')}
            className={`w-full px-16 py-12 text-left text-14 font-600 leading-[160%] hover:bg-basic-grey-50 ${
              sort === 'DATE_DESC'
                ? 'text-brand-primary-400'
                : 'text-basic-grey-700'
            }`}
          >
            최신순
          </button>
          <button
            onClick={() => handleSort('RATING_DESC')}
            className={`w-full px-16 py-12 text-left text-14 font-600 leading-[160%] hover:bg-basic-grey-50 ${
              sort === 'RATING_DESC'
                ? 'text-brand-primary-400'
                : 'text-basic-grey-700'
            }`}
          >
            별점높은순
          </button>
          <button
            onClick={() => handleSort('RATING_ASC')}
            className={`w-full px-16 py-12 text-left text-14 font-600 leading-[160%] hover:bg-basic-grey-50 ${
              sort === 'RATING_ASC'
                ? 'text-brand-primary-400'
                : 'text-basic-grey-700'
            }`}
          >
            별점낮은순
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterButton;
