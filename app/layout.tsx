import Navbar from '@/components/shared/navbar';
import { siteConfig } from '@/config/site';
import { pixelifySans, poppins } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { ThemeProvider } from './providers';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: '%s',
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.title,
    locale: 'en-US',
    type: 'website',
    images: [
      {
        url: siteConfig.ogImage,
      },
    ],
  },
  twitter: {
    title: siteConfig.title,
    description: siteConfig.description,
    images: siteConfig.ogImage,
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          poppins.className,
          pixelifySans.variable,
          'dark:bg-dark-950 bg-gray-100 antialiased',
        )}
      >
        <ThemeProvider attribute="class" enableSystem={true}>
          <div className="relative z-10">
            <Navbar />
            {children}
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
