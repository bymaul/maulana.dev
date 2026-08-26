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

type MDXData<T extends BaseMetadata> = {
  metadata: T;
  slug: string;
  content: string;
};

const isValidMetadata = (metadata: Partial<BaseMetadata>): boolean =>
  typeof metadata.title === 'string' &&
  metadata.title.trim().length > 0 &&
  typeof metadata.description === 'string' &&
  metadata.description.trim().length > 0;

const getMDXData = cache(<T extends BaseMetadata>(dir: string): MDXData<T>[] => {
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

const byDateDesc = <T extends BaseMetadata>(a: MDXData<T>, b: MDXData<T>): number => {
  const aTime = a.metadata.date ? new Date(a.metadata.date).getTime() : 0;
  const bTime = b.metadata.date ? new Date(b.metadata.date).getTime() : 0;

  if (aTime !== bTime) return bTime - aTime;
  return a.metadata.title.localeCompare(b.metadata.title);
};

export const getAllPosts = (): MDXData<PostMetadata>[] => {
  const posts = getMDXData<PostMetadata>(path.join(process.cwd(), 'content/posts'));

  return [...posts].sort(byDateDesc);
};

export const getPostBySlug = (slug: string): MDXData<PostMetadata> | undefined =>
  getAllPosts().find((post) => post.slug === slug);

export const getFeaturedPost = (): MDXData<PostMetadata> | null => {
  const posts = getAllPosts();
  return posts.find((post) => post.metadata.featured) || null;
};

export const getFeaturedProject = (): MDXData<ProjectMetadata> | null => {
  const projects = getAllProjects();
  return projects.find((project) => project.metadata.featured) || null;
};

export const getAllProjects = (): MDXData<ProjectMetadata>[] => {
  const projects = getMDXData<ProjectMetadata>(path.join(process.cwd(), 'content/projects'));

  return projects
    .map((project) => ({
      ...project,
      metadata: {
        ...project.metadata,
        links: project.metadata.links ?? [],
      },
    }))
    .sort(byDateDesc);
};

export const getProjectBySlug = (slug: string): MDXData<ProjectMetadata> | undefined =>
  getAllProjects().find((project) => project.slug === slug);
