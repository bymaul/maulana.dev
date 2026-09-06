import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { cache } from 'react';

export interface BaseMetadata {
  title: string;
  description: string;
  date?: string;
  featured?: boolean;
}

export interface PostMetadata extends BaseMetadata {
  date: string;
}

export interface ProjectMetadata extends BaseMetadata {
  links: { name: string; url: string }[];
  images?: string[];
  preview?: {
    images: string[];
  };
}

export type MDXData<T extends BaseMetadata> = {
  metadata: T;
  slug: string;
  content: string;
};

const POSTS_DIR = path.join(process.cwd(), 'content/posts');
const PROJECTS_DIR = path.join(process.cwd(), 'content/projects');

const hasText = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

const isValidMetadata = (metadata: { title?: unknown; description?: unknown }): boolean =>
  hasText(metadata.title) && hasText(metadata.description);

const readMDXDir = cache(<T extends BaseMetadata>(dir: string): MDXData<T>[] => {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((dirent) => dirent.isFile() && path.extname(dirent.name) === '.mdx')
    .map((dirent) => {
      const filePath = path.join(dir, dirent.name);
      const fileContent = fs.readFileSync(filePath, 'utf-8');

      const { data, content } = matter(fileContent);

      return {
        metadata: data as T,
        slug: path.basename(dirent.name, path.extname(dirent.name)),
        content,
      };
    })
    .filter(({ slug, metadata }) => {
      if (isValidMetadata(metadata)) return true;

      console.warn(
        `[mdx] Skipping "${slug}" in ${path.relative(process.cwd(), dir)}: missing required "title" or "description" frontmatter.`,
      );
      return false;
    });
});

const byDateDesc = (a: MDXData<BaseMetadata>, b: MDXData<BaseMetadata>): number => {
  const aTime = a.metadata.date ? new Date(a.metadata.date).getTime() : 0;
  const bTime = b.metadata.date ? new Date(b.metadata.date).getTime() : 0;

  if (aTime !== bTime) return bTime - aTime;
  return a.metadata.title.localeCompare(b.metadata.title);
};

const sorted = <T extends BaseMetadata>(items: MDXData<T>[]): MDXData<T>[] =>
  [...items].sort(byDateDesc);

const findBySlug = <T extends BaseMetadata>(
  items: MDXData<T>[],
  slug: string,
): MDXData<T> | undefined => items.find((item) => item.slug === slug);

const findFeatured = <T extends BaseMetadata>(items: MDXData<T>[]): MDXData<T> | null =>
  items.find((item) => item.metadata.featured) ?? null;

export const getAllPosts = cache((): MDXData<PostMetadata>[] => {
  return sorted(readMDXDir<PostMetadata>(POSTS_DIR));
});

export const getAllProjects = cache((): MDXData<ProjectMetadata>[] => {
  return sorted(readMDXDir<ProjectMetadata>(PROJECTS_DIR)).map((project) => ({
    ...project,
    metadata: {
      ...project.metadata,
      links: project.metadata.links ?? [],
    },
  }));
});

export const getPostBySlug = (slug: string): MDXData<PostMetadata> | undefined =>
  findBySlug(getAllPosts(), slug);

export const getProjectBySlug = (slug: string): MDXData<ProjectMetadata> | undefined =>
  findBySlug(getAllProjects(), slug);

export const getFeaturedPost = (): MDXData<PostMetadata> | null => findFeatured(getAllPosts());

export const getFeaturedProject = (): MDXData<ProjectMetadata> | null =>
  findFeatured(getAllProjects());
