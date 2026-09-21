import Link from "next/link";
import { fetchBlogPosts, formatBlogDate, estimateReadingTime } from "@/data/blogApi";
import Reveal from "@/components/Reveal";
import RevealGroup from "@/components/RevealGroup";
import RevealItem from "@/components/RevealItem";
import Badge from "@/components/Badge";
import Icon from "@/components/Icon";
import SectionIllustration from "@/components/SectionIllustration";

export const metadata = {
  title: "Blog",
  description:
    "Financial tips, money habits, and practical guides from the Wisemonie team. Learn how to align your plan with your spending.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Wisemonie Blog",
    description:
      "Financial tips, money habits, and practical guides from the Wisemonie team.",
    url: "https://wisemonie.app/blog",
    type: "website",
  },
};

function BlogCard({ post }) {
  const date = formatBlogDate(post.publishedAt || post.createdAt);
  const readTime = estimateReadingTime(post.content);

  return (
    <RevealItem as="article" className="blog-card">
      <Link href={`/blog/${post.slug}`} className="blog-card__link">
        {post.coverImageUrl ? (
          <div className="blog-card__cover">
            <img src={post.coverImageUrl} alt="" loading="lazy" />
          </div>
        ) : (
          <div className="blog-card__cover blog-card__cover--fallback">
            <Icon name="article" />
          </div>
        )}
        <div className="blog-card__body">
          <h2 className="blog-card__title">{post.title}</h2>
          {post.excerpt && (
            <p className="blog-card__excerpt">{post.excerpt}</p>
          )}
          <div className="blog-card__meta">
            <span>{date}</span>
            <span className="blog-card__dot">&middot;</span>
            <span>{readTime} min read</span>
          </div>
        </div>
      </Link>
    </RevealItem>
  );
}

export default async function BlogPage({ searchParams }) {
  const params = await searchParams;
  const page = Math.max(0, parseInt(params?.page || "0", 10) || 0);
  const { posts, totalPages, empty } = await fetchBlogPosts(page, 12);

  return (
    <main className="blog-main">
      <section className="section blog-hero-section">
        <SectionIllustration side="right" />
        <Reveal as="div" className="section-heading">
          <Badge icon="article">BLOG</Badge>
          <h1>Money wisdom, delivered.</h1>
          <p>
            Practical tips on aligning your plan with your spending. From the team building Wisemonie.
          </p>
        </Reveal>
      </section>

      {empty ? (
        <section className="section blog-empty-section">
          <Reveal as="div" className="blog-empty">
            <Icon name="edit_note" />
            <h2>Posts are on the way.</h2>
            <p>
              We are writing our first articles. Check back soon for money tips, product updates, and real stories from Wisemonie users.
            </p>
          </Reveal>
        </section>
      ) : (
        <>
          <section className="section blog-grid-section">
            <RevealGroup as="div" className="blog-grid">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </RevealGroup>
          </section>

          {totalPages > 1 && (
            <nav className="blog-pagination" aria-label="Blog pagination">
              {page > 0 && (
                <Link
                  href={`/blog?page=${page - 1}`}
                  className="blog-pagination__btn"
                >
                  &larr; Newer posts
                </Link>
              )}
              <span className="blog-pagination__info">
                Page {page + 1} of {totalPages}
              </span>
              {page < totalPages - 1 && (
                <Link
                  href={`/blog?page=${page + 1}`}
                  className="blog-pagination__btn"
                >
                  Older posts &rarr;
                </Link>
              )}
            </nav>
          )}
        </>
      )}
    </main>
  );
}
