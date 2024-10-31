interface Props {
  handleNextStep: () => void;
  handlePrevStep: () => void;
}

const PersonalInfoStep = ({ handleNextStep, handlePrevStep }: Props) => {
  return (
    <div>
      2 개인 정보
      <button type="button" onClick={handlePrevStep}>
        이전으로
      </button>
      <button type="button" onClick={handleNextStep}>
        다음으로
      </button>
    </div>
  );
};

export default PersonalInfoStep;
