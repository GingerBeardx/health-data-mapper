export interface GeoFeature {
  type: 'Feature';
  properties: {
    name: string;
    density?: number;
    healthValue?: number | null;
    normalizedValue?: number | null;
    [key: string]: string | number | null | undefined;
  };
  geometry: {
    type: 'Polygon' | 'MultiPolygon';
    coordinates: number[][][] | number[][][][];
  };
  id?: string | number;
}

export interface GeoJSON {
  type: 'FeatureCollection';
  features: GeoFeature[];
}

export interface MapViewState {
  longitude: number;
  latitude: number;
  zoom: number;
  bearing?: number;
  pitch?: number;
}