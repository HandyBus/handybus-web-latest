import { BIG_REGIONS_TO_SHORT_NAME } from '@/constants/regions';

import { BigRegionsType } from '@/constants/regions';

interface Props {
  sido: BigRegionsType;
  onClick: () => void;
  disabled?: boolean;
}

const SidoButton = ({ sido, onClick, disabled }: Props) => {
  return (
    <button
      type="button"
      className="h-[50px] flex-1 rounded-8 bg-basic-grey-100 text-16 font-600 text-basic-grey-700 disabled:text-basic-grey-300 active:[&:not([disabled])]:bg-basic-grey-200"
      onClick={onClick}
      disabled={disabled}
    >
      {BIG_REGIONS_TO_SHORT_NAME[sido]}
    </button>
  );
};

export default SidoButton;
