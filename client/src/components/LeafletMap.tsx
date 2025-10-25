import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Location {
  id: string;
  title: string;
  lat: number;
  lng: number;
  coverImage?: string;
  onMarkerClick?: (id: string) => void;
}

interface LeafletMapProps {
  locations: Location[];
  center?: [number, number];
  zoom?: number;
  draggable?: boolean;
  height?: string;
  onMarkerClick?: (id: string) => void;
}

export default function LeafletMap({
  locations,
  center = [20, 0],
  zoom = 2,
  draggable = true,
  height = "600px",
}: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView(center, zoom);

      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapInstanceRef.current);

      // Disable dragging if not allowed
      if (!draggable) {
        mapInstanceRef.current.dragging.disable();
      }
    }

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add markers for locations
    locations.forEach((location) => {
      const marker = L.marker([location.lat, location.lng])
        .addTo(mapInstanceRef.current!)
        .bindPopup(
          `<div style="min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; font-weight: bold;">${location.title}</h3>
            ${
              location.coverImage
                ? `<img src="${location.coverImage}" style="width: 100%; height: 150px; object-fit: cover; margin-bottom: 8px; border-radius: 4px;" />`
                : ""
            }
            <a href="/article/${location.id}" style="color: #333; text-decoration: none; font-weight: 500;">
              Read Article →
            </a>
          </div>`
        );

      marker.on("click", () => {
        location.onMarkerClick?.(location.id);
      });

      markersRef.current.push(marker);
    });

    // Auto-fit bounds if multiple locations
    if (locations.length > 0) {
      const group = new L.FeatureGroup(markersRef.current);
      mapInstanceRef.current.fitBounds(group.getBounds(), { padding: [50, 50] });
    }

    return () => {
      // Cleanup on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.off();
      }
    };
  }, [locations, center, zoom, draggable]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: height,
        borderRadius: "4px",
        overflow: "hidden",
      }}
    />
  );
}

