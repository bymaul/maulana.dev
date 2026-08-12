import GridItem from '@/components/shared/grid/item';
import GridLayout from '@/components/shared/grid/layout';
import Card from '@/components/ui/card';
import { gridItems as homeGridItems } from '@/config/grid';
import { cn, formatDate } from '@/lib/utils';
import Link from 'next/link';
import type { LayoutItem } from 'react-grid-layout';
import { useMemo } from 'react';

type Accent = { text: string; blob: string };

const accents: Accent[] = [
  {
    text: 'hover:text-blue-600 hover:dark:text-blue-400',
    blob: 'bg-blue-500/20 group-hover:bg-blue-500/30',
  },
  {
    text: 'hover:text-emerald-600 hover:dark:text-emerald-400',
    blob: 'bg-emerald-500/20 group-hover:bg-emerald-500/30',
  },
  {
    text: 'hover:text-purple-600 hover:dark:text-purple-400',
    blob: 'bg-purple-500/20 group-hover:bg-purple-500/30',
  },
  {
    text: 'hover:text-amber-600 hover:dark:text-amber-400',
    blob: 'bg-amber-500/20 group-hover:bg-amber-500/30',
  },
];

export type ContentData = {
  slug: string;
  metadata: {
    title: string;
    description: string;
    date?: string;
  };
};

interface EntriesGridProps {
  view: string;
  posts: ContentData[];
  projects: ContentData[];
}

type Bp = 'lg' | 'md' | 'sm';

const bpConfig: Record<Bp, { colStartY: number[]; itemH: number }> = {
  lg: { colStartY: [1, 1], itemH: 1 },
  md: { colStartY: [3, 1], itemH: 2 },
  sm: { colStartY: [7], itemH: 2 },
};

const generateLayout = (ids: string[], bp: Bp): LayoutItem[] => {
  const { colStartY, itemH } = bpConfig[bp];
  const colY = [...colStartY];
  const w = 2;

  return ids.map((id) => {
    let col = 0;
    for (let c = 1; c < colY.length; c++) {
      if (colY[c] < colY[col]) col = c;
    }
    const y = colY[col];
    colY[col] += itemH;
    return { i: id, x: col * w, y, w, h: itemH };
  });
};

const baseLayouts = {
  lg: [
    { i: 'description', x: 0, y: 0, w: 2, h: 1 },
    { i: 'location', x: 2, y: 0, w: 1, h: 1 },
    { i: 'theme', x: 3, y: 0, w: 1, h: 1 },
  ],
  md: [
    { i: 'description', x: 0, y: 0, w: 2, h: 2 },
    { i: 'location', x: 2, y: 0, w: 2, h: 1 },
    { i: 'theme', x: 0, y: 2, w: 2, h: 1 },
  ],
  sm: [
    { i: 'description', x: 0, y: 0, w: 2, h: 2 },
    { i: 'location', x: 0, y: 2, w: 2, h: 1 },
    { i: 'theme', x: 0, y: 5, w: 2, h: 1 },
  ],
};

const baseItemIds = ['description', 'location', 'theme', 'contact'];

const getBadgeText = (date?: string) => (date ? formatDate(date) : 'Article');

function EntryCard({
  href,
  badge,
  title,
  description,
  cta,
  accent,
}: {
  href: string;
  badge: string;
  title: string;
  description: string;
  cta: string;
  accent: Accent;
}) {
  return (
    <Card className="group relative h-full overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:bg-white/40 hover:shadow-2xl dark:hover:bg-white/5">
      <div className="relative z-10 flex h-full flex-col justify-between p-5 focus:outline-none md:p-8">
        <div className="flex flex-col gap-3">
          <h2 className="font-pixelify-sans text-2xl leading-tight font-bold text-neutral-900 drop-shadow-sm dark:text-white">
            <Link href={href} className={cn('cancel-drag transition-colors', accent.text)}>
              {title}
            </Link>
          </h2>
          <p className="pointer-events-none text-neutral-600 max-lg:line-clamp-2 dark:text-neutral-400">
            {description}
          </p>
        </div>
        <div className="mt-6 flex items-center">
          <span className="rounded-full border border-neutral-900/10 bg-neutral-900/5 px-4 py-1.5 text-xs font-medium text-neutral-600 backdrop-blur-md dark:border-white/10 dark:bg-white/10 dark:text-neutral-300">
            {badge}
          </span>
        </div>
      </div>
      <div
        className={cn(
          'pointer-events-none absolute -top-10 -left-10 z-0 size-40 rounded-full blur-3xl transition-all duration-500 group-hover:scale-150',
          accent.blob,
        )}
      />
    </Card>
  );
}

export default function EntriesGrid({ view, posts, projects }: EntriesGridProps) {
  const isArticles = view === 'articles';
  const entries = isArticles ? posts : projects;
  const hrefBase = isArticles ? '/posts' : '/projects';

  const baseItems = useMemo(
    () =>
      homeGridItems
        .filter((item) => baseItemIds.includes(item.i))
        .map((item) => <GridItem key={item.i} id={item.i} component={item.component} />),
    [],
  );

  const mergedLayouts = useMemo(() => {
    const ids = [...entries.map((e) => e.slug), 'contact'];

    const newLayouts = {
      lg: generateLayout(ids, 'lg'),
      md: generateLayout(ids, 'md'),
      sm: generateLayout(ids, 'sm'),
    };

    return {
      lg: [...baseLayouts.lg, ...newLayouts.lg],
      md: [...baseLayouts.md, ...newLayouts.md],
      sm: [...baseLayouts.sm, ...newLayouts.sm],
    };
  }, [entries]);

  const newItems = useMemo(
    () =>
      entries.map((entry, i) => (
        <div key={entry.slug} className="h-full">
          <EntryCard
            accent={accents[i % accents.length]}
            href={`${hrefBase}/${entry.slug}`}
            badge={isArticles ? getBadgeText(entry.metadata.date) : 'Project'}
            title={entry.metadata.title}
            description={entry.metadata.description}
            cta={isArticles ? 'Read Article' : 'View Project'}
          />
        </div>
      )),
    [entries, isArticles, hrefBase],
  );

  return <GridLayout layouts={mergedLayouts}>{[...baseItems, ...newItems]}</GridLayout>;
}
