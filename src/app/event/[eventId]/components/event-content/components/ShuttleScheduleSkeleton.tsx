import Skeleton from 'react-loading-skeleton';

const ShuttleScheduleSkeleton = () => {
  return (
    <section className="px-16 pb-24">
      <div className="-mx-16 mb-24 h-8 w-[calc(100%+32px)] bg-basic-grey-50" />
      <div className="pb-16">
        <Skeleton width="45%" height={24} />
      </div>

      <div className="mb-4 flex gap-[3px] rounded-[6px] bg-basic-grey-50 p-8">
        <Skeleton width="100%" height={28} />
      </div>

      <div className="flex gap-[6px]">
        <section className="w-full space-y-[1px]">
          <div className="flex items-center gap-[9px] px-8 py-16">
            <Skeleton width="170px" height={16} />
          </div>
          <div className="h-[1px] border border-basic-grey-100" />
          <div className="flex items-center gap-[9px] px-8 py-16">
            <Skeleton width="170px" height={16} />
          </div>
          <div className="h-[1px] border border-basic-grey-100" />
          <div className="flex items-center gap-[9px] px-8 py-16">
            <Skeleton width="170px" height={16} />
          </div>
          <div className="h-[1px] border border-basic-grey-100" />
          <div className="flex items-center gap-[9px] px-8 py-16">
            <Skeleton width="170px" height={16} />
          </div>
        </section>
      </div>
    </section>
  );
};

export default ShuttleScheduleSkeleton;
