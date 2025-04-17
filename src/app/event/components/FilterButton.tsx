import OrderIcon from 'public/icons/order.svg';
import { useEffect, useRef, useState } from 'react';

interface FilterButtonProps {
  sort: string;
  onSort: (sort: 'DATE_ASC' | 'NAME_ASC') => void;
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

  const handleSort = (newSort: 'DATE_ASC' | 'NAME_ASC') => {
    onSort(newSort);
    setFilterOpen(false);
  };

  return (
    <div className="relative" ref={filterRef}>
      <button
        onClick={() => setFilterOpen(!filterOpen)}
        className="flex h-full items-center "
      >
        <OrderIcon className="h-24 w-24" />
      </button>
      {filterOpen && (
        <div className="absolute right-[10px] top-[32px] z-50 w-[140px] rounded-[8px] border border-basic-grey-200 bg-basic-white shadow-lg">
          <button
            onClick={() => handleSort('DATE_ASC')}
            className={`w-full px-16 py-12 text-left text-14 font-600 leading-[160%] hover:bg-basic-grey-50 ${
              sort === 'DATE_ASC'
                ? 'text-brand-primary-400'
                : 'text-basic-grey-700'
            }`}
          >
            행사 임박 순
          </button>
          <button
            onClick={() => handleSort('NAME_ASC')}
            className={`w-full px-16 py-12 text-left text-14 font-600 leading-[160%] hover:bg-basic-grey-50 ${
              sort === 'NAME_ASC'
                ? 'text-brand-primary-400'
                : 'text-basic-grey-700'
            }`}
          >
            가나다 순
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterButton;
