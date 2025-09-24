export interface HealthData {
  state: string;
  stateName: string;
  value: number;
  year: number;
  metric: string;
}

export interface StateHealthData {
  [stateName: string]: {
    [metric: string]: number;
  };
}