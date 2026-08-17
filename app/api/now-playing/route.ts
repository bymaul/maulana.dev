import { NextResponse } from 'next/server';

const {
  SPOTIFY_CLIENT_ID: id,
  SPOTIFY_CLIENT_SECRET: secret,
  SPOTIFY_REFRESH_TOKEN: refresh,
} = process.env;
const basic = Buffer.from(`${id}:${secret}`).toString('base64');
const headers = { 'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=5' };

const fetchSpotify = (url: string, token: string) =>
  fetch(url, { headers: { Authorization: `Bearer ${token}` }, next: { revalidate: 0 } });

export async function GET() {
  if (!id || !secret || !refresh) return NextResponse.json({ isPlaying: false });

  try {
    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refresh }),
      next: { revalidate: 0 },
    });

    if (!tokenRes.ok) return NextResponse.json({ isPlaying: false });

    const { access_token } = await tokenRes.json();
    if (!access_token) return NextResponse.json({ isPlaying: false });

    const currentlyPlaying = await fetchSpotify(
      'https://api.spotify.com/v1/me/player/currently-playing',
      access_token,
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
          { headers },
        );
      }
    }

    const recentlyPlayed = await fetchSpotify(
      'https://api.spotify.com/v1/me/player/recently-played?limit=1',
      access_token,
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
          { headers },
        );
      }
    }

    return NextResponse.json({ isPlaying: false });
  } catch {
    return NextResponse.json({ isPlaying: false }, { status: 500 });
  }
}
