import CustomLink from '@/components/custom-link';
import Card from '@/components/card';
import Container from '@/components/container';
import GridLayout from '@/components/grid/layout';
import { CustomMDX } from '@/components/mdx';
import { projectLayouts } from '@/config/grid';
import { buildJsonLd, buildMetadata } from '@/lib/metadata';
import { getAllProjects, getProjectBySlug } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { FaArrowRight, FaX } from 'react-icons/fa6';
import Image from 'next/image';

type Params = Promise<{ slug: string }>;

export const generateStaticParams = async () =>
  getAllProjects().map((project) => ({ slug: project.slug }));

export const generateMetadata = async ({ params }: { params: Params }) => {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return;

  const { title, description } = project.metadata;
  return buildMetadata({
    title: `${title} — Projects`,
    description,
    path: `/projects/${project.slug}`,
  });
};

const ProjectPage = async ({ params }: { params: Params }) => {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const links = project.metadata.links;
  const images = project.metadata.images ?? [];

  const jsonLd = buildJsonLd(
    'Article',
    project.metadata.title,
    project.metadata.description,
    `/projects/${project.slug}`,
  );

  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="flex items-center justify-center pt-10">
        <CustomLink className="inline-flex hover:mb-6 hover:scale-125" href="/">
          <FaX />
          <div className="sr-only">Close</div>
        </CustomLink>
      </nav>
      <main>
        <Container as="article" className="py-8">
          <h1 className="font-fraunces text-3xl leading-relaxed">{project.metadata.title}</h1>
          <div className="grid grid-cols-2 gap-10 pb-8 max-md:grid-cols-1">
            <div>
              <p className="text-lg leading-relaxed font-medium">{project.metadata.description}</p>
              {links.length > 0 && (
                <nav aria-label="Project links" className="flex flex-wrap items-center gap-3 pt-4">
                  {links.map((link) => (
                    <CustomLink
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex px-5 py-3 text-sm"
                    >
                      {link.name}
                      <FaArrowRight className="-rotate-45 transition-transform duration-300 group-hover:rotate-0" />
                    </CustomLink>
                  ))}
                </nav>
              )}
            </div>
            <div className="prose dark:prose-invert">
              <CustomMDX source={project.content} />
            </div>
          </div>
        </Container>
        {images.length > 0 && (
          <section aria-label="Project gallery" className="-mt-8 pb-16">
            <GridLayout layouts={projectLayouts}>
              {images.map((url, index) => (
                <div key={`image-${index}`} id={`image-${index}`}>
                  <Card className="relative">
                    <Image
                      src={url}
                      alt={project.metadata.title}
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
        )}
      </main>
    </>
  );
};

export default ProjectPage;
