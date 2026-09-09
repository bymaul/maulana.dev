import { cn } from '@/lib/utils';
import Link from 'next/link';
import type { ComponentProps } from 'react';
import { FaArrowRight } from 'react-icons/fa6';

export default function ButtonLink({ className, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className={cn(
        'cancel-drag group inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-white p-3 whitespace-nowrap ring-2 ring-gray-200/45 outline-hidden transition-all duration-300 hover:ring-4 focus-visible:ring-4 dark:text-black dark:ring-gray-200/30',
        className,
      )}
    />
  );
}

export function ArrowButtonLink({ children, ...props }: ComponentProps<typeof Link>) {
  return (
    <ButtonLink {...props}>
      <FaArrowRight className="-rotate-45 transition-transform duration-300 group-hover:rotate-0" />
      {children}
    </ButtonLink>
  );
}
