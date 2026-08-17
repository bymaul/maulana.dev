import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FaX } from 'react-icons/fa6';

export default function BackButton() {
  return (
    <Link
      href="/"
      className={cn(
        'group inline-flex size-12 items-center justify-center gap-3 overflow-hidden rounded-full p-0 whitespace-nowrap',
        'bg-white transition-all duration-300',
        'outline-hidden ring-2 ring-gray-200/45 focus-visible:ring-4 hover:ring-4 dark:text-black dark:ring-gray-200/30',
      )}
    >
      <FaX />
    </Link>
  );
}
