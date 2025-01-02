export interface ShuttleFormValues {
  dailyShuttle: {
    dailyShuttleId: number;
    date: string;
  };
  bigLocation: string;
  smallLocation: string;
  shuttleRoute?: {
    label: string;
    value: number;
  };
}
