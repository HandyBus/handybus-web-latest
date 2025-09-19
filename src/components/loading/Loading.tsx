import { BeatLoader } from 'react-spinners';
import { customTwMerge } from 'tailwind.config';

interface Props {
  style?: 'screen' | 'grow';
  className?: string;
}

const Loading = ({ style = 'screen', className }: Props) => {
  return (
    <div
      className={customTwMerge(
        `flex ${style === 'screen' ? 'h-[100dvh]' : 'grow'} items-center justify-center`,
        className,
      )}
    >
      <BeatLoader color="#9edbcc" />
    </div>
  );
};

export default Loading;
