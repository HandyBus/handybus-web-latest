import RightChevronIcon from 'public/icons/chevron-right.svg';

interface Props {
  onClick: () => void;
}

const ViewAllButton = ({ onClick }: Props) => {
  return (
    <button
      className="grid h-48 w-48 place-items-center rounded-full bg-basic-grey-100 text-14 font-600 leading-[160%] text-basic-grey-700 active:bg-basic-grey-200"
      onClick={onClick}
    >
      <RightChevronIcon className="stroke-[1.5] text-brand-primary-400" />
    </button>
  );
};

export default ViewAllButton;
