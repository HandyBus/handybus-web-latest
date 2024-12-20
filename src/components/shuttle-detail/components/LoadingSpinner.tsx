import SpinnerIcon from '/public/icons/spinner.svg';

const LoadingSpinner = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 px-16 py-28">
      <div className="flex h-[115px] items-center justify-center ">
        <SpinnerIcon
          className="animate-spin"
          viewBox="0 0 24 24"
          width={19.5}
          height={19.5}
        />
      </div>
      <div className="text-16 font-400 leading-[24px] text-grey-300">
        수요 신청 정보를 불러오는 중 ...
      </div>
    </div>
  );
};

export default LoadingSpinner;
