import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { ChevronLeft } from "lucide-react";
import { Link } from "wouter";
import GPXMap from "@/components/GPXMap";

interface ArticleData {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishDate: string;
  author?: string;
  category?: string;
  gpxFile?: string;
  location?: {
    lat: number;
    lng: number;
  };
}

export default function Article() {
  const [match, params] = useRoute("/article/:id");
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!match) return;

    const loadArticle = async () => {
      try {
        const response = await fetch("/posts-db.json");
        if (!response.ok) throw new Error("Failed to load articles");

        const data = await response.json();
        const foundArticle = data.posts?.find(
          (post: ArticleData) => post.id === params?.id
        );

        if (!foundArticle) {
          setError("Article not found");
          return;
        }

        setArticle(foundArticle);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load article");
      } finally {
        setIsLoading(false);
      }
    };

    loadArticle();
  }, [match, params?.id]);

  if (!match) return null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
          <p className="mt-4 text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container py-20">
          <div className="text-center">
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              {error || "Article not found"}
            </h1>
            <Link href="/articles">
              <button className="text-gray-600 hover:text-gray-900 transition-colors">
                Back to Articles
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(article.publishDate).toLocaleDateString("zh-TW", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="container py-6">
        <Link href="/articles">
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors font-medium">
            <ChevronLeft className="w-4 h-4" />
            Back to Articles
          </button>
        </Link>
      </div>

      {/* Hero Image */}
      <div className="w-full h-96 md:h-[500px] overflow-hidden">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Header */}
      <div className="container py-12 md:py-16">
        <div className="max-w-3xl">
          {/* Category & Date */}
          <div className="flex items-center gap-4 mb-4">
            {article.category && (
              <span className="text-xs font-serif font-bold text-gray-600 uppercase tracking-widest">
                {article.category}
              </span>
            )}
            <span className="text-sm text-gray-500">{formattedDate}</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-gray-600 leading-relaxed mb-6">
            {article.excerpt}
          </p>

          {/* Author */}
          {article.author && (
            <div className="flex items-center gap-3 pt-6 border-t border-gray-200">
              <div className="w-10 h-10 rounded-full bg-gray-200" />
              <div>
                <p className="font-medium text-gray-900">{article.author}</p>
                <p className="text-sm text-gray-500">Travel Writer</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="container">
        <div className="divider" />
      </div>

      {/* Article Content */}
      <div className="container py-12 md:py-16">
        <div className="max-w-3xl prose prose-lg">
          {/* Parse markdown-like content or HTML */}
          <div className="text-gray-700 leading-relaxed space-y-6">
            {article.content ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: article.content.replace(/\n\n/g, "</p><p>").replace(/^/, "<p>").replace(/$/, "</p>"),
                }}
              />
            ) : (
              <p>
                This is a sample article. In the full implementation, article content would be loaded from
                your posts database and rendered here with support for images, text formatting, and more.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* GPX Map */}
      {article.gpxFile && (
        <div className="container py-12 md:py-16">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
              Journey Map
            </h2>
            <GPXMap gpxFile={article.gpxFile} height="400px" />
          </div>
        </div>
      )}

      {/* Related Articles Placeholder */}
      <div className="bg-gray-50 py-12 md:py-16 mt-12">
        <div className="container">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
            More Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-gray-200 h-48" />
                <div className="p-4">
                  <p className="text-sm text-gray-500 mb-2">Coming Soon</p>
                  <h3 className="font-serif font-bold text-gray-900">Related Article {i}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

