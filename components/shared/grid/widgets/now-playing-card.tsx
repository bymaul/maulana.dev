'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/ui/card';
import { SiSpotify } from 'react-icons/si';

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumImageUrl?: string;
  songUrl?: string;
}

export default function NowPlayingCard() {
  const [data, setData] = useState<SpotifyData | null>(null);

  useEffect(() => {
    const fetchNowPlaying = () =>
      fetch('/api/now-playing')
        .then((r) => r.json())
        .then(setData)
        .catch(() => {});
    fetchNowPlaying();

    const interval = setInterval(fetchNowPlaying, 15000);
    window.addEventListener('focus', fetchNowPlaying);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', fetchNowPlaying);
    };
  }, []);

  return (
    <Card className="group relative overflow-hidden transition-all duration-500">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: data?.albumImageUrl ? `url(${data.albumImageUrl})` : '' }}
      />

      <div className="absolute inset-0 z-0 bg-linear-to-t from-black/90 via-black/40 to-black/10" />

      <div className="absolute top-4 right-4 z-10 drop-shadow-md">
        <SiSpotify
          className={`h-6 w-6 transition-all duration-500 ${data?.isPlaying ? 'animate-pulse text-[#1DB954] drop-shadow-[0_0_8px_rgba(29,185,84,0.6)]' : 'text-white/50'}`}
        />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-end p-6">
        <div className="flex flex-col gap-1 text-white">
          {!data ? (
            <>
              <div className="h-6 w-3/4 animate-pulse rounded bg-white/20 backdrop-blur-sm" />
              <div className="mt-1 h-4 w-1/2 animate-pulse rounded bg-white/20 backdrop-blur-sm" />
            </>
          ) : (
            <>
              <h2
                className="font-pixelify-sans line-clamp-2 text-2xl font-bold drop-shadow-md md:line-clamp-1 lg:line-clamp-2"
                title={data.title}
              >
                <a
                  href={data.songUrl ?? '#'}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="cancel-drag transition-colors hover:text-[#1DB954]"
                >
                  {data.title ?? 'Failed to load'}
                </a>
              </h2>
              <p className="truncate font-medium text-gray-300 drop-shadow-sm" title={data.artist}>
                {data.artist ?? 'Spotify disconnected'}
              </p>
            </>
          )}
        </div>

        <div className="mt-4 flex w-max items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-md">
          {data?.isPlaying ? (
            <div className="flex h-3 items-end gap-0.5">
              {[0.85, 0.62, 1.26, 0.85, 0.49, 1.26].map((dur, i) => (
                <div
                  key={i}
                  className="w-1 animate-[playing_1s_ease_infinite] rounded-full bg-[#1DB954]"
                  style={{ animationDuration: `${dur}s`, height: '100%' }}
                />
              ))}
            </div>
          ) : (
            <div className="h-2 w-2 rounded-full bg-gray-400" />
          )}
          <p className="text-xs font-bold tracking-wider text-gray-200 uppercase">
            {data?.isPlaying ? 'Now Playing' : 'Last Played'}
          </p>
        </div>
      </div>
    </Card>
  );
}
