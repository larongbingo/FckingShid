export const getLocation: (options?: GeoOptions) => Promise<GeolocationPosition> = (options?: GeoOptions) => {
  return new Promise((resolve, reject) => {
     navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

type GeoOptions = {
  timeout?: number;
  maximumAge?: number;
  enableHighAccuracy?: boolean;
  distanceFilter?: number;
  useSignificantChanges?: boolean;
};
