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
        'size-full overflow-hidden rounded-3xl bg-white shadow-xs transition-shadow duration-300 select-none hover:shadow-lg dark:border dark:border-dark-800 dark:bg-dark-900',
        className,
      )}
    >
      {children}
    </div>
  );
}
