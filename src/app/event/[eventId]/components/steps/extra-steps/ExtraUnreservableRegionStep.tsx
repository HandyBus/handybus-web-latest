import Button from '@/components/buttons/button/Button';

interface Props {
  toExtraOpenSidoStep: () => void;
}

const ExtraUnreservableRegionStep = ({ toExtraOpenSidoStep }: Props) => {
  return (
    <section>
      <Button
        onClick={toExtraOpenSidoStep}
        variant="tertiary"
        size="large"
        type="button"
      >
        열린 셔틀 보기
      </Button>
    </section>
  );
};

export default ExtraUnreservableRegionStep;
