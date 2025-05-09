import Button from '@/components/buttons/button/Button';

interface Props {
  isDisabled: boolean;
  finalPrice: number;
  onSubmit: () => void;
}

const BottomBar = ({ isDisabled, finalPrice, onSubmit }: Props) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 mx-auto flex max-w-500 gap-8 bg-basic-white px-16 pb-24 pt-8">
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
