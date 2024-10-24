'use client';

interface TabItem {
  label: string;
  value: string;
}

interface Props {
  items: TabItem[];
  selected: string;
  onSelect?: (value: string) => void;
}

const Tabs = ({ items, selected, onSelect }: Props) => {
  return (
    <div className="flex flex-row border-b border-b-grey-100">
      {items.flatMap((v) => (
        <button
          className={
            v.value === selected
              ? 'border-b-2 border-b-black p-8'
              : 'p-8 text-grey-500'
          }
          onClick={() => onSelect?.(v.value)}
        >
          {v.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
