'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState, Suspense } from 'react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', path: '/', viewId: 'home', match: '/' },
  { name: 'Articles', path: '/?view=articles', viewId: 'articles', match: '/posts' },
  { name: 'Projects', path: '/?view=projects', viewId: 'projects', match: '/projects' },
];

function NavContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const view = searchParams.get('view') || 'home';
  const navRef = useRef<HTMLDivElement>(null);
  const [activeStyle, setActiveStyle] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    const updateActiveBlock = () => {
      if (navRef.current) {
        const activeItem = navRef.current.querySelector('[data-active="true"]') as HTMLElement;
        if (activeItem) {
          setActiveStyle({
            left: activeItem.offsetLeft,
            width: activeItem.offsetWidth,
            opacity: 1,
          });
        }
      }
    };

    requestAnimationFrame(updateActiveBlock);
    window.addEventListener('resize', updateActiveBlock);
    return () => window.removeEventListener('resize', updateActiveBlock);
  }, [pathname, view]);

  return (
    <nav
      ref={navRef}
      className="relative flex items-center rounded-full border border-black/10 bg-white/50 p-1.5 shadow-lg backdrop-blur-lg dark:border-white/10 dark:bg-dark-950/50"
    >
      <div
        className="absolute inset-y-1.5 z-0 rounded-full bg-white shadow-sm transition-all duration-300 ease-out dark:bg-dark-800"
        style={{ left: activeStyle.left, width: activeStyle.width, opacity: activeStyle.opacity }}
      />

      {navItems.map((item) => {
        const isActive =
          (item.match !== '/' && pathname.startsWith(item.match)) ||
          (pathname === '/' && view === item.viewId);

        return (
          <Link
            key={item.path}
            href={item.path}
            data-active={isActive}
            scroll={false}
            className={cn(
              'relative z-10 rounded-full px-5 py-2 text-sm font-medium outline-hidden transition-all duration-300 focus-visible:ring-2 focus-visible:ring-black/15 dark:focus-visible:ring-white/20',
              isActive
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200',
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
