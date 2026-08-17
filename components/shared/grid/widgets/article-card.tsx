import Card from '@/components/ui/card';
import { getFeaturedPost } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

export default function ArticleCard() {
  const post = getFeaturedPost();

  if (!post) {
    return (
      <Card className="items-center justify-center p-6">
        <p>No articles found.</p>
      </Card>
    );
  }

  return (
    <Card className="group relative">
      <div className="relative z-10 flex h-full flex-col justify-between p-8">
        <div className="flex flex-col gap-3">
          <h2 className="font-pixelify-sans text-2xl leading-tight font-bold text-gray-900 drop-shadow-sm dark:text-white">
            <Link
              href={`/posts/${post.slug}`}
              className="cancel-drag transition-colors"
            >
              {post.metadata.title}
            </Link>
          </h2>
          <p className="pointer-events-none line-clamp-3 text-gray-600 dark:text-dark-300">
            {post.metadata.description}
          </p>
        </div>

        <div className="mt-6 flex items-center">
          <span className="rounded-full border border-gray-200 bg-gray-100 px-4 py-1.5 text-xs font-medium text-gray-600 dark:border-dark-800 dark:bg-dark-800 dark:text-dark-300">
            {formatDate(post.metadata.date)}
          </span>
        </div>
      </div>
    </Card>
  );
}
