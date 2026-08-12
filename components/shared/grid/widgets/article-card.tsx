import Card from '@/components/ui/card';
import { getFeaturedPost } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa6';

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
    <Card className="group relative overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:bg-white/40 hover:shadow-2xl dark:hover:bg-white/5">
      <div className="relative z-10 flex h-full flex-col justify-between p-8 focus:outline-none">
        <div className="flex flex-col gap-3">
          <h2 className="font-pixelify-sans text-2xl leading-tight font-bold text-neutral-900 drop-shadow-sm dark:text-white">
            <Link
              href={`/posts/${post.slug}`}
              className="cancel-drag transition-colors hover:text-blue-600 dark:hover:text-blue-400"
            >
              {post.metadata.title}
            </Link>
          </h2>
          <p className="pointer-events-none line-clamp-3 text-neutral-600 dark:text-neutral-400">
            {post.metadata.description}
          </p>
        </div>

        <div className="mt-6 flex items-center">
          <span className="rounded-full border border-neutral-900/10 bg-neutral-900/5 px-4 py-1.5 text-xs font-medium text-neutral-600 backdrop-blur-md dark:border-white/10 dark:bg-white/10 dark:text-neutral-300">
            {formatDate(post.metadata.date)}
          </span>
        </div>
      </div>

      <div className="pointer-events-none absolute -right-10 -bottom-10 z-0 size-40 rounded-full bg-blue-500/20 blur-3xl transition-all duration-500 group-hover:scale-150 group-hover:bg-blue-500/30" />
    </Card>
  );
}
