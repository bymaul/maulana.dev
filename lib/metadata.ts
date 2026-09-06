import { siteConfig } from '@/config/site';
import type { Metadata } from 'next';

interface BuildMetadataProps {
  title: string;
  description: string;
  path: string;
  publishedTime?: string;
}

export function toAbsoluteUrl(path: string): string {
  return `${siteConfig.url}${path}`;
}

export function buildMetadata({
  title,
  description,
  path,
  publishedTime,
}: BuildMetadataProps): Metadata {
  const url = toAbsoluteUrl(path);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      ...(publishedTime ? { publishedTime } : {}),
      url,
      authors: siteConfig.author,
    },
    twitter: { card: 'summary_large_image' },
    alternates: { canonical: url },
  };
}

export function buildJsonLd({
  type,
  headline,
  description,
  path,
  date,
}: {
  type: 'BlogPosting' | 'Article';
  headline: string;
  description: string;
  path: string;
  date?: string;
}): Record<string, unknown> {
  const url = toAbsoluteUrl(path);

  return {
    '@context': 'https://schema.org',
    '@type': type,
    headline,
    description,
    url,
    mainEntityOfPage: url,
    ...(date ? { datePublished: date, dateModified: date } : {}),
    author: [{ '@type': 'Person', name: siteConfig.author, url: siteConfig.url }],
  };
}
