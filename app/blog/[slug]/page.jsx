import { notFound } from "next/navigation";
import Link from "next/link";
import { fetchBlogPost, fetchBlogPosts, formatBlogDate, estimateReadingTime } from "@/data/blogApi";
import BlogContent from "@/components/BlogContent";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await fetchBlogPost(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.excerpt || post.title,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      url: `https://wisemonie.app/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.authorName || "Wisemonie Team"],
      ...(post.coverImageUrl && {
        images: [{ url: post.coverImageUrl, width: 1200, height: 630 }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || post.title,
      ...(post.coverImageUrl && { images: [post.coverImageUrl] }),
    },
  };
}

export async function generateStaticParams() {
  const { posts } = await fetchBlogPosts(0, 50);
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await fetchBlogPost(slug);
  if (!post) notFound();

  const date = formatBlogDate(post.publishedAt || post.createdAt);
  const readTime = estimateReadingTime(post.content);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || post.title,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.authorName || "Wisemonie Team",
    },
    publisher: {
      "@type": "Organization",
      name: "Wisemonie",
      logo: { "@type": "ImageObject", url: "https://wisemonie.app/images/iconwithoutbackground.png" },
    },
    mainEntityOfPage: `https://wisemonie.app/blog/${post.slug}`,
    ...(post.coverImageUrl && { image: post.coverImageUrl }),
  };

  return (
    <main className="blog-post-main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="blog-post">
        <Reveal as="header" className="blog-post__header">
          <Link href="/blog" className="blog-post__back">
            <Icon name="arrow_back" /> All posts
          </Link>

          <h1 className="blog-post__title">{post.title}</h1>

          <div className="blog-post__meta">
            <span>{post.authorName || "Wisemonie Team"}</span>
            <span className="blog-card__dot">&middot;</span>
            <span>{date}</span>
            <span className="blog-card__dot">&middot;</span>
            <span>{readTime} min read</span>
          </div>
        </Reveal>

        {post.coverImageUrl && (
          <Reveal as="div" variant="up" className="blog-post__cover">
            <img src={post.coverImageUrl} alt="" />
          </Reveal>
        )}

        <Reveal as="div" variant="up" className="blog-post__body">
          <BlogContent content={post.content} />
        </Reveal>

        {post.media && post.media.length > 0 && (
          <div className="blog-post__media">
            {post.media
              .sort((a, b) => a.sortOrder - b.sortOrder)
              .map((m) => {
                if (m.mediaType === "IMAGE" || m.mediaType === "GIF" || m.mediaType === "MEME") {
                  return (
                    <img
                      key={m.id}
                      src={m.url}
                      alt={m.fileName || ""}
                      className="blog-post__media-img"
                      loading="lazy"
                    />
                  );
                }
                if (m.mediaType === "VIDEO") {
                  return (
                    <video
                      key={m.id}
                      src={m.url}
                      controls
                      playsInline
                      preload="metadata"
                      className="blog-post__media-video"
                    />
                  );
                }
                return null;
              })}
          </div>
        )}

        <footer className="blog-post__footer">
          <Link href="/blog" className="blog-post__back">
            <Icon name="arrow_back" /> Back to all posts
          </Link>
        </footer>
      </article>
    </main>
  );
}
