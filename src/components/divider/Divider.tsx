import { twMerge } from 'tailwind-merge';

interface Props {
  className?: string;
}

const Divider = ({ className }: Props) => {
  return (
    <div className={twMerge('my-16 h-8 w-full bg-basic-grey-50', className)} />
  );
};

export default Divider;
