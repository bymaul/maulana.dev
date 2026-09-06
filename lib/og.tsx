import OgCard from '@/components/og-card';
import { getPostBySlug, getProjectBySlug } from '@/lib/mdx';
import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 };

export function makeOgImage(kind: 'post' | 'project', slug: string) {
  const data = kind === 'post' ? getPostBySlug(slug) : getProjectBySlug(slug);
  const fallback = kind === 'post' ? 'Post' : 'Project';

  return new ImageResponse(
    <OgCard
      title={data?.metadata.title ?? fallback}
      description={data?.metadata.description ?? ''}
    />,
    OG_SIZE,
  );
}
