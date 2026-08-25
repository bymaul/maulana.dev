import Card from '@/components/card';
import CustomLink from '@/components/custom-link';
import { getFeaturedProject } from '@/lib/mdx';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa6';

interface PreviewSlot {
  container: string;
  image: string;
  sizes: string;
  width: number;
  height: number;
}

const PREVIEW_SIZES =
  '(max-width: 374px) 70px, (max-width: 798px) 80px, (max-width: 1198px) 100px, 140px';

const PREVIEW_SLOTS: PreviewSlot[] = [
  {
    container:
      'absolute top-1/2 left-0 z-0 w-17.5 -translate-x-1/4 -translate-y-1/2 transition-all duration-500 group-hover:-translate-y-[45%] sm:w-20 md:w-25 lg:w-35',
    image: 'h-auto w-17.5 rotate-15 object-cover sm:w-20 md:w-25 lg:w-110',
    sizes: PREVIEW_SIZES,
    width: 400,
    height: 200,
  },
  {
    container:
      'absolute top-0 right-0 z-0 w-17.5 translate-y-[-40%] transition-all duration-800 group-hover:translate-y-[-30%] sm:w-20 md:w-25 lg:w-35',
    image: 'h-auto w-17.5 -rotate-150 object-cover sm:w-20 md:w-25 lg:w-110',
    sizes: PREVIEW_SIZES,
    width: 400,
    height: 200,
  },
  {
    container:
      'absolute -right-2 bottom-0 z-0 w-22.5 translate-y-[10%] transition-all duration-800 group-hover:translate-y-[5%] sm:-right-4 sm:w-27.5 md:-right-8 md:w-35 lg:-right-15 lg:w-70',
    image: 'h-auto w-22.5 -rotate-10 object-cover sm:w-27.5 md:w-35 lg:w-140',
    sizes: '(max-width: 374px) 90px, (max-width: 798px) 110px, (max-width: 1198px) 140px, 280px',
    width: 400,
    height: 400,
  },
];

export default function ProjectCard() {
  const project = getFeaturedProject();
  const previewImages = project?.metadata.preview?.images ?? [];

  if (!project || previewImages.length === 0) {
    return (
      <Card className="items-center justify-center p-6">
        <p>No projects found.</p>
      </Card>
    );
  }

  return (
    <Card className="group relative bg-red-100/60">
      <div className="absolute inset-0 z-10 overflow-hidden">
        {PREVIEW_SLOTS.map(
          (slot, i) =>
            previewImages[i] && (
              <div key={previewImages[i]} className={slot.container}>
                <Image
                  src={previewImages[i]}
                  alt={project.metadata.title}
                  width={slot.width}
                  height={slot.height}
                  sizes={slot.sizes}
                  quality={70}
                  loading="eager"
                  className={slot.image}
                />
              </div>
            ),
        )}
      </div>

      <div className="absolute bottom-3 left-3 z-20">
        <CustomLink
          className="cancel-drag size-10 justify-end transition-all duration-300 ease-in-out group-hover:w-full"
          href={`/projects/${project.slug}`}
          aria-label={project.metadata.title}
        >
          <span className="hidden whitespace-nowrap opacity-0 transition-all duration-300 ease-in group-hover:translate-x-0 group-hover:opacity-100 md:inline">
            {project.metadata.title}
          </span>
          <span>
            <FaArrowRight className="-rotate-45 transition-transform duration-300 group-hover:rotate-0" />
          </span>
        </CustomLink>
      </div>
    </Card>
  );
}
