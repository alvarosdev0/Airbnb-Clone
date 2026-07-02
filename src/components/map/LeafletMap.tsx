"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import type { PropertyWithDetails } from "@/types";

/**
 * Fix Leaflet default marker icon (known webpack/Next.js bundling issue).
 * Without this, markers render as broken image icons.
 */
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface LeafletMapProps {
  properties: PropertyWithDetails[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  singleMode?: boolean;
  className?: string;
}

/**
 * Client Component: renders a Leaflet map with property markers.
 * Dynamically imported via PropertyMapWrapper with ssr:false.
 *
 * Homepage mode (default): shows all properties with popups.
 * Detail singleMode: single marker, no popup, tight zoom.
 */
export default function LeafletMap({
  properties,
  center,
  zoom = 3,
  height = "400px",
  singleMode = false,
  className,
}: LeafletMapProps) {
  const mapCenter: [number, number] =
    center ??
    (properties.length > 0
      ? [properties[0].lat, properties[0].lng]
      : [20, 0]);

  const mapZoom = center ? zoom : Math.min(zoom, 3);

  if (properties.length === 0) {
    return (
      <div
        style={{ height, width: "100%" }}
        className="flex items-center justify-center rounded-xl bg-gray-light/30"
      >
        <p className="text-sm text-gray-soft">No properties to display on map</p>
      </div>
    );
  }

  return (
    <div
      style={{ height, width: "100%" }}
      className={`overflow-hidden rounded-xl ${className ?? ""}`}
    >
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {singleMode && properties.length === 1 ? (
          <Marker position={[properties[0].lat, properties[0].lng]} />
        ) : (
          properties.map((property) => (
            <Marker
              key={property.id}
              position={[property.lat, property.lng]}
            >
              <Popup>
                <div style={{ minWidth: "180px", fontFamily: "system-ui, sans-serif" }}>
                  {/* Thumbnail */}
                  <div
                    style={{
                      position: "relative",
                      height: "90px",
                      overflow: "hidden",
                      borderRadius: "6px",
                      marginBottom: "8px",
                    }}
                  >
                    <img
                      src={property.images[0] ?? ""}
                      alt={property.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      loading="lazy"
                    />
                  </div>

                  {/* Title */}
                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: "14px",
                      margin: 0,
                      lineHeight: 1.3,
                    }}
                  >
                    {property.title}
                  </p>

                  {/* Location */}
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#64748B",
                      margin: "2px 0 4px",
                    }}
                  >
                    {property.city}, {property.country}
                  </p>

                  {/* Price */}
                  <p style={{ fontWeight: 700, fontSize: "14px", margin: 0 }}>
                    {formatPrice(property.pricePerNight)}
                    <span style={{ fontWeight: 400, color: "#64748B" }}>
                      {" "}night
                    </span>
                  </p>

                  {/* Detail link */}
                  <Link
                    href={`/properties/${property.id}`}
                    style={{
                      display: "block",
                      marginTop: "8px",
                      padding: "6px 12px",
                      background: "var(--color-primary, #D04444)",
                      color: "var(--color-bg, #fff)",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: 500,
                      textAlign: "center",
                      textDecoration: "none",
                    }}
                  >
                    View details
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))
        )}
      </MapContainer>
    </div>
  );
}
