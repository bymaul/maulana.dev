import { getAllPosts } from '@/lib/mdx';
import { makeOgImage, OG_SIZE } from '@/lib/og';

export const generateStaticParams = () => getAllPosts().map((post) => ({ slug: post.slug }));

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Post cover image';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return makeOgImage('post', slug);
}
