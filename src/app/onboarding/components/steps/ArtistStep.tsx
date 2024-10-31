interface Props {
  handlePrevStep: () => void;
}

const ArtistStep = ({ handlePrevStep }: Props) => {
  return (
    <div>
      4 최애 가수
      <button type="button" onClick={handlePrevStep}>
        이전으로
      </button>
    </div>
  );
};

export default ArtistStep;
