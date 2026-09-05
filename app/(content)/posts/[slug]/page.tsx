import { CustomMDX } from '@/components/mdx';
import JsonLd from '@/components/json-ld';
import { buildJsonLd, buildMetadata } from '@/lib/metadata';
import { getAllPosts, getPostBySlug } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import { notFound } from 'next/navigation';

export const generateStaticParams = () => getAllPosts().map((post) => ({ slug: post.slug }));

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return;

  const { title, description, date } = post.metadata;
  return buildMetadata({
    title,
    description,
    path: `/posts/${post.slug}`,
    publishedTime: date,
  });
};

const PostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const jsonLd = buildJsonLd({
    type: 'BlogPosting',
    headline: post.metadata.title,
    description: post.metadata.description,
    path: `/posts/${post.slug}`,
    date: post.metadata.date,
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <main className="mx-auto max-w-prose px-4 py-8">
        <article className="prose px-4 py-8 prose-gray dark:prose-invert">
          <header className="not-prose text-center">
            <h1 className="font-fraunces text-3xl leading-relaxed text-gray-900 dark:text-white">
              {post.metadata.title}
            </h1>
            <p className="text-sm font-semibold tracking-widest text-gray-600 dark:text-gray-300">
              <time dateTime={post.metadata.date}>{formatDate(post.metadata.date)}</time>
            </p>
          </header>
          <CustomMDX source={post.content} />
        </article>
      </main>
    </>
  );
};

export default PostPage;
