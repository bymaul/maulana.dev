import { CustomMDX } from '@/components/mdx/mdx';
import ContentPage from '@/components/shared/content-page';
import { siteConfig } from '@/config/site';
import { getAllPosts, getPostBySlug } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';
import { notFound } from 'next/navigation';

type Params = Promise<{ slug: string }>;

export const generateStaticParams = async () => getAllPosts().map((post) => ({ slug: post.slug }));

export const generateMetadata = async ({ params }: { params: Params }) => {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return;

  const { title, description, date } = post.metadata;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: date,
      url: `${siteConfig.url}/posts/${post.slug}`,
      authors: siteConfig.author,
      images: siteConfig.ogImage,
    },
    twitter: { title, description, images: siteConfig.ogImage },
    alternates: { canonical: `${siteConfig.url}/posts/${post.slug}` },
  };
};

const PostPage = async ({ params }: { params: Params }) => {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.metadata.title,
    description: post.metadata.description,
    datePublished: post.metadata.date,
    author: [
      {
        '@type': 'Person',
        name: siteConfig.author,
        url: siteConfig.url,
      },
    ],
  };

  return (
    <ContentPage
      className="max-w-4xl"
      title={post.metadata.title}
      navLabel="Article navigation"
      contentLabel="Article content"
      jsonLd={jsonLd}
      header={
        <p className="mt-6 text-sm font-semibold tracking-widest text-gray-500 uppercase dark:text-gray-400">
          <time dateTime={post.metadata.date}>{formatDate(post.metadata.date)}</time>
        </p>
      }
    >
      <CustomMDX source={post.content} />
    </ContentPage>
  );
};

export default PostPage;
