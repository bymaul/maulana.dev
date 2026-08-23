import ArticleCard from '@/components/shared/grid/widgets/article-card';
import ContactCard from '@/components/shared/grid/widgets/contact-card';
import DescriptionCard from '@/components/shared/grid/widgets/description-card';
import DynamicLocationCard from '@/components/shared/grid/widgets/dynamic-location-card';
import LinkedInCard from '@/components/shared/grid/widgets/linkedin-card';
import NowPlayingCard from '@/components/shared/grid/widgets/now-playing-card';
import ProjectCard from '@/components/shared/grid/widgets/project-card';
import ThemeToggle from '@/components/shared/grid/widgets/theme-toggle';
import { getFeaturedPost, getFeaturedProject } from '@/lib/mdx';
import { LayoutItem } from 'react-grid-layout';

interface GridItem {
  i: string;
  component: React.ComponentType;
}

export const getGridItems = (): GridItem[] => {
  const postSlug = getFeaturedPost()?.slug ?? 'article';
  const projectSlug = getFeaturedProject()?.slug ?? 'project';

  return [
    { i: 'description', component: DescriptionCard },
    { i: 'location', component: DynamicLocationCard },
    { i: projectSlug, component: ProjectCard },
    { i: 'now-playing', component: NowPlayingCard },
    { i: postSlug, component: ArticleCard },
    { i: 'theme', component: ThemeToggle },
    { i: 'linkedin', component: LinkedInCard },
    { i: 'contact', component: ContactCard },
  ];
};

export const getLayouts = (): Record<'lg' | 'md' | 'sm', LayoutItem[]> => {
  const postSlug = getFeaturedPost()?.slug ?? 'article';
  const projectSlug = getFeaturedProject()?.slug ?? 'project';

  return {
    lg: [
      { i: 'description', x: 0, y: 0, w: 2, h: 1 },
      { i: 'location', x: 2, y: 0, w: 1, h: 1 },
      { i: projectSlug, x: 3, y: 0, w: 1, h: 2 },
      { i: 'now-playing', x: 0, y: 1, w: 1, h: 1 },
      { i: postSlug, x: 1, y: 1, w: 2, h: 1 },
      { i: 'theme', x: 0, y: 2, w: 1, h: 1 },
      { i: 'linkedin', x: 1, y: 2, w: 1, h: 1 },
      { i: 'contact', x: 2, y: 2, w: 2, h: 1 },
    ],
    md: [
      { i: 'description', x: 0, y: 0, w: 2, h: 2 },
      { i: 'location', x: 2, y: 0, w: 2, h: 1 },
      { i: 'linkedin', x: 2, y: 1, w: 1, h: 1 },
      { i: projectSlug, x: 3, y: 1, w: 1, h: 2 },
      { i: 'now-playing', x: 0, y: 2, w: 2, h: 1 },
      { i: 'theme', x: 2, y: 2, w: 1, h: 1 },
      { i: postSlug, x: 0, y: 3, w: 2, h: 2 },
      { i: 'contact', x: 2, y: 3, w: 2, h: 2 },
    ],
    sm: [
      { i: 'description', x: 0, y: 0, w: 2, h: 2 },
      { i: 'location', x: 0, y: 2, w: 2, h: 1 },
      { i: 'linkedin', x: 0, y: 3, w: 1, h: 1 },
      { i: projectSlug, x: 1, y: 3, w: 1, h: 2 },
      { i: 'theme', x: 0, y: 4, w: 1, h: 1 },
      { i: 'now-playing', x: 0, y: 5, w: 2, h: 1 },
      { i: postSlug, x: 0, y: 6, w: 2, h: 2 },
      { i: 'contact', x: 0, y: 8, w: 2, h: 2 },
    ],
  };
};

export const projectLayouts: Record<'lg' | 'md' | 'sm', LayoutItem[]> = {
  lg: [
    { i: 'image-0', x: 0, y: 0, w: 2, h: 1 },
    { i: 'image-1', x: 2, y: 0, w: 1, h: 1 },
    { i: 'image-2', x: 3, y: 0, w: 1, h: 2 },
    { i: 'image-3', x: 0, y: 1, w: 1, h: 1 },
    { i: 'image-4', x: 1, y: 1, w: 2, h: 1 },
  ],
  md: [
    { i: 'image-0', x: 0, y: 0, w: 2, h: 1 },
    { i: 'image-1', x: 2, y: 0, w: 1, h: 1 },
    { i: 'image-2', x: 3, y: 0, w: 1, h: 2 },
    { i: 'image-3', x: 0, y: 1, w: 1, h: 1 },
    { i: 'image-4', x: 1, y: 1, w: 2, h: 1 },
  ],
  sm: [
    { i: 'image-0', x: 0, y: 0, w: 2, h: 1 },
    { i: 'image-1', x: 0, y: 1, w: 1, h: 1 },
    { i: 'image-2', x: 1, y: 1, w: 1, h: 2 },
    { i: 'image-3', x: 0, y: 2, w: 1, h: 1 },
    { i: 'image-4', x: 0, y: 3, w: 2, h: 1 },
  ],
};
