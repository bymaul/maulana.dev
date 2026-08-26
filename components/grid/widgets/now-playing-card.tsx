'use client';

import Card from '@/components/card';
import { useEffect, useState } from 'react';
import { FaSpotify } from 'react-icons/fa6';

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumImageUrl?: string;
  songUrl?: string;
}

const BAR_DURATIONS = [0.85, 0.62, 1.26, 0.85, 0.49, 1.26];

function Equalizer() {
  return (
    <div className="flex h-3 items-end gap-0.5" aria-hidden>
      {BAR_DURATIONS.map((duration, i) => (
        <span
          key={i}
          className="w-1 animate-[playing_1s_ease_infinite] rounded-full bg-[#1DB954]"
          style={{ animationDuration: `${duration}s` }}
        />
      ))}
    </div>
  );
}

function Status({ isPlaying, light = false }: { isPlaying?: boolean; light?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      {isPlaying ? (
        <Equalizer />
      ) : (
        <span className="hidden size-2 rounded-full bg-gray-400 sm:inline" />
      )}

      <span
        className={`hidden text-xs font-semibold tracking-wider uppercase sm:inline ${
          light ? 'text-gray-200' : 'text-gray-500 dark:text-dark-400'
        }`}
      >
        {isPlaying ? 'Now Playing' : 'Last Played'}
      </span>
    </div>
  );
}

function SpotifyIcon({ isPlaying, small = false }: { isPlaying?: boolean; small?: boolean }) {
  return (
    <FaSpotify
      className={`transition-all duration-500 ${small ? 'h-5 w-5' : 'h-6 w-6'} ${
        isPlaying
          ? 'animate-pulse text-[#1DB954]'
          : small
            ? 'text-gray-300 dark:text-dark-600'
            : 'text-white/50'
      }`}
    />
  );
}

function Loading() {
  return (
    <div className="flex flex-col gap-2">
      <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-dark-700" />
      <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-dark-700" />
    </div>
  );
}

function SongInfo({ data, compact = false }: { data: SpotifyData; compact?: boolean }) {
  const titleClass = compact ? 'text-xl text-gray-900 dark:text-white' : 'text-2xl text-white';

  const artistClass = compact ? 'text-sm text-gray-600 dark:text-dark-300' : 'text-gray-300';

  return (
    <div className="min-w-0">
      <h2 className={`truncate font-fraunces font-semibold ${titleClass}`} title={data.title}>
        {data.songUrl ? (
          <a
            href={data.songUrl}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="cancel-drag rounded-sm ring-2 ring-transparent outline-hidden transition-all focus-visible:ring-2 focus-visible:ring-black/15 dark:focus-visible:ring-white/30"
          >
            {data.title ?? 'Failed to load'}
          </a>
        ) : (
          <span>{data.title ?? 'Failed to load'}</span>
        )}
      </h2>

      <p className={`truncate font-medium ${artistClass}`} title={data.artist}>
        {data.artist ?? 'Spotify disconnected'}
      </p>
    </div>
  );
}

export default function NowPlayingCard() {
  const [data, setData] = useState<SpotifyData | null>(null);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      if (document.hidden) return;

      try {
        const response = await fetch('/api/now-playing', {
          cache: 'no-store',
        });

        setData(await response.json());
      } catch {}
    };

    fetchNowPlaying();

    const interval = setInterval(fetchNowPlaying, 30_000);
    window.addEventListener('focus', fetchNowPlaying);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', fetchNowPlaying);
    };
  }, []);

  const isPlaying = data?.isPlaying;

  return (
    <Card className="group @container-size relative">
      <div className="size-full [@container(max-height:200px)]:hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: data?.albumImageUrl ? `url(${data.albumImageUrl})` : undefined,
          }}
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/10" />

        <div className="absolute top-4 right-4 z-10 drop-shadow-md">
          <SpotifyIcon isPlaying={isPlaying} />
        </div>

        <div className="relative z-10 flex h-full flex-col justify-end p-6 text-white">
          {!data ? <Loading /> : <SongInfo data={data} />}

          <div className="mt-4 w-max rounded-full border border-white/15 bg-white/15 px-4 py-2 backdrop-blur-lg">
            <Status isPlaying={isPlaying} light />
          </div>
        </div>
      </div>

      <div className="hidden size-full items-center gap-4 p-5 [@container(max-height:200px)]:flex">
        <div className="absolute top-4 right-4">
          <SpotifyIcon isPlaying={isPlaying} small />
        </div>

        {!data ? (
          <div className="size-26 shrink-0 animate-pulse rounded-xl bg-gray-200 md:size-32 dark:bg-dark-700" />
        ) : (
          <div
            className="size-26 shrink-0 rounded-xl bg-gray-200 bg-cover bg-center md:size-32 dark:bg-dark-700"
            style={{
              backgroundImage: data.albumImageUrl ? `url(${data.albumImageUrl})` : undefined,
            }}
          />
        )}

        <div className="flex min-w-0 flex-1 flex-col gap-4 pr-7">
          {data ? (
            <SongInfo data={data} compact />
          ) : (
            <div className="flex flex-col gap-2">
              <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-dark-700" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-dark-700" />
            </div>
          )}

          <Status isPlaying={isPlaying} />
        </div>
      </div>
    </Card>
  );
}
