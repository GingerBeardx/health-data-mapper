'use client';

import { useState } from 'react';
import HealthMap from '@/components/map/HealthMap';
import DataSelector from '@/components/ui/DataSelector';
import { useGeoData } from '@/lib/hooks/useGeoData';
import { createMockHealthData } from '@/lib/utils/data-processing';

export default function Home() {
  const [selectedMetric, setSelectedMetric] = useState('autismRate');
  const { statesData, statesLoading, statesError } = useGeoData();
  const healthData = createMockHealthData();

  if (statesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading map data...</div>
      </div>
    );
  }

  if (statesError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">Error loading map data: {statesError.message}</div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 overflow-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm border-b flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <h1 className="text-xl font-bold text-gray-900">Health Data Mapper</h1>
          <p className="text-gray-600 text-sm">
            Visualizing public health data geographically to explore correlations
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 bg-white shadow-sm border-r p-4 overflow-y-auto flex-shrink-0">
          <DataSelector
            selectedMetric={selectedMetric}
            onMetricChange={setSelectedMetric}
          />

          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">About This Data</h3>
            <p className="text-sm text-gray-600 mb-2">
              This visualization uses mock health data to demonstrate geographic patterns in health outcomes.
            </p>
            <p className="text-sm text-gray-600">
              Hover over states to see detailed information. The colors represent relative values across all states.
            </p>
          </div>

          <div className="mt-4 bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-1">Phase 1 Complete</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>✓ Interactive US map</li>
              <li>✓ Choropleth visualization</li>
              <li>✓ State hover interactions</li>
              <li>✓ Multiple health metrics</li>
            </ul>
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative overflow-hidden">
          <HealthMap
            statesGeoJSON={statesData}
            healthData={healthData}
            selectedMetric={selectedMetric}
          />
        </div>
      </div>
    </div>
  );
}
