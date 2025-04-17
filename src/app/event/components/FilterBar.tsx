import Chip from '@/components/chips/Chip';
import FilterButton from './FilterButton';

interface FilterBarProps {
  type: 'CONCERT' | 'FESTIVAL';
  setType: (type: 'CONCERT' | 'FESTIVAL') => void;
  sort: string;
  onSort: (sort: 'DATE_ASC' | 'NAME_ASC') => void;
}

const FilterBar = ({ type, setType, sort, onSort }: FilterBarProps) => {
  return (
    <div className="sticky top-[48px] z-40 bg-basic-white shadow-sm">
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
