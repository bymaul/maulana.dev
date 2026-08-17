import Card from '@/components/ui/card';
import CustomLink from '@/components/ui/custom-link';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa6';

export default function ProjectCard() {
  return (
    <Card className="group relative bg-red-100/60">
      <div className="absolute inset-0 z-10 overflow-hidden">
        <div className="absolute top-1/2 left-0 z-0 w-17.5 -translate-x-1/4 -translate-y-1/2 transition-all duration-500 group-hover:-translate-y-[45%] sm:w-20 md:w-25 lg:w-35">
          <Image
            src="/projects/curricula-preview.webp"
            alt="Curricula"
            width={400}
            height={200}
            sizes="(max-width: 374px) 70px, (max-width: 798px) 80px, (max-width: 1198px) 100px, 140px"
            quality={70}
            loading="eager"
            className="h-auto w-17.5 object-cover rotate-15 sm:w-20 md:w-25 lg:w-110"
          />
        </div>
        <div className="absolute top-0 right-0 z-0 w-17.5 transition-all duration-800 translate-y-[-40%] group-hover:translate-y-[-30%] sm:w-20 md:w-25 lg:w-35">
          <Image
            src="/projects/curricula-edit.webp"
            alt="Curricula"
            width={400}
            height={200}
            sizes="(max-width: 374px) 70px, (max-width: 798px) 80px, (max-width: 1198px) 100px, 140px"
            quality={70}
            loading="eager"
            className="h-auto w-17.5 object-cover -rotate-150 sm:w-20 md:w-25 lg:w-110"
          />
        </div>
        <div className="absolute -right-2 bottom-0 z-0 w-22.5 transition-all duration-800 translate-y-[10%] group-hover:translate-y-[5%] sm:-right-4 sm:w-27.5 md:-right-8 md:w-35 lg:-right-15 lg:w-70">
          <Image
            src="/projects/curricula-desktop.webp"
            alt="Curricula"
            width={400}
            height={400}
            loading="eager"
            sizes="(max-width: 374px) 90px, (max-width: 798px) 110px, (max-width: 1198px) 140px, 280px"
            quality={70}
            className="h-auto w-22.5 object-cover -rotate-10 sm:w-27.5 md:w-35 lg:w-140"
          />
        </div>
      </div>

      <div className="absolute bottom-3 left-3 z-20">
        <CustomLink
          className="cancel-drag size-10 justify-end transition-all duration-300 ease-in-out group-hover:w-full"
          href="/projects/curricula"
          aria-label="Curricula"
        >
          <span className="hidden whitespace-nowrap opacity-0 transition-all duration-300 ease-in group-hover:translate-x-0 group-hover:opacity-100 md:inline">
            Curricula
          </span>
          <span>
            <FaArrowRight className="-rotate-45 transition-transform duration-300 group-hover:rotate-0" />
          </span>
        </CustomLink>
      </div>
    </Card>
  );
}
