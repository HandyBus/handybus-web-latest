import Chip from '@/components/chips/Chip';
import FilterButton from './FilterButton';

interface FilterBarProps {
  type: '콘서트' | '지역축제' | '페스티벌';
  setType: (type: '콘서트' | '지역축제' | '페스티벌') => void;
  sort: string;
  onSort: (sort: 'DATE_ASC' | 'NAME_ASC') => void;
}

const FilterBar = ({ type, setType, sort, onSort }: FilterBarProps) => {
  return (
    <div className="sticky top-[48px] z-40 bg-basic-white shadow-sm">
      <div className="flex w-full justify-between px-16 pb-16 pt-12">
        <div className="flex gap-8">
          <Chip
            onClick={() => setType('콘서트')}
            isSelected={type === '콘서트'}
          >
            콘서트
          </Chip>
          <Chip
            onClick={() => setType('지역축제')}
            isSelected={type === '지역축제'}
          >
            지역축제
          </Chip>
          <Chip
            onClick={() => setType('페스티벌')}
            isSelected={type === '페스티벌'}
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
