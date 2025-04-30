'use client';

import Chip from '@/components/chips/Chip';
import FilterButton from './FilterButton';
import { EventType } from '@/types/event.type';
import { EventSort } from '../event.const';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

interface FilterBarProps {
  type: EventType;
  setType: (type: EventType) => void;
  sort: EventSort;
  onSort: (sort: EventSort) => void;
}

const FilterBar = ({ type, sort }: FilterBarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTypeChange = (newType: 'CONCERT' | 'FESTIVAL') => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('type', newType);
    router.push(`/event?${params.toString()}`);
  };

  const handleSortChange = (newSort: 'DATE_ASC' | 'NAME_ASC') => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', newSort);
    router.push(`/event?${params.toString()}`);
  };

  return (
    <div className="sticky top-[48px] z-40 bg-basic-white shadow-sm">
      <div className="flex w-full justify-between px-16 pb-16 pt-12">
        <div className="flex gap-8">
          <Chip
            onClick={() => handleTypeChange('CONCERT')}
            isSelected={type === 'CONCERT'}
          >
            콘서트
          </Chip>
          <Chip
            onClick={() => handleTypeChange('FESTIVAL')}
            isSelected={type === 'FESTIVAL'}
          >
            페스티벌
          </Chip>
        </div>
        <FilterButton sort={sort} onSort={handleSortChange} />
      </div>
    </div>
  );
};

export default FilterBar;
