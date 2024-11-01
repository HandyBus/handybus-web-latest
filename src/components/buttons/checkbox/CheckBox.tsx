interface Props {
  isChecked: boolean;
}

const CheckBox = ({ isChecked }: Props) => {
  return (
    <input
      type="checkbox"
      checked={isChecked}
      className='h-[18px] w-[18px] appearance-none rounded-full border border-grey-100 checked:border-0 checked:bg-[url("/icons/check.svg")] checked:bg-auto checked:bg-center checked:bg-no-repeat'
    />
  );
};

export default CheckBox;
