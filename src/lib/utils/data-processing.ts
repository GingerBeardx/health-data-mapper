import type { GeoJSON, GeoFeature } from '@/lib/types/geo';
import type { StateHealthData } from '@/lib/types/health';

export function createMockHealthData(): StateHealthData {
  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia',
    'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
    'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
    'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia',
    'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  const mockData: StateHealthData = {};

  states.forEach(state => {
    mockData[state] = {
      autismRate: Math.random() * 3.0 + 0.5, // Autism rate between 0.5 and 3.5%
      asthmaRate: Math.random() * 15 + 5,     // Asthma rate between 5% and 20%
      obesityRate: Math.random() * 20 + 15    // Obesity rate between 15% and 35%
    };
  });

  return mockData;
}

export function normalizeValue(value: number, min: number, max: number): number {
  return (value - min) / (max - min);
}

export function getDataRange(healthData: StateHealthData, metric: string): [number, number] {
  const values = Object.values(healthData).map(state => state[metric]).filter(v => v !== undefined);
  return [Math.min(...values), Math.max(...values)];
}

export function joinHealthDataToGeoJSON(
  geoJSON: GeoJSON,
  healthData: StateHealthData,
  metric: string
): GeoJSON {
  const [min, max] = getDataRange(healthData, metric);

  const features: GeoFeature[] = geoJSON.features.map(feature => {
    const stateName = feature.properties.name;
    const stateData = healthData[stateName];
    const value = stateData ? stateData[metric] : null;
    const normalizedValue = value !== null ? normalizeValue(value, min, max) : null;

    return {
      ...feature,
      properties: {
        ...feature.properties,
        healthValue: value,
        normalizedValue: normalizedValue
      }
    };
  });

  return {
    ...geoJSON,
    features
  };
}