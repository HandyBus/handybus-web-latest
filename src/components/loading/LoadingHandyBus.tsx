const LoadingHandyBus = () => {
  return (
    <div className="relative h-[87px] w-[216px] overflow-hidden">
      <div className="absolute bottom-0 left-0 flex h-[87px] w-[427px] animate-moveRoad">
        <img
          src="/icons/loading/road.svg"
          className="h-[87px] w-[427px]"
          alt="loading road"
        />
        <img
          src="/icons/loading/road.svg"
          className="h-[87px] w-[427px]"
          alt="loading road"
        />
      </div>
      <img
        src="/icons/loading/bus.svg"
        className="bottom-6 absolute left-1/2 z-10 h-[87px] w-[213px] -translate-x-1/2"
        alt="loading bus"
      />
    </div>
  );
};

export default LoadingHandyBus;
