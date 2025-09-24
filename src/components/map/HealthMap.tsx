'use client';

import React, { useState, useCallback, useRef } from 'react';
import Map, { Source, Layer, MapRef } from 'react-map-gl/mapbox';
import type { MapViewState, GeoJSON, GeoFeature } from '@/lib/types/geo';
import type { StateHealthData } from '@/lib/types/health';
import type { LayerProps, MapMouseEvent } from 'react-map-gl/mapbox';

interface HoverInfo {
  feature: GeoFeature;
  x: number;
  y: number;
}

const INITIAL_VIEW_STATE: MapViewState = {
  longitude: -98.5,
  latitude: 39.8,
  zoom: 4
};

interface HealthMapProps {
  statesGeoJSON?: GeoJSON;
  healthData?: StateHealthData;
  selectedMetric?: string;
}

export default function HealthMap({ statesGeoJSON, healthData, selectedMetric = 'autismRate' }: HealthMapProps) {
  const [viewState, setViewState] = useState<MapViewState>(INITIAL_VIEW_STATE);
  const [hoverInfo, setHoverInfo] = useState<HoverInfo | null>(null);
  const mapRef = useRef<MapRef>(null);

  // Pre-process GeoJSON with health data
  const processedGeoJSON = React.useMemo(() => {
    if (!statesGeoJSON || !healthData) return null;

    const allValues = Object.values(healthData).map(state => state[selectedMetric]).filter(v => v !== undefined);
    const min = Math.min(...allValues);
    const max = Math.max(...allValues);

    const features = statesGeoJSON.features.map(feature => {
      const stateName = feature.properties.name;
      const stateData = healthData[stateName];
      const value = stateData ? stateData[selectedMetric] : null;
      const normalizedValue = value !== null && max !== min ? (value - min) / (max - min) : null;

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
      ...statesGeoJSON,
      features
    };
  }, [statesGeoJSON, healthData, selectedMetric]);

  const onHover = useCallback((event: MapMouseEvent) => {
    const {
      features,
      point: { x, y }
    } = event;
    const hoveredFeature = features && features[0] as unknown as GeoFeature;

    setHoverInfo(hoveredFeature ? { feature: hoveredFeature, x, y } : null);
  }, []);



  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  if (!mapboxToken) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">Mapbox token not found</p>
      </div>
    );
  }

  // Choropleth layer using property-based coloring
  const dataLayer: LayerProps = {
    id: 'health-data',
    type: 'fill',
    paint: {
      'fill-color': [
        'case',
        ['!=', ['get', 'normalizedValue'], null],
        [
          'interpolate',
          ['linear'],
          ['get', 'normalizedValue'],
          0, '#eff3ff',    // Very light blue
          0.125, '#c6dbef', // Light blue
          0.25, '#9ecae1',  // Medium-light blue
          0.375, '#6baed6', // Medium blue
          0.5, '#4292c6',   // Medium-dark blue
          0.625, '#2171b5', // Dark blue
          0.75, '#08519c',  // Very dark blue
          1.0, '#08306b'    // Darkest blue
        ],
        '#e5e5e5'  // Gray for states with no data
      ],
      'fill-opacity': 0.85
    }
  };

  const borderLayer: LayerProps = {
    id: 'state-borders',
    type: 'line',
    paint: {
      'line-color': '#ffffff',
      'line-width': 1
    }
  };

  const hoverLayer: LayerProps = {
    id: 'state-hover',
    type: 'line',
    paint: {
      'line-color': '#000000',
      'line-width': 2,
      'line-opacity': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        1,
        0
      ]
    }
  };

  const stateLabelsLayer: LayerProps = {
    id: 'state-labels',
    type: 'symbol',
    layout: {
      'text-field': ['get', 'name'],
      'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      'text-size': 12,
      'text-transform': 'uppercase',
      'text-letter-spacing': 0.1,
      'text-offset': [0, 0],
      'text-anchor': 'center'
    },
    paint: {
      'text-color': '#ffffff',
      'text-halo-color': '#000000',
      'text-halo-width': 2,
      'text-halo-blur': 1
    }
  };

  const formatMetricName = (metric: string): string => {
    switch (metric) {
      case 'autismRate': return 'Autism Rate';
      case 'asthmaRate': return 'Asthma Rate';
      case 'obesityRate': return 'Obesity Rate';
      default: return metric;
    }
  };

  return (
    <div className="relative w-full h-full">
      <div className="w-full h-full">
        <Map
          ref={mapRef}
          {...viewState}
          onMove={evt => setViewState(evt.viewState)}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={mapboxToken}
          onMouseMove={onHover}
          onMouseLeave={() => setHoverInfo(null)}
          interactiveLayerIds={['health-data']}
        >
        {processedGeoJSON && (
          <Source id="states" type="geojson" data={processedGeoJSON as unknown as import('geojson').FeatureCollection}>
            <Layer {...dataLayer} />
            <Layer {...borderLayer} />
            <Layer {...hoverLayer} />
            <Layer {...stateLabelsLayer} />
          </Source>
        )}
        </Map>
      </div>

      {hoverInfo && (
        <div
          className="absolute z-10 pointer-events-none bg-white p-3 rounded-lg shadow-lg border max-w-xs"
          style={{
            left: hoverInfo.x + 10,
            top: hoverInfo.y - 10
          }}
        >
          <div className="font-semibold text-gray-800 mb-1">
            {hoverInfo.feature.properties.name}
          </div>
          {healthData && hoverInfo.feature.properties.name && healthData[hoverInfo.feature.properties.name] && (
            <div className="text-sm text-gray-600">
              <div>{formatMetricName(selectedMetric)}: {healthData[hoverInfo.feature.properties.name][selectedMetric]?.toFixed(2)}%</div>
            </div>
          )}
          {(!healthData || !healthData[hoverInfo.feature.properties.name]) && (
            <div className="text-sm text-gray-500">No data available</div>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg border">
        <div className="font-semibold text-sm mb-3">{formatMetricName(selectedMetric)}</div>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-4 rounded" style={{background: 'linear-gradient(to right, #eff3ff, #c6dbef, #9ecae1, #6baed6, #4292c6, #2171b5, #08519c, #08306b)'}}></div>
            <div className="text-xs text-gray-600">Low → High</div>
          </div>
          {healthData && (
            <div className="text-xs text-gray-500">
              {(() => {
                const values = Object.values(healthData).map(state => state[selectedMetric]).filter(v => v !== undefined);
                const min = Math.min(...values).toFixed(1);
                const max = Math.max(...values).toFixed(1);
                return `${min}% - ${max}%`;
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}