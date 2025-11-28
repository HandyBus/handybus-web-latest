import RightChevronIcon from 'public/icons/chevron-right.svg';

const ViewAllButton = () => {
  return (
    <div
      className={`grid h-48 w-48 place-items-center rounded-full bg-basic-grey-50 text-14 font-600 leading-[160%] text-basic-grey-700 transition-colors group-active:bg-basic-grey-100`}
    >
      <RightChevronIcon className="stroke-[1.5] text-brand-primary-400" />
    </div>
  );
};

export default ViewAllButton;
