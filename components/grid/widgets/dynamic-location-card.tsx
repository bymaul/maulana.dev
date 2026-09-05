'use client';

import { MapSkeleton } from './location-card';
import dynamic from 'next/dynamic';

export default dynamic(() => import('./location-card'), {
  ssr: false,
  loading: MapSkeleton,
});
