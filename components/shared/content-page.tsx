import BackButton from '@/components/ui/back-button';
import Card from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Script from 'next/script';
import type { ReactNode } from 'react';

interface ContentPageProps {
  title: string;
  navLabel: string;
  contentLabel: string;
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  jsonLd: object;
  className?: string;
}

export default function ContentPage({
  title,
  navLabel,
  contentLabel,
  header,
  footer,
  children,
  jsonLd,
  className,
}: ContentPageProps) {
  return (
    <main className="pb-10">
      <div className={cn('mx-auto px-4', className)}>
        <nav aria-label={navLabel} className="sticky top-6 z-50 flex items-center justify-center">
          <BackButton />
        </nav>

        <article className="py-0 pt-12">
          <Card className="h-auto p-8 md:p-12">
            <header className="border-b border-gray-200/50 pb-10 text-center dark:border-white/10">
              <h1 className="font-pixelify-sans text-3xl leading-relaxed text-gray-900 md:text-4xl dark:text-white">
                {title}
              </h1>
              {header}
            </header>

            <section
              aria-label={contentLabel}
              className="prose prose-gray prose-lg dark:prose-invert mx-auto max-w-none pt-10"
            >
              {children}
            </section>
          </Card>
        </article>
      </div>

      {footer}

      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
