import Card from '@/components/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface EntryCardProps {
  href: string;
  badge: string;
  title: string;
  description: string;
  descriptionClassName?: string;
}

export default function EntryCard({
  href,
  badge,
  title,
  description,
  descriptionClassName = 'max-lg:line-clamp-4',
}: EntryCardProps) {
  return (
    <Card className="group relative h-full">
      <div className="relative z-10 flex h-full flex-col justify-between p-5 md:p-8">
        <div className="flex flex-col gap-3">
          <h2 className="font-fraunces text-2xl leading-tight font-semibold text-gray-900 dark:text-white">
            <Link href={href} className="cancel-drag transition-colors">
              {title}
            </Link>
          </h2>
          <p
            className={cn(
              'pointer-events-none text-gray-600',
              descriptionClassName,
              'dark:text-dark-300',
            )}
          >
            {description}
          </p>
        </div>
        <div className="mt-6 flex items-center">
          <span className="rounded-full border border-gray-200 bg-gray-100 px-4 py-1.5 text-xs font-medium text-gray-600 dark:border-dark-800 dark:bg-dark-800 dark:text-dark-300">
            {badge}
          </span>
        </div>
      </div>
    </Card>
  );
}
