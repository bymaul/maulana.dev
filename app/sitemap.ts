import { getAllPosts, getAllProjects } from '@/lib/mdx';
import { toAbsoluteUrl } from '@/lib/metadata';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [{ url: toAbsoluteUrl(''), lastModified: new Date() }];

  const posts = getAllPosts().map((post) => ({
    url: toAbsoluteUrl(`/posts/${post.slug}`),
    lastModified: post.metadata.date,
  }));

  const projects = getAllProjects().map((project) => ({
    url: toAbsoluteUrl(`/projects/${project.slug}`),
    lastModified: project.metadata.date || new Date(),
  }));

  return [...routes, ...posts, ...projects, { url: toAbsoluteUrl('/feed.xml') }];
}
