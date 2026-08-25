'use client';

import Card from '@/components/card';
import { useMounted } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { FaMoon, FaSun } from 'react-icons/fa6';

export default function ThemeToggle() {
  const isMounted = useMounted();
  const { resolvedTheme, setTheme } = useTheme();

  if (!isMounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <Card className="group flex h-full flex-col items-center justify-center">
      <button
        className="cancel-drag relative flex h-12 w-24 cursor-pointer items-center rounded-full bg-gray-200 p-1 shadow-inner outline-hidden transition-all duration-300 focus-visible:ring-2 focus-visible:ring-black/15 dark:bg-dark-800 dark:focus-visible:ring-white/20"
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        aria-label="Toggle dark mode"
        aria-pressed={isDark}
      >
        <div
          className={cn(
            'flex size-10 items-center justify-center rounded-full text-white shadow-md transition-transform duration-300',
            isDark ? 'translate-x-12 bg-dark-700' : 'bg-yellow-400',
          )}
        >
          {isDark ? <FaMoon size="1.2rem" /> : <FaSun size="1.2rem" />}
        </div>
      </button>
    </Card>
  );
}
