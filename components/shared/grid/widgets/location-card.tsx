'use client';

import Card from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { Map, MapRef } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAX_ZOOM = 9;
const MIN_ZOOM = 1;

const INITIAL_VIEW_STATE = {
  latitude: -7.7962967,
  longitude: 110.3667211,
  zoom: MAX_ZOOM,
};

const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function LocationCard() {
  const [currentZoom, setCurrentZoom] = useState(MAX_ZOOM);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const mapRef = useRef<MapRef>(null);
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    const map = mapRef.current?.getMap();

    if (!map || !isMapLoaded || !resolvedTheme) {
      return;
    }

    map.setConfigProperty('basemap', 'lightPreset', isDark ? 'night' : 'day');
    map.setConfigProperty('basemap', 'theme', isDark ? 'monochrome' : 'default');
  }, [isDark, isMapLoaded, resolvedTheme]);

  const handleZoom = (zoomIn: boolean) => {
    setCurrentZoom((prev) => {
      const newZoom = prev + (zoomIn ? 1 : -1);

      if (newZoom < MIN_ZOOM || newZoom > MAX_ZOOM) {
        return prev;
      }

      if (zoomIn) {
        mapRef.current?.zoomIn();
      } else {
        mapRef.current?.zoomOut();
      }

      return newZoom;
    });
  };

  return (
    <Card className="relative size-full">
      <Map
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/standard"
        ref={mapRef}
        config={{
          basemap: {
            lightPreset: isDark ? 'night' : 'day',
            theme: isDark ? 'monochrome' : 'default',
            showPedestrianRoads: false,
            showPointOfInterestLabels: false,
            showRoadLabels: false,
            showTransitLabels: false,
            showAdminBoundaries: false,
            show3dObjects: false,
            show3dBuildings: false,
            show3dTrees: false,
            show3dLandmarks: false,
            showLandmarkIconLabels: false,
            showIndoorLabels: false,
          },
        }}
        scrollZoom={false}
        dragPan={false}
        doubleClickZoom={false}
        attributionControl={false}
        dragRotate={false}
        onLoad={() => setIsMapLoaded(true)}
        initialViewState={INITIAL_VIEW_STATE}
        maxZoom={MAX_ZOOM}
        minZoom={MIN_ZOOM}
      >
        {isMapLoaded ? (
          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
            <Button
              aria-label="Zoom out"
              isVisible={currentZoom > MIN_ZOOM}
              onClick={() => handleZoom(false)}
            >
              <FaMinus />
            </Button>

            <Button
              aria-label="Zoom in"
              isVisible={currentZoom < MAX_ZOOM}
              onClick={() => handleZoom(true)}
            >
              <FaPlus />
            </Button>
          </div>
        ) : (
          <div className="absolute inset-0 size-full animate-pulse bg-gray-100 dark:bg-dark-800" />
        )}
      </Map>
    </Card>
  );
}

function Button({
  isVisible,
  ...props
}: Readonly<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    isVisible: boolean;
  }
>) {
  return (
    <button
      className={cn(
        'cancel-drag flex size-10 items-center justify-center rounded-full shadow-md outline-hidden transition-all duration-300',
        'bg-white text-gray-800 hover:bg-gray-50 hover:ring-4 hover:ring-gray-200/45 focus-visible:ring-4 focus-visible:ring-gray-200/45',
        'ring-2 ring-gray-200 dark:bg-dark-800 dark:text-white dark:ring-gray-200/30 dark:hover:bg-dark-700',
        isVisible ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
      type="button"
      {...props}
    />
  );
}
