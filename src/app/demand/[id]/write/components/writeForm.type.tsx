export interface DemandRequestFormValues {
  dailyEvent: {
    dailyEventId: string;
    date: string;
  };
  bigLocation: string;
  smallLocation: string;
  regionId: string;
  routeType: string;
  passengerCount: number;
  destinationStop?: {
    hubId?: string | null;
    name: string;
    isCustom: boolean;
    customHub?: string | null;
  };
  returnStop?: {
    hubId?: string | null;
    name: string;
    isCustom: boolean;
    customHub?: string | null;
  };
}
