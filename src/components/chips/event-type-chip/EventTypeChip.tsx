import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  isSelected?: boolean;
}

const EventTypeChip = ({ isSelected, children }: Props) => {
  return (
    <div
      className={`w-fit rounded-[28px] px-12 py-8 text-14 font-600 leading-[160%]  ${
        isSelected
          ? 'bg-brand-primary-400 text-basic-white active:bg-brand-primary-500'
          : 'bg-basic-grey-100 text-basic-grey-700 active:bg-basic-grey-200'
      }`}
    >
      {children}
    </div>
  );
};

export default EventTypeChip;
