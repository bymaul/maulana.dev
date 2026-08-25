import { NextResponse } from 'next/server';

const {
  SPOTIFY_CLIENT_ID: id,
  SPOTIFY_CLIENT_SECRET: secret,
  SPOTIFY_REFRESH_TOKEN: refresh,
} = process.env;

const basic = Buffer.from(`${id}:${secret}`).toString('base64');

const CACHE_CONTROL = 'public, s-maxage=30, stale-while-revalidate=60';

let cachedToken: { value: string; expiresAt: number } | null = null;

const fetchSpotify = (url: string, token: string) =>
  fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

const getAccessToken = async (): Promise<string | null> => {
  if (!id || !secret || !refresh) return null;
  if (cachedToken && Date.now() < cachedToken.expiresAt) return cachedToken.value;

  try {
    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh,
      }),
      cache: 'no-store',
    });

    if (!tokenRes.ok) return null;

    const { access_token, expires_in } = await tokenRes.json();

    if (!access_token) return null;

    cachedToken = {
      value: access_token,
      expiresAt: Date.now() + ((expires_in ?? 3600) * 1000 - 60_000),
    };

    return access_token;
  } catch {
    return null;
  }
};

const notPlaying = () =>
  NextResponse.json({ isPlaying: false }, { headers: { 'Cache-Control': CACHE_CONTROL } });

export async function GET() {
  const token = await getAccessToken();

  if (!token) {
    return notPlaying();
  }

  try {
    const currentlyPlaying = await fetchSpotify(
      'https://api.spotify.com/v1/me/player/currently-playing',
      token,
    );

    if (currentlyPlaying.ok && currentlyPlaying.status !== 204) {
      const data = await currentlyPlaying.json();
      if (data?.item) {
        return NextResponse.json(
          {
            isPlaying: data.is_playing,
            title: data.item.name,
            artist: data.item.artists.map((a: { name: string }) => a.name).join(', '),
            albumImageUrl: data.item.album.images[0]?.url || '',
            songUrl: data.item.external_urls.spotify,
          },
          { headers: { 'Cache-Control': CACHE_CONTROL } },
        );
      }
    }

    const recentlyPlayed = await fetchSpotify(
      'https://api.spotify.com/v1/me/player/recently-played?limit=1',
      token,
    );

    if (recentlyPlayed.ok && recentlyPlayed.status !== 204) {
      const data = await recentlyPlayed.json();
      const track = data.items?.[0]?.track;
      if (track) {
        return NextResponse.json(
          {
            isPlaying: false,
            title: track.name,
            artist: track.artists.map((a: { name: string }) => a.name).join(', '),
            albumImageUrl: track.album.images[0]?.url || '',
            songUrl: track.external_urls.spotify,
          },
          { headers: { 'Cache-Control': CACHE_CONTROL } },
        );
      }
    }

    return notPlaying();
  } catch {
    return NextResponse.json({ isPlaying: false }, { status: 500 });
  }
}
