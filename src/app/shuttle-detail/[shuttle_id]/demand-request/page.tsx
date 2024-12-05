'use client';

import AppBar from '@/components/app-bar/AppBar';
import BottomBar from '../components/BottomBar';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import GroupIcon from '/public/icons/group.svg';
import BxIcon from '/public/icons/bx-map.svg';
import Select from '@/components/select/Select';
import { BIG_REGIONS } from '@/constants/regions';
import PassengerCount from '../../utils/PassengerCount';

const DemandRequestPage = () => {
  const { back } = useRouter();

  return (
    <main>
      <AppBar handleBack={back}>수요 신청하기</AppBar>
      <BannerImage />
      <WriteForm />
      <BottomBar message="수요 신청 제출하기" doesHaveShareButton={false} />
    </main>
  );
};

export default DemandRequestPage;

export const BannerImage = () => {
  return (
    <figure className="relative m-16 h-[150px] overflow-hidden rounded-[10px] p-20">
      <Image
        src="/images/concert-sample.png"
        alt="banner"
        className="absolute rounded-[10px] object-cover"
        fill
      />
      <div className="absolute inset-0 bg-black/70" />

      <section className="absolute  flex flex-col gap-[12px]">
        <p className="line-clamp-2 text-18 font-700 leading-[25.2px] text-white">
          ATEEZ 2024 FANMEETING 〈ATINY’S VOYAGE FROM A TO Z〉
        </p>
        <div className="flex flex-col gap-[5px] text-12 font-400 leading-[14.32px] text-grey-200">
          <p className="flex gap-[2px]">
            <span>
              <GroupIcon />
            </span>
            <span className="line-clamp-2 ">
              ATEEZ, 아이유, THE VOLUNTEERS, ATEEZ, 아이유, THE VOLUNTEERS,
              ATEEZ, 아이유, THE VOLUNTEERS
            </span>
          </p>
          <p className="flex gap-[2px]">
            <span>
              <BxIcon />
            </span>
            <span className="line-clamp-1">잠실실내체육관</span>
          </p>
        </div>
      </section>
    </figure>
  );
};

const WriteForm = () => {
  return (
    <>
      <RouteInfo />
      <PassengerCount count={0} setCount={() => {}} />
      <JourneyLocationPicker />
    </>
  );
};

const RouteInfo = () => {
  return (
    <section className="flex flex-col gap-[16px] px-16 py-28">
      <h2 className="text-22 font-700 leading-[30.8px] text-grey-900">
        수요 신청하기 <span className="text-red-500">*</span>
      </h2>
      <Select
        isUnderLined={true}
        options={BIG_REGIONS}
        value=""
        setValue={() => {}}
        placeholder="일자"
      />
      <Select
        isUnderLined={true}
        options={BIG_REGIONS}
        value=""
        setValue={() => {}}
        placeholder="시/도"
      />
      <Select
        isUnderLined={true}
        options={[]}
        value=""
        setValue={() => {}}
        placeholder="시/군/구"
      />
      <Select
        isUnderLined={true}
        options={[]}
        value=""
        setValue={() => {}}
        placeholder="왕복/콘서트행/귀가행"
      />
    </section>
  );
};

const JourneyLocationPicker = () => {
  // const ROUTE_TYPE = {
  //   왕복행: '왕복행',
  //   귀가행: '귀가행',
  //   콘서트행: '콘서트행',
  // } as const;

  // type RouteType = (typeof ROUTE_TYPE)[keyof typeof ROUTE_TYPE];
  // const route: RouteType = ROUTE_TYPE.콘서트행;

  return (
    <section className="flex flex-col gap-[16px]  px-16 py-28">
      <h2 className="text-22 font-700 leading-[30.8px] text-grey-900">
        희망탑승/하차장소를 입력하세요
      </h2>
      {1 && (
        <section>
          <h3 className="text-16 font-500 leading-[25.6px] text-grey-600-sub">
            희망 하차 장소 (귀가행)
          </h3>
          <Select
            options={[]}
            value=""
            setValue={() => {}}
            isUnderLined={true}
            placeholder="희망 하차 장소를 선택해주세요"
          />
        </section>
      )}
      {1 && (
        <section>
          <h3 className="text-16 font-500 leading-[25.6px] text-grey-600-sub">
            희망 하차 장소 (왕복행)
          </h3>
          <Select
            options={[]}
            value=""
            setValue={() => {}}
            isUnderLined={true}
            placeholder="희망 하차 장소를 선택해주세요"
          />
        </section>
      )}
    </section>
  );
};
