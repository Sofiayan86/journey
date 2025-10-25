import ArticleCard, { ArticleCardProps } from "@/components/ArticleCard";
import { useEffect, useState } from "react";
import { Link } from "wouter";

export default function Home() {
  const [featuredArticles, setFeaturedArticles] = useState<ArticleCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load articles from posts-db.json
    const loadArticles = async () => {
      try {
        const response = await fetch("/posts-db.json");
        if (response.ok) {
          const data = await response.json();
          // Get first 3 articles as featured
          setFeaturedArticles((data.posts || []).slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to load articles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="container py-20 md:py-32 flex flex-col justify-center min-h-[600px]">
        <div className="max-w-3xl">
          <h1 className="text-6xl md:text-7xl font-serif font-bold text-gray-900 mb-6 leading-tight">
            Journeys & Discoveries
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8">
            A personal travel magazine celebrating the world's most beautiful places, cultures, and moments.
          </p>
          <div className="flex gap-4">
            <Link href="/articles">
              <button className="px-8 py-3 bg-gray-900 text-white font-serif font-bold hover:bg-gray-800 transition-colors">
                Explore Articles
              </button>
            </Link>
            <Link href="/map">
              <button className="px-8 py-3 border-2 border-gray-900 text-gray-900 font-serif font-bold hover:bg-gray-50 transition-colors">
                View Map
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container">
        <div className="divider" />
      </div>

      {/* Featured Articles Section */}
      <section className="container py-16 md:py-24">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Latest Stories
          </h2>
          <p className="text-lg text-gray-600">
            Discover our most recent travel adventures and insights.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
              <p className="mt-4 text-gray-600">Loading articles...</p>
            </div>
          </div>
        ) : featuredArticles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-gray-600">No articles yet. Check back soon!</p>
          </div>
        ) : (
          <>
            {/* Featured Article (Large) */}
            <div className="mb-12">
              <ArticleCard {...featuredArticles[0]} />
            </div>

            {/* Other Featured Articles (Grid) */}
            {featuredArticles.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {featuredArticles.slice(1).map((article) => (
                  <ArticleCard key={article.id} {...article} />
                ))}
              </div>
            )}
          </>
        )}

        {/* View All Articles Link */}
        <div className="mt-16 text-center">
          <Link href="/articles">
            <button className="inline-block text-lg font-serif font-bold text-gray-900 hover:text-gray-600 transition-colors">
              View All Articles →
            </button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16 md:py-24 mt-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
              Explore the World
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Discover interactive maps of all my travels, complete with detailed routes and location information.
            </p>
            <Link href="/map">
              <button className="px-8 py-3 bg-gray-900 text-white font-serif font-bold hover:bg-gray-800 transition-colors">
                View Interactive Map
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

