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
      <Spinner />
    </div>
  );
};

export default Loading;

const Spinner = () => {
  return (
    <div className="relative h-48 w-48">
      <div className="absolute inset-0 rounded-full border-[6px] border-basic-grey-100" />
      <div className="absolute inset-0 animate-spin rounded-full border-[6px] border-transparent border-t-brand-primary-300" />
    </div>
  );
};
