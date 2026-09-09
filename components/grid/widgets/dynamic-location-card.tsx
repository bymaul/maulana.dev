'use client';

import dynamic from 'next/dynamic';
import { MapSkeleton } from './location-card';

export default dynamic(() => import('./location-card'), {
  ssr: false,
  loading: MapSkeleton,
});
