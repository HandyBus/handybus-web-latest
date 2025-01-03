export const SHUTTLE_BUS_TYPE_TO_STRING = {
  SMALL_BUS_28: '28인승 우등버스',
  LIMOUSINE_BUS_31: '31인승 리무진버스',
  SPRINTER_12: '12인승 스프린터',
  VAN_12: '12인승 밴',
  MINIBUS_24: '24인승 미니버스',
  LARGE_BUS_45: '45인승 대형버스',
  LARGE_BUS_41: '41인승 대형버스',
  PREMIUM_BUS_21: '21인승 프리미엄버스',
  MEDIUM_BUS_21: '21인승 중형우등버스',
  SMALL_BUS_33: '33인승 우등버스',
} as const;

export type ShuttleBusType = keyof typeof SHUTTLE_BUS_TYPE_TO_STRING;
