import ScheduleIcon from 'public/icons/schedule.svg';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 pb-16 pt-24">
      <ScheduleIcon />
      <p className="text-14 font-600 leading-[160%] text-basic-grey-500">
        행사를 준비하고 있어요.
      </p>
    </div>
  );
};

export default Loading;
