'use client';

import Chip from '@/components/chips/Chip';
import FilterButton from './FilterButton';
import { EventSortType } from '@/app/event/event.const';
import { EventTypeWithAll } from '../page';

interface FilterBarProps {
  type: EventTypeWithAll;
  setType: (type: EventTypeWithAll) => void;
  sort: EventSortType;
  onSort: (sort: EventSortType) => void;
}

const FilterBar = ({ type, setType, sort, onSort }: FilterBarProps) => {
  return (
    <div className="sticky top-[48px] z-40 bg-basic-white">
      <div className="flex w-full justify-between px-16 pb-16 pt-12">
        <div className="flex gap-8">
          <Chip onClick={() => setType('ALL')} isSelected={type === 'ALL'}>
            전체
          </Chip>
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
          <Chip
            onClick={() => setType('SPORTS')}
            isSelected={type === 'SPORTS'}
          >
            스포츠
          </Chip>
        </div>
        <FilterButton sort={sort} onSort={onSort} />
      </div>
    </div>
  );
};

export default FilterBar;
