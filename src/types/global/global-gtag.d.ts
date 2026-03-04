interface AmplitudeIdentify {
  set: (key: string, value: string | null) => AmplitudeIdentify;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: (...args: any[]) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: any[];
    amplitude: {
      setUserId: (userId: string) => void;
      identify: (identify: AmplitudeIdentify) => void;
      Identify: new () => AmplitudeIdentify;
    };
  }
}

export {};
