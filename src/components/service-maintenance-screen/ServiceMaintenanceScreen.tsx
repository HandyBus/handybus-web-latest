import ServiceMaintenanceIcon from 'public/icons/service-maintenance.svg';

const ServiceMaintenanceScreen = () => {
  return (
    <main className="flex h-full w-full flex-col items-center">
      <div className="mt-48 flex w-full flex-col items-center gap-8 px-16">
        <ServiceMaintenanceIcon />
        <h2 className="pb-16 pt-8 text-center text-20 font-700 leading-[140%]">
          죄송합니다
          <br />
          현재 서비스 점검 중입니다
        </h2>
        <div className="h-[1px] w-full bg-basic-grey-100" />
        <div className="flex flex-col items-center gap-8 py-16 text-center">
          <h4 className="text-18 font-700"></h4>
          <p className="text-14 font-500 leading-[160%] text-basic-grey-600">
            안정적인 서비스 제공을 위해 시스템 점검 및 업데이트를
            <br />
            진행 중입니다. 잠시 후 다시 이용해 주세요.
          </p>
        </div>
      </div>
    </main>
  );
};

export default ServiceMaintenanceScreen;
