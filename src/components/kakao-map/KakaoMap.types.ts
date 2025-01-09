interface KakaoLatLng {
  getLat(): number;
  getLng(): number;
  equals(latlng: KakaoLatLng): boolean;
  toString(): string;
}

interface KakaoMapOptions {
  center: KakaoLatLng;
  level: number;
  draggable?: boolean;
  scrollwheel?: boolean;
}

interface KakaoMap {
  setCenter(latlng: KakaoLatLng): void;
  setLevel(level: number): void;
  setDraggable(draggable: boolean): void;
  setZoomable(zoomable: boolean): void;
  getCenter(): KakaoLatLng;
  getLevel(): number;
}

interface KakaoMarkerOptions {
  position: KakaoLatLng;
  clickable?: boolean;
  zIndex?: number;
}

interface KakaoMarker {
  setMap(map: KakaoMap | null): void;
  setPosition(position: KakaoLatLng): void;
  setVisible(visible: boolean): void;
}

export interface KakaoMapsAPI {
  load: (callback: () => void) => void;
  LatLng: new (lat: number, lng: number) => KakaoLatLng;
  Map: new (container: HTMLElement, options: KakaoMapOptions) => KakaoMap;
  Marker: new (options: KakaoMarkerOptions) => KakaoMarker;
  services: {
    Status: {
      OK: string;
    };
    Geocoder: new () => {
      coord2Address: (
        lat: number,
        lng: number,
        callback: (
          result: any, // eslint-disable-line @typescript-eslint/no-explicit-any
          status: any, // eslint-disable-line @typescript-eslint/no-explicit-any
        ) => void,
      ) => void;
    };
  };
}
