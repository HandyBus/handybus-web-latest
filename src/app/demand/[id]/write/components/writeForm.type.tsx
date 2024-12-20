export interface DemandRequestFormValues {
  dailyShuttle: {
    id: number;
    date: string;
  };
  bigLocation: string;
  smallLocation: string;
  regionID: string;
  routeType: string;
  passengerCount: number;
  destinationStop?: {
    hubId?: number | null;
    name: string;
    isCustom: boolean;
    customHub?: string | null;
  };
  returnStop?: {
    hubId?: number | null;
    name: string;
    isCustom: boolean;
    customHub?: string | null;
  };
}

export type SubmitData = {
  regionID: string | undefined;
  type: string | undefined;
  passengerCount: number | undefined;
  pickup?:
    | { hubID: number | undefined | null }
    | { customHub: string | undefined | null }
    | undefined;
  dropoff?:
    | { hubID: number | undefined | null }
    | { customHub: string | undefined | null }
    | undefined;
};

export interface DemandWriteSearchParams {
  dailyShuttleID?: string;
  bigLocation?: string;
  smallLocation?: string;
  regionID?: string;
}
