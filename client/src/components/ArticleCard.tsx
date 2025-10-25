import { Link } from "wouter";

export interface ArticleCardProps {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishDate: string;
  author?: string;
  category?: string;
}

export default function ArticleCard({
  id,
  title,
  excerpt,
  coverImage,
  publishDate,
  author,
  category,
}: ArticleCardProps) {
  const formattedDate = new Date(publishDate).toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/article/${id}`}>
      <article className="article-card">
        {/* Image */}
        <div className="article-card-image">
          <img
            src={coverImage}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 bg-white">
          {/* Category & Date */}
          <div className="flex items-center gap-4 mb-3">
            {category && (
              <span className="text-xs font-serif font-bold text-gray-600 uppercase tracking-widest">
                {category}
              </span>
            )}
            <span className="text-xs text-gray-500">{formattedDate}</span>
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-3 leading-tight transition-colors">
            {title}
          </h2>

          {/* Excerpt */}
          <p className="text-gray-600 text-base leading-relaxed mb-4 line-clamp-3">
            {excerpt}
          </p>

          {/* Author & Read More */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            {author && (
              <span className="text-sm text-gray-500 font-medium">By {author}</span>
            )}
            <span className="text-sm font-serif font-bold text-gray-900 transition-transform">
              Read More →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

