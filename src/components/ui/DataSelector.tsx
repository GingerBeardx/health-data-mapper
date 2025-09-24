'use client';

interface DataSelectorProps {
  selectedMetric: string;
  onMetricChange: (metric: string) => void;
}

const HEALTH_METRICS = [
  { value: 'autismRate', label: 'Autism Rate' },
  { value: 'asthmaRate', label: 'Asthma Rate' },
  { value: 'obesityRate', label: 'Obesity Rate' }
];

export default function DataSelector({ selectedMetric, onMetricChange }: DataSelectorProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border">
      <h3 className="font-semibold text-gray-800 mb-3">Select Health Metric</h3>
      <div className="space-y-2">
        {HEALTH_METRICS.map((metric) => (
          <label key={metric.value} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="healthMetric"
              value={metric.value}
              checked={selectedMetric === metric.value}
              onChange={(e) => onMetricChange(e.target.value)}
              className="text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{metric.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}