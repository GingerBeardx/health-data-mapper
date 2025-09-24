'use client';

import useSWR from 'swr';
import type { GeoJSON } from '@/lib/types/geo';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useGeoData() {
  const { data: statesData, error: statesError, isLoading: statesLoading } = useSWR<GeoJSON>(
    '/data/us-states.json',
    fetcher
  );

  return {
    statesData,
    statesError,
    statesLoading,
    isLoading: statesLoading,
    error: statesError
  };
}