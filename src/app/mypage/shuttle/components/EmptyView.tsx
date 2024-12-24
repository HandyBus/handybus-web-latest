import GreyBus from 'public/icons/grey-bus.svg';

const EmptyView = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 pt-40 text-16 font-400 text-grey-300">
      <GreyBus />
      <p className="text-lg font-bold">내역이 없어요</p>
    </div>
  );
};

export default EmptyView;
