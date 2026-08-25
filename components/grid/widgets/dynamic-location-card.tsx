'use client';

import dynamic from 'next/dynamic';

function MapSkeleton() {
  return <div className="size-full animate-pulse bg-gray-100 dark:bg-dark-800" />;
}

export default dynamic(() => import('./location-card'), {
  ssr: false,
  loading: MapSkeleton,
});
