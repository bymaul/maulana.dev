import { siteConfig } from '@/config/site';
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '/api/',
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
