import Button from '@/components/buttons/button/Button';

interface Props {
  isDisabled: boolean;
  finalPrice: number;
  onSubmit: () => void;
}

const BottomBar = ({ isDisabled, finalPrice, onSubmit }: Props) => {
  return (
    <div className="fixed-centered-layout bottom-0 z-10 flex gap-8 bg-basic-white px-16 pb-24 pt-8">
      <Button
        variant="primary"
        size="large"
        type="button"
        disabled={isDisabled}
        onClick={onSubmit}
      >
        {finalPrice.toLocaleString()}원 결제하기
      </Button>
    </div>
  );
};

export default BottomBar;
