'use client';

import Chip from '@/components/chips/Chip';
import FilterButton from './FilterButton';
import { EventType } from '@/types/event.type';
import { EventSortType } from '@/app/event/event.const';

interface FilterBarProps {
  type: EventType;
  setType: (type: EventType) => void;
  sort: EventSortType;
  onSort: (sort: EventSortType) => void;
}

const FilterBar = ({ type, setType, sort, onSort }: FilterBarProps) => {
  return (
    <div className="sticky top-[48px] z-40 bg-basic-white">
      <div className="flex w-full justify-between px-16 pb-16 pt-12">
        <div className="flex gap-8">
          <Chip
            onClick={() => setType('CONCERT')}
            isSelected={type === 'CONCERT'}
          >
            콘서트
          </Chip>
          <Chip
            onClick={() => setType('FESTIVAL')}
            isSelected={type === 'FESTIVAL'}
          >
            페스티벌
          </Chip>
        </div>
        <FilterButton sort={sort} onSort={onSort} />
      </div>
    </div>
  );
};

export default FilterBar;
