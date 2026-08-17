import Card from '@/components/ui/card';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa6';
import CustomLink from '@/components/ui/custom-link';

export default function ProjectCard() {
  return (
    <Card className="group relative bg-red-50">
      <div className="relative z-20 flex h-full flex-col items-center justify-center gap-3 p-5 text-center md:p-8">
        <h2 className="font-pixelify-sans text-2xl leading-tight font-bold text-gray-900 drop-shadow-sm md:text-3xl dark:text-white">
          My Projects
        </h2>
        <p className="mb-2 text-gray-600 dark:text-dark-300">
          Explore all the projects I&apos;ve built.
        </p>
        <CustomLink
          className="cancel-drag group/button px-4 py-2"
          href="/?view=projects"
          aria-label="View All Projects"
        >
          Projects
          <span>
            <FaArrowRight className="-rotate-45 transition-transform duration-300 group-hover/button:rotate-0" />
          </span>
        </CustomLink>
      </div>

      <div className="absolute inset-0 z-10 overflow-hidden">
        <div className="absolute bottom-0 -left-1 z-0 w-12.5 transition-all duration-500 translate-y-[20%] group-hover:translate-y-[10%] sm:-left-2 sm:w-15 md:-left-3 md:w-17.5 lg:-left-5 lg:w-30">
          <Image
            src="/projects/curricula-preview.webp"
            alt="Curricula"
            width={400}
            height={200}
            sizes="(max-width: 374px) 50px, (max-width: 798px) 60px, (max-width: 1198px) 70px, 400px"
            quality={70}
            loading="eager"
            className="h-auto w-12.5 object-cover rotate-15 sm:w-15 md:w-17.5 lg:w-100"
          />
        </div>
        <div className="absolute top-0 right-0 z-0 w-12.5 transition-all duration-800 translate-y-[-40%] group-hover:translate-y-[-30%] sm:w-15 md:w-17.5 lg:w-30">
          <Image
            src="/projects/curricula-edit.webp"
            alt="Curricula"
            width={400}
            height={200}
            sizes="(max-width: 374px) 50px, (max-width: 798px) 60px, (max-width: 1198px) 70px, 400px"
            quality={70}
            loading="eager"
            className="h-auto w-12.5 object-cover -rotate-150 sm:w-15 md:w-17.5 lg:w-100"
          />
        </div>
        <div className="absolute -right-2 bottom-0 z-0 w-17.5 transition-all duration-800 translate-y-[10%] group-hover:translate-y-[5%] sm:-right-4 sm:w-20 md:-right-8 md:w-22.5 lg:-right-15 lg:w-60">
          <Image
            src="/projects/curricula-desktop.webp"
            alt="Curricula"
            width={400}
            height={400}
            loading="eager"
            sizes="(max-width: 374px) 70px, (max-width: 798px) 80px, (max-width: 1198px) 90px, 400px"
            quality={70}
            className="h-auto w-17.5 object-cover -rotate-10 sm:w-20 md:w-22.5 lg:w-100"
          />
        </div>
      </div>
    </Card>
  );
}
