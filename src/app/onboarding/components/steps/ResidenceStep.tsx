interface Props {
  handleNextStep: () => void;
  handlePrevStep: () => void;
}

const ResidenceStep = ({ handleNextStep, handlePrevStep }: Props) => {
  return (
    <div>
      3 거주지
      <button type="button" onClick={handlePrevStep}>
        이전으로
      </button>
      <button type="button" onClick={handleNextStep}>
        다음으로
      </button>
    </div>
  );
};

export default ResidenceStep;
