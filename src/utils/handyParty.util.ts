import { HANDY_PARTY_PREFIX } from '@/constants/common';
import {
  HANDY_PARTY_AREA_TO_ADDRESS,
  HandyPartyRouteArea,
} from '@/constants/handyPartyArea.const';
import { ShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';

const SEOUL_AREAS = [
  '동북권',
  '서북권',
  '중심권',
  '성동.광진권',
  '강서권',
  '서남권',
  '동남권',
];

// 주소가 핸디팟 노선 개설 지역인지 확인
export const checkIsPossibleHandyPartyArea = (
  address: string,
  possibleHandyPartyAreas: HandyPartyRouteArea[],
  selectedArea: HandyPartyRouteArea | '서울특별시',
) => {
  const itemHandyPartyArea = getHandyPartyArea(address);

  // 선택한 권역에 해당하지는지 확인 (selectedArea가 null인 경우 서울 지역만 가능)
  if (
    !itemHandyPartyArea ||
    (selectedArea !== '서울특별시' && selectedArea !== itemHandyPartyArea) ||
    (selectedArea === '서울특별시' && !SEOUL_AREAS.includes(itemHandyPartyArea))
  ) {
    return false;
  }

  // 개설된 노선 내에 해당하는지 확인
  const isPossibleArea = !!possibleHandyPartyAreas.find(
    (e) => e === itemHandyPartyArea,
  );

  return isPossibleArea;
};

// 주소를 핸디팟 권역으로 변환
export const getHandyPartyArea = (address: string) => {
  const [itemSido, itemGungu, itemDong] = address.split(' ');

  // HANDY_PARTY_AREA_TO_ADDRESS에서 sido가 동일하고 gungu가 배열에 포함되는 entry 찾기
  const matchingArea = Object.entries(HANDY_PARTY_AREA_TO_ADDRESS).find(
    ([, addressInfo]) => {
      const isSidoMatch = addressInfo.sido === itemSido;
      const isGunguMatch = addressInfo.gungu.some(
        (gungu) => itemGungu === gungu,
      );
      const isDongMatch = addressInfo.dong
        ? addressInfo.dong.some((dong) => itemDong === dong)
        : true;

      return isSidoMatch && isGunguMatch && isDongMatch;
    },
  ) as
    | [HandyPartyRouteArea, { sido: string; gungu: string[]; dong?: string[] }]
    | undefined;

  return matchingArea ? matchingArea[0] : null;
};

export const checkIsHandyParty = (
  shuttleRoute: ShuttleRoutesViewEntity | null | undefined,
) => {
  if (!shuttleRoute) {
    return false;
  }

  return shuttleRoute.name.includes(HANDY_PARTY_PREFIX);
};
