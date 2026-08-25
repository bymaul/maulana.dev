'use client';

import Card from '@/components/card';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { Map, MapRef } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAX_ZOOM = 9;
const MIN_ZOOM = 3;

const INITIAL_VIEW_STATE = {
  latitude: -7.79558,
  longitude: 110.36949,
  zoom: MAX_ZOOM,
};

const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const BASEMAP_CONFIG = {
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
};

export default function LocationCard() {
  const [zoom, setZoom] = useState(MAX_ZOOM);
  const [loaded, setLoaded] = useState(false);

  const mapRef = useRef<MapRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const lightPreset = isDark ? 'night' : 'day';
  const basemapTheme = isDark ? 'monochrome' : 'default';
  const mapTheme = { lightPreset, theme: basemapTheme };

  useEffect(() => {
    const map = mapRef.current?.getMap();

    if (!map || !loaded) return;

    map.setConfigProperty('basemap', 'lightPreset', lightPreset);
    map.setConfigProperty('basemap', 'theme', basemapTheme);
  }, [isDark, loaded, lightPreset, basemapTheme]);

  useEffect(() => {
    const map = mapRef.current?.getMap();
    const gridItem = containerRef.current?.closest('.react-grid-item');

    if (!map || !gridItem || !loaded) return;

    const handleTransitionEnd = (event: Event) => {
      if ((event as TransitionEvent).propertyName === 'width') {
        map.resize();
      }
    };

    gridItem.addEventListener('transitionend', handleTransitionEnd);

    return () => {
      gridItem.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [loaded]);

  const handleZoom = (zoomIn: boolean) => {
    if (zoomIn) {
      mapRef.current?.zoomIn();
    } else {
      mapRef.current?.zoomOut();
    }
  };

  const handleZoomEnd = () => {
    const zoom = mapRef.current?.getZoom();

    if (zoom != null) setZoom(zoom);
  };

  return (
    <Card
      ref={containerRef}
      className="relative size-full"
      role="region"
      aria-label="Interactive map of Yogyakarta"
    >
      <Map
        ref={mapRef}
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/standard"
        initialViewState={INITIAL_VIEW_STATE}
        minZoom={MIN_ZOOM}
        maxZoom={MAX_ZOOM}
        config={{
          basemap: {
            ...mapTheme,
            ...BASEMAP_CONFIG,
          },
        }}
        scrollZoom={false}
        dragPan={false}
        doubleClickZoom={false}
        attributionControl={false}
        dragRotate={false}
        onLoad={() => setLoaded(true)}
        onZoomEnd={handleZoomEnd}
      >
        {loaded ? (
          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
            <Button
              aria-label="Zoom out"
              isVisible={zoom > MIN_ZOOM}
              onClick={() => handleZoom(false)}
            >
              <FaMinus />
            </Button>

            <Button
              aria-label="Zoom in"
              isVisible={zoom < MAX_ZOOM}
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
      {...props}
      type="button"
      className={cn(
        'cancel-drag flex size-10 items-center justify-center rounded-full shadow-md outline-hidden transition-all duration-300',
        'bg-white text-gray-800 hover:bg-gray-50 hover:ring-4 hover:ring-gray-200/45',
        'focus-visible:ring-4 focus-visible:ring-gray-200/45',
        'ring-2 ring-gray-200 dark:bg-dark-800 dark:text-white dark:ring-dark-800',
        'dark:hover:bg-dark-700',
        isVisible ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
    />
  );
}
