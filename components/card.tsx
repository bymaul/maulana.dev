import { cn } from '@/lib/utils';
import React from 'react';

type CardProps = React.ComponentPropsWithRef<'div'> & {
  children: React.ReactNode;
};

export default function Card({ className, children, ref, ...props }: Readonly<CardProps>) {
  return (
    <div
      ref={ref}
      {...props}
      className={cn(
        'size-full overflow-hidden rounded-3xl bg-white select-none',
        'shadow-xs transition-shadow duration-300 hover:shadow-lg',
        'dark:bg-dark-900 dark:ring-1 dark:ring-dark-800',
        className,
      )}
    >
      {children}
    </div>
  );
}
