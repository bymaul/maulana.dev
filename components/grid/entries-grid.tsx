import GridLayout from '@/components/grid/layout';
import EntryCard from '@/components/grid/entry-card';
import { getGridItems } from '@/config/grid';
import type { BaseMetadata } from '@/lib/mdx';
import type { ViewId } from '@/lib/utils';
import { formatDate } from '@/lib/utils';
import type { LayoutItem } from 'react-grid-layout';

export type ContentData = {
  slug: string;
  metadata: BaseMetadata;
};

interface EntriesGridProps {
  view: Exclude<ViewId, 'home'>;
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

export default function EntriesGrid({ view, posts, projects }: EntriesGridProps) {
  const isArticles = view === 'articles';
  const entries = isArticles ? posts : projects;
  const hrefBase = isArticles ? '/posts' : '/projects';

  const baseItems = getGridItems()
    .filter((item) => baseItemIds.includes(item.i))
    .map(({ i, component: Widget }) => (
      <div key={i} id={i}>
        <Widget />
      </div>
    ));

  const ids = [...entries.map((e) => e.slug), 'contact'];

  const mergedLayouts = {
    lg: [...baseLayouts.lg, ...generateLayout(ids, 'lg')],
    md: [...baseLayouts.md, ...generateLayout(ids, 'md')],
    sm: [...baseLayouts.sm, ...generateLayout(ids, 'sm')],
  };

  const newItems = entries.map((entry) => (
    <div key={entry.slug} className="h-full">
      <EntryCard
        href={`${hrefBase}/${entry.slug}`}
        badge={isArticles ? getBadgeText(entry.metadata.date) : 'Project'}
        title={entry.metadata.title}
        description={entry.metadata.description}
      />
    </div>
  ));

  return <GridLayout layouts={mergedLayouts}>{[...baseItems, ...newItems]}</GridLayout>;
}
