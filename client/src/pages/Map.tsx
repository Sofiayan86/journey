import LeafletMap from "@/components/LeafletMap";
import { useEffect, useState } from "react";

interface ArticleLocation {
  id: string;
  title: string;
  category: string;
  lat: number;
  lng: number;
  coverImage: string;
  excerpt?: string;
}

export default function Map() {
  const [locations, setLocations] = useState<ArticleLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<ArticleLocation | null>(null);

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const response = await fetch("/posts-db.json");
        if (response.ok) {
          const data = await response.json();
          const locationsData = (data.posts || [])
            .filter((post: any) => post.location)
            .map((post: any) => ({
              id: post.id,
              title: post.title,
              category: post.category || "Travel",
              lat: post.location.lat,
              lng: post.location.lng,
              coverImage: post.coverImage,
              excerpt: post.excerpt,
            }));
          setLocations(locationsData);
        }
      } catch (error) {
        console.error("Failed to load locations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLocations();
  }, []);

  const handleMarkerClick = (id: string) => {
    const location = locations.find((l) => l.id === id);
    if (location) setSelectedLocation(location);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="container py-16 md:py-24">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
            Explore the World
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Discover all the places I've visited. Click on any marker to learn more about each destination.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="container">
        <div className="divider" />
      </div>

      {/* Map Container */}
      <section className="container py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Map */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="bg-gray-100 rounded h-96 md:h-[600px] flex items-center justify-center border border-gray-200">
                <p className="text-gray-600">Loading map...</p>
              </div>
            ) : locations.length === 0 ? (
              <div className="bg-gray-100 rounded h-96 md:h-[600px] flex items-center justify-center border border-gray-200">
                <p className="text-gray-600">No destinations to display</p>
              </div>
            ) : (
              <LeafletMap
                locations={locations}
                height="600px"
                draggable={true}
                onMarkerClick={handleMarkerClick}
              />
            )}
          </div>

          {/* Sidebar - Locations List */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded p-6 h-96 md:h-[600px] overflow-y-auto">
              <h2 className="text-lg font-serif font-bold text-gray-900 mb-4">
                Destinations
              </h2>

              {isLoading ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">Loading...</p>
                </div>
              ) : locations.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 text-sm">No destinations yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {locations.map((location) => (
                    <button
                      key={location.id}
                      onClick={() => setSelectedLocation(location)}
                      className={`w-full text-left p-3 rounded transition-colors ${
                        selectedLocation?.id === location.id
                          ? "bg-gray-900 text-white"
                          : "bg-white hover:bg-gray-100"
                      }`}
                    >
                      <p className="font-medium text-sm line-clamp-2">{location.title}</p>
                      <p className="text-xs opacity-70 mt-1">{location.category}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Selected Location Details */}
        {selectedLocation && (
          <div className="mt-12 bg-gray-50 rounded p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Image */}
              <div className="md:col-span-1">
                <img
                  src={selectedLocation.coverImage}
                  alt={selectedLocation.title}
                  className="w-full h-48 object-cover rounded"
                />
              </div>

              {/* Details */}
              <div className="md:col-span-2">
                <p className="text-xs font-serif font-bold text-gray-600 uppercase tracking-widest mb-2">
                  {selectedLocation.category}
                </p>
                <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                  {selectedLocation.title}
                </h3>
                {selectedLocation.excerpt && (
                  <p className="text-gray-600 mb-4">{selectedLocation.excerpt}</p>
                )}
                <p className="text-sm text-gray-500 mb-4">
                  Latitude: {selectedLocation.lat.toFixed(4)}
                  <br />
                  Longitude: {selectedLocation.lng.toFixed(4)}
                </p>
                <a
                  href={`/article/${selectedLocation.id}`}
                  className="inline-block px-6 py-2 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
                >
                  Read Article
                </a>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Info Section */}
      <section className="bg-gray-50 py-12 md:py-16 mt-12">
        <div className="container">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
              About This Map
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              This interactive map showcases all the destinations featured in my travel articles. 
              Each marker represents a unique journey and story.
            </p>
            <p className="text-gray-600 leading-relaxed">
              The map is powered by Leaflet.js with support for zooming, panning, and detailed location 
              information. Click on any marker to view the article and learn more about that destination.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

