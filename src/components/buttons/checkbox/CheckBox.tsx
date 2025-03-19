interface Props {
  isChecked: boolean;
  setIsChecked?: (value: boolean) => void;
}

const CheckBox = ({ isChecked, setIsChecked }: Props) => {
  return (
    <input
      type="checkbox"
      checked={isChecked}
      className='border-basic-grey-500 h-[18px] w-[18px] shrink-0 cursor-pointer appearance-none rounded-full border checked:border-0 checked:bg-[url("/icons/check.svg")] checked:bg-auto checked:bg-center checked:bg-no-repeat'
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => {
        if (setIsChecked) {
          setIsChecked(e.target.checked);
        }
      }}
    />
  );
};

export default CheckBox;
