import CustomLink from '@/components/custom-link';
import { CustomMDX } from '@/components/mdx';
import { buildJsonLd, buildMetadata } from '@/lib/metadata';
import { getAllPosts, getPostBySlug } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import { notFound } from 'next/navigation';
import { FaX } from 'react-icons/fa6';

type Params = Promise<{ slug: string }>;

export const generateStaticParams = async () => getAllPosts().map((post) => ({ slug: post.slug }));

export const generateMetadata = async ({ params }: { params: Params }) => {
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

const PostPage = async ({ params }: { params: Params }) => {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const jsonLd = buildJsonLd(
    'BlogPosting',
    post.metadata.title,
    post.metadata.description,
    `/posts/${post.slug}`,
    post.metadata.date,
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <nav className="flex items-center justify-center pt-10">
        <CustomLink className="inline-flex hover:mb-6 hover:scale-125" href="/">
          <FaX />
          <div className="sr-only">Close</div>
        </CustomLink>
      </nav>
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
