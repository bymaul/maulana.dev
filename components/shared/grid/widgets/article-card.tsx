import EntryCard from '@/components/shared/grid/entry-card';
import { getFeaturedPost } from '@/lib/mdx';
import { formatDate } from '@/lib/utils';

export default function ArticleCard() {
  const post = getFeaturedPost();

  if (!post) {
    return (
      <EntryCard
        href="/?view=articles"
        badge="Article"
        title="No articles yet"
        description="Check back soon for new writing."
      />
    );
  }

  return (
    <EntryCard
      href={`/posts/${post.slug}`}
      badge={formatDate(post.metadata.date)}
      title={post.metadata.title}
      description={post.metadata.description}
      descriptionClassName="line-clamp-4"
    />
  );
}
