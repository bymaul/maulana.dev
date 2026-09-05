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

const toJson = async (res: Response) => (res.ok && res.status !== 204 ? res.json() : null);

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
    const current = await toJson(
      await fetchSpotify('https://api.spotify.com/v1/me/player/currently-playing', token),
    );
    const track = current?.item;

    const recent = track
      ? null
      : await toJson(
          await fetchSpotify('https://api.spotify.com/v1/me/player/recently-played?limit=1', token),
        );
    const played = track ?? recent?.items?.[0]?.track;

    if (!played) {
      return notPlaying();
    }

    return NextResponse.json(
      {
        isPlaying: track ? (current.is_playing ?? false) : false,
        title: played.name,
        artist: played.artists.map((a: { name: string }) => a.name).join(', '),
        albumImageUrl: played.album.images[0]?.url || '',
        songUrl: played.external_urls.spotify,
      },
      { headers: { 'Cache-Control': CACHE_CONTROL } },
    );
  } catch {
    return NextResponse.json(
      { isPlaying: false },
      { status: 500, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}
