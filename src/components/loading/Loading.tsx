import { BeatLoader } from 'react-spinners';

interface Props {
  style?: 'screen' | 'grow';
}

const Loading = ({ style = 'screen' }: Props) => {
  return (
    <div
      className={`flex ${style === 'screen' ? 'h-[100dvh]' : 'grow'} items-center justify-center`}
    >
      <BeatLoader color="#9edbcc" />
    </div>
  );
};

export default Loading;
