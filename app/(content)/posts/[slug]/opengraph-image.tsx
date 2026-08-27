import OgCard from '@/components/og-card';
import { getPostBySlug } from '@/lib/mdx';
import { ImageResponse } from 'next/og';

type Params = Promise<{ slug: string }>;

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Post cover image';

export default async function Image({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return new ImageResponse(
    <OgCard title={post?.metadata.title ?? 'Post'} badge="Post" />,
    size,
  );
}
