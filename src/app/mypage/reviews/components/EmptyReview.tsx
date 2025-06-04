import ReviewIcon from '../icons/icon-reviews.svg';

interface Props {
  variant: 'writable-review' | 'written-review';
}

const EmptyReview = ({ variant }: Props) => {
  return (
    <div className="flex w-full flex-col items-center gap-4 py-44">
      <ReviewIcon className="text-basic-grey-300" />
      <span className="text-16 font-400 text-basic-grey-300">
        {variant === 'writable-review'
          ? '아직 작성할 수 있는 후기가 없어요'
          : variant === 'written-review'
            ? '작성한 후기가 없어요'
            : ''}
      </span>
    </div>
  );
};

export default EmptyReview;
