import { toAbsoluteUrl } from '@/lib/metadata';
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '/api/',
    },
    sitemap: toAbsoluteUrl('/sitemap.xml'),
  };
}
