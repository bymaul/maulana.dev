'use client';

import { useMounted } from '@/hooks';
import { cn } from '@/lib/utils';

export default function Template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const mounted = useMounted(50);

  return (
    <div className={cn('transition-opacity duration-700', mounted ? 'opacity-100' : 'opacity-0')}>
      {children}
    </div>
  );
}
