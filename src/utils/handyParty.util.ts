import { HANDY_PARTY_PREFIX } from '@/constants/common';
import {
  HANDY_PARTY_AREA_TO_ADDRESS,
  HandyPartyRouteArea,
} from '@/constants/handyPartyArea.const';
import { ShuttleRoutesViewEntity } from '@/types/shuttleRoute.type';

// 주소가 핸디팟 노선 개설 지역인지 확인
export const checkIsPossibleHandyPartyArea = (
  address: string,
  possibleHandyPartyAreas: HandyPartyRouteArea[],
  selectedArea: HandyPartyRouteArea,
) => {
  const itemHandyPartyArea = getHandyPartyArea(address);

  // 선택한 권역에 해당하지는지 확인
  if (!itemHandyPartyArea || selectedArea !== itemHandyPartyArea) {
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
