import { getAllProjects } from '@/lib/mdx';
import { makeOgImage, OG_SIZE } from '@/lib/og';

export const generateStaticParams = () =>
  getAllProjects().map((project) => ({ slug: project.slug }));

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Project cover image';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return makeOgImage('project', slug);
}
