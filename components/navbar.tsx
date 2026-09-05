'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useLayoutEffect, useRef, useState, Suspense } from 'react';
import { cn, parseView, type ViewId } from '@/lib/utils';

const navItems: { name: string; path: string; viewId: ViewId }[] = [
  { name: 'Home', path: '/', viewId: 'home' },
  { name: 'Posts', path: '/?view=posts', viewId: 'posts' },
  { name: 'Projects', path: '/?view=projects', viewId: 'projects' },
];

const matchPath = (viewId: ViewId): string => (viewId === 'home' ? '/' : `/${viewId}`);

function NavContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const view = parseView(searchParams.get('view'));
  const navRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);

  useLayoutEffect(() => {
    const update = () => {
      if (!navRef.current) return;
      const el = navRef.current.querySelector<HTMLElement>('[data-active="true"]');
      if (el) {
        setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
      }
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(navRef.current!);
    return () => observer.disconnect();
  }, [pathname, view]);

  return (
    <nav
      ref={navRef}
      className="relative flex touch-manipulation items-center rounded-full border border-black/10 bg-white/50 p-1.5 shadow-lg backdrop-blur-lg select-none dark:border-white/10 dark:bg-dark-950/50"
      aria-label="Main navigation"
    >
      {indicator && (
        <div
          className="absolute inset-y-1.5 z-0 rounded-full bg-white shadow-sm transition-[left,width] duration-300 ease-out dark:bg-dark-800"
          style={{ left: indicator.left, width: indicator.width }}
        />
      )}

      {navItems.map((item) => {
        const match = matchPath(item.viewId);
        const isActive =
          (match !== '/' && pathname.startsWith(match)) ||
          (pathname === '/' && view === item.viewId);

        return (
          <Link
            key={item.path}
            href={item.path}
            scroll={false}
            data-active={isActive}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'relative z-10 rounded-full px-5 py-2 text-sm font-medium outline-hidden transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-black/15 dark:focus-visible:ring-white/20',
              isActive
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-800 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200',
            )}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}

export default function Navbar() {
  const pathname = usePathname();

  if (pathname !== '/') {
    return null;
  }

  return (
    <header className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <Suspense
        fallback={
          <div className="h-10 w-64 animate-pulse rounded-full bg-white/50 dark:bg-dark-950/50" />
        }
      >
        <NavContent />
      </Suspense>
    </header>
  );
}
