import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-gpx";

interface GPXMapProps {
  gpxFile: string;
  height?: string;
}

export default function GPXMap({ gpxFile, height = "400px" }: GPXMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || !gpxFile) return;

    // Initialize map
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([20, 0], 2);

      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapInstanceRef.current);
    }

    // Load GPX file
    const loadGPX = async () => {
      try {
        const response = await fetch(gpxFile);
        if (!response.ok) {
          console.error("Failed to load GPX file");
          return;
        }

        const gpxText = await response.text();
        const gpxLayer = new (L as any).GPX(gpxText, {
          async: true,
          marker_options: {
            startIconUrl: "/images/pin-icon-start.png",
            endIconUrl: "/images/pin-icon-end.png",
            shadowUrl: "/images/pin-shadow.png",
          },
        });

        gpxLayer.on("loaded", () => {
          if (mapInstanceRef.current && gpxLayer.getBounds) {
            try {
              mapInstanceRef.current.fitBounds(gpxLayer.getBounds());
            } catch (e) {
              console.warn("Could not fit bounds", e);
            }
          }
        });

        if (mapInstanceRef.current) {
          gpxLayer.addTo(mapInstanceRef.current);
        }
      } catch (error) {
        console.error("Error loading GPX file:", error);
      }
    };

    loadGPX();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.off();
      }
    };
  }, [gpxFile]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: height,
        borderRadius: "4px",
        overflow: "hidden",
        border: "1px solid #e5e7eb",
      }}
    />
  );
}

