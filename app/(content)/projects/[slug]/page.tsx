import { CustomMDX } from '@/components/mdx/mdx';
import ContentPage from '@/components/shared/content-page';
import GridLayout from '@/components/shared/grid/layout';
import Card from '@/components/ui/card';
import CustomLink from '@/components/ui/custom-link';
import { projectLayouts } from '@/config/grid';
import { siteConfig } from '@/config/site';
import { getAllProjects, getProjectBySlug } from '@/lib/mdx';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FaArrowRight } from 'react-icons/fa6';

type Params = Promise<{ slug: string }>;

export const generateStaticParams = async () =>
  getAllProjects().map((project) => ({ slug: project.slug }));

export const generateMetadata = async ({ params }: { params: Params }) => {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return;

  const { title, description } = project.metadata;
  return {
    title: `${title} — Projects`,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${siteConfig.url}/projects/${project.slug}`,
      authors: siteConfig.author,
      images: siteConfig.ogImage,
    },
    twitter: { title, description, images: siteConfig.ogImage },
    alternates: { canonical: `${siteConfig.url}/projects/${project.slug}` },
  };
};

const ProjectPage = async ({ params }: { params: Params }) => {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const links = project.metadata.links;
  const images = project.metadata.images ?? [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: project.metadata.title,
    description: project.metadata.description,
    author: [{ '@type': 'Person', name: siteConfig.author, url: siteConfig.url }],
  };

  return (
    <ContentPage
      className="max-w-300 max-lg:max-w-200 max-md:max-w-93.75 max-sm:max-w-80"
      title={project.metadata.title}
      navLabel="Project navigation"
      contentLabel="Project details"
      jsonLd={jsonLd}
      header={
        <>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
            {project.metadata.description}
          </p>

          {links.length > 0 && (
            <nav
              aria-label="Project external links"
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
            >
              {links.map((link) => (
                <CustomLink
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer nofollow noopener"
                  className="group px-6 py-3 text-sm font-medium"
                >
                  {link.name}
                  <FaArrowRight
                    aria-hidden="true"
                    className="-rotate-45 transition-transform duration-300 group-hover:rotate-0"
                  />
                </CustomLink>
              ))}
            </nav>
          )}
        </>
      }
      footer={
        images.length > 0 && (
          <section aria-label="Project gallery">
            <GridLayout layouts={projectLayouts}>
              {images.map((image) => (
                <div key={image.i} role="group" aria-label={`Project screenshot ${image.i}`}>
                  <Card className="relative h-full w-full overflow-hidden">
                    <Image
                      src={image.url}
                      alt={`${project.metadata.title} screenshot ${image.i}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      draggable={false}
                    />
                  </Card>
                </div>
              ))}
            </GridLayout>
          </section>
        )
      }
    >
      <CustomMDX source={project.content} />
    </ContentPage>
  );
};

export default ProjectPage;
