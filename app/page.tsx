import Container from '@/components/ui/container';
import { siteConfig } from '@/config/site';
import { getAllPosts, getAllProjects } from '@/lib/mdx';
import GridRouter from '@/components/shared/grid/grid-router';
import { parseView } from '@/lib/view';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Main({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const view = parseView(resolvedParams.view);

  const posts = getAllPosts().map((post) => ({
    slug: post.slug,
    metadata: post.metadata,
  }));

  const projects = getAllProjects().map((project) => ({
    slug: project.slug,
    metadata: project.metadata,
  }));

  return (
    <>
      <Container as="header" className="flex items-center justify-between py-0">
        <h1 className="sr-only">{siteConfig.title}</h1>
      </Container>
      <main className="py-8 pb-20">
        <GridRouter view={view} posts={posts} projects={projects} />
      </main>
    </>
  );
}
