import { cn } from '@/lib/utils';
import Link, { LinkProps } from 'next/link';

export default function ButtonLink({
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps) {
  return (
    <Link
      {...props}
      className={cn(
        'group inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-white p-3 whitespace-nowrap transition-all duration-300',
        'ring-2 ring-gray-200/45 outline-hidden hover:ring-4 focus-visible:ring-4 dark:text-black dark:ring-gray-200/30',
        props.className,
      )}
    />
  );
}
