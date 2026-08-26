import OgCard from '@/components/og-card';
import { getProjectBySlug } from '@/lib/mdx';
import { ImageResponse } from 'next/og';

type Params = Promise<{ slug: string }>;

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Project cover image';

export default async function Image({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  return new ImageResponse(
    <OgCard title={project?.metadata.title ?? 'Project'} badge="Project" />,
    size,
  );
}
