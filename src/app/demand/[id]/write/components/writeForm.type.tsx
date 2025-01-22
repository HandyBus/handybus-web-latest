export interface DemandRequestFormValues {
  dailyEvent: {
    dailyEventId: number;
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
