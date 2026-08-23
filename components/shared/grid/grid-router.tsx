import EntriesGrid, { type ContentData } from '@/components/shared/grid/entries-grid';
import HomeGrid from '@/components/shared/grid/home-grid';
import type { ViewId } from '@/lib/view';

interface GridRouterProps {
  view: ViewId;
  posts: ContentData[];
  projects: ContentData[];
}

export default function GridRouter({ view, posts, projects }: GridRouterProps) {
  if (view === 'home') {
    return <HomeGrid />;
  }

  return <EntriesGrid view={view} posts={posts} projects={projects} />;
}
