import AlarmIcon from '../icons/alarm.svg';

const EmptyView = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 pt-40">
      <AlarmIcon />
      <p className="pb-12 text-14 font-600 text-basic-grey-500">
        요청한 알림이 없어요
      </p>
    </div>
  );
};

export default EmptyView;
