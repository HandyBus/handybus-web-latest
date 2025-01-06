export interface HubsType {
  toDestination: HubType[];
  fromDestination: HubType[];

  destination: {
    name: string;
    sequence: number;
    regionId: number;
    arrivalTime: string;
  };
}

export interface HubType {
  shuttleRouteHubId: number;
  name: string;
  sequence: number;
  arrivalTime: string;
  regionId?: number;
  selected?: boolean;
}

export type HubWithSelectedType = HubType & { selected: boolean };

export interface RegionHubType {
  regionHubId: number;
  regionId: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}
