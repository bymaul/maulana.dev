import profile from '@/public/images/profile.jpg';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import Card from '@/components/ui/card';

export default function DescriptionCard() {
  return (
    <Card className="group flex flex-col justify-center gap-4 p-8">
      <div className="relative size-14 overflow-hidden rounded-full shadow-md ring-2 ring-gray-200 transition-transform group-hover:scale-105 sm:size-16 dark:ring-dark-800">
        <Image
          src={profile}
          alt={siteConfig.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          priority
        />
      </div>
      <p className="leading-relaxed text-gray-700 dark:text-dark-300">
        Hi, I&apos;m{' '}
        <span className="font-pixelify-sans text-2xl font-bold text-gray-900 dark:text-white">
          Maulana
        </span>
        , a software developer from Yogyakarta, Indonesia.{' '}
        <span className="hidden md:inline">
          I love building reliable software and learning new things.
        </span>
      </p>
    </Card>
  );
}
