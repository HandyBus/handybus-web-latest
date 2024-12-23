export interface DemandRequestFormValues {
  dailyShuttle: {
    dailyShuttleId: number;
    date: string;
  };
  bigLocation: string;
  smallLocation: string;
  regionId: string;
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
  regionId: string | undefined;
  type: string | undefined;
  passengerCount: number | undefined;
  pickup?:
    | { hubId: number | undefined | null }
    | { customHub: string | undefined | null }
    | undefined;
  dropoff?:
    | { hubId: number | undefined | null }
    | { customHub: string | undefined | null }
    | undefined;
};

export interface DemandWriteSearchParams {
  dailyShuttleId?: string;
  bigLocation?: string;
  smallLocation?: string;
  regionId?: string;
}
