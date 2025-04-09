import Section from '../Section';
import DotIcon from '../../icons/dot-primary.svg';
import PinIcon from '../../icons/pin-primary.svg';

const ShuttleRouteInfoSection = () => {
  return (
    <Section heading="셔틀 정보">
      <TripCard />
      <TripCard />
    </Section>
  );
};

export default ShuttleRouteInfoSection;

const TripCard = () => {
  return (
    <article className="w-full overflow-hidden rounded-16 border-[1.5px] border-basic-grey-100">
      <div className="w-full bg-basic-grey-50 p-8 text-center text-14 font-600 leading-[160%]">
        [왕복] 가는 편
      </div>
      <div className="flex gap-16 p-16">
        <div className="flex w-12 shrink-0 flex-col items-center py-[10px]">
          <DotIcon />
          <div className="-my-[2px] h-[54px] w-[2px] bg-brand-primary-400" />
          <PinIcon />
        </div>
        <div className="flex flex-col gap-24">
          <li className="flex h-36 items-center gap-16">
            <div className="w-80 shrink-0">
              <p className="text-10 font-400 text-basic-grey-700">
                YYYY.MM.DD (금)
              </p>
              <p className="text-12 font-600">오전 10:30</p>
            </div>
            <div className="h-16 w-[1px] bg-basic-grey-100" />
            <div className="text-16 font-600">정류장명</div>
          </li>
          <li className="flex h-36 items-center gap-16">
            <div className="w-80 shrink-0">
              <p className="text-10 font-400 text-basic-grey-700">
                YYYY.MM.DD (금)
              </p>
              <p className="text-12 font-600">오전 10:30</p>
            </div>
            <div className="h-16 w-[1px] bg-basic-grey-100" />
            <div className="text-16 font-600">정류장명</div>
          </li>
        </div>
      </div>
      <div className="flex w-full border-t-[1.5px] border-basic-grey-100">
        <div className="flex flex-1 flex-col items-center gap-4 border-r-[1px] border-basic-grey-100 py-8">
          <p className="text-12 font-600 leading-[160%] text-basic-grey-500">
            인원
          </p>
          <span className="text-16 font-600 leading-[160%]">N명</span>
        </div>
        <div className="flex flex-1 flex-col items-center gap-4 border-l-[1px] border-basic-grey-100 py-8">
          <p className="text-12 font-600 leading-[160%] text-basic-grey-500">
            좌석
          </p>
          <span className="text-16 font-600 leading-[160%]">자유석</span>
        </div>
      </div>
    </article>
  );
};
