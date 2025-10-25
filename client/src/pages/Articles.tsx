import ArticleCard, { ArticleCardProps } from "@/components/ArticleCard";
import { useEffect, useState } from "react";

export default function Articles() {
  const [articles, setArticles] = useState<ArticleCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    // Load articles from posts-db.json
    const loadArticles = async () => {
      try {
        const response = await fetch("/posts-db.json");
        if (response.ok) {
          const data = await response.json();
          const loadedArticles = data.posts || [];
          setArticles(loadedArticles);

          // Extract unique categories
          const uniqueCategories = Array.from(
            new Set(
              loadedArticles
                .map((article: ArticleCardProps) => article.category)
                .filter((cat: string | undefined) => cat)
            )
          ).sort() as string[];
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error("Failed to load articles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, []);

  // Filter articles by selected category
  const filteredArticles =
    selectedCategory === "all"
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="container py-16 md:py-24">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
            All Articles
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Explore all my travel stories, insights, and discoveries from around the world.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="container">
        <div className="divider" />
      </div>

      {/* Category Filter */}
      {categories.length > 0 && (
        <section className="container py-8">
          <div className="flex flex-wrap gap-3 items-center">
            <span className="text-sm font-medium text-gray-600 uppercase tracking-widest">
              Filter by Country:
            </span>
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                selectedCategory === "all"
                  ? "bg-gray-900 text-white"
                  : "border border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900"
              }`}
            >
              All Countries
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-gray-900 text-white"
                    : "border border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Divider */}
      <div className="container">
        <div className="divider" />
      </div>

      {/* Articles Grid */}
      <section className="container py-12 md:py-16">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
              <p className="mt-4 text-gray-600">Loading articles...</p>
            </div>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-gray-600">
              {selectedCategory === "all"
                ? "No articles yet. Check back soon!"
                : `No articles found for ${selectedCategory}. Try another country!`}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-600">
              Showing {filteredArticles.length} article
              {filteredArticles.length !== 1 ? "s" : ""}{" "}
              {selectedCategory !== "all" && `from ${selectedCategory}`}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.id} {...article} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

