interface AmenitiesGridProps {
  amenities: string[];
}

/** Map amenity names to simple SVG icons (inline). */
const amenityIcons: Record<string, string> = {
  WiFi: "📶",
  Pool: "🏊",
  Kitchen: "🍳",
  "Air Conditioning": "❄️",
  Parking: "🅿️",
  "Ocean View": "🌊",
  "Lake View": "🏞️",
  "Mountain View": "🏔️",
  Garden: "🌻",
  "Hot Tub": "🛁",
  Fireplace: "🔥",
  "Pet Friendly": "🐾",
  "Smart TV": "📺",
  Washer: "🧺",
  Dryer: "🧺",
  Elevator: "🛗",
  Gym: "💪",
  Sauna: "🧖",
  "Ski Storage": "⛷️",
  "Boat Dock": "⛵",
  "Breakfast Included": "🥐",
  "Room Service": "🛎️",
  "Maid Service": "🧹",
  "Concierge": "⭐",
  "Smart Home": "🏠",
  "Valet Parking": "🚗",
  "Surfboard Storage": "🏄",
  "Heated Floors": "🔥",
  "Outdoor Shower": "🚿",
  "Fire Pit": "🔥",
  "Hiking Access": "🥾",
  "Yoga Deck": "🧘",
  "Cooking Class": "👨‍🍳",
  Kayaks: "🛶",
  "Snorkeling Gear": "🤿",
  "Mini Bar": "🍸",
  "Butler Service": "🛎️",
  "Bikes Available": "🚲",
  "Bird Watching": "🐦",
  "Lake Access": "🏞️",
  "Guided Tours": "🗺️",
  "Vinyl Player": "🎵",
  "Rooftop Terrace": "🏗️",
  Rooftop: "🏗️",
};

/**
 * Server Component: displays a grid of amenities with icons.
 * Renders a clean, labeled grid using emoji icons mapped by name.
 */
export default function AmenitiesGrid({ amenities }: AmenitiesGridProps) {
  if (amenities.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-secondary">
        What this place offers
      </h2>
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
        {amenities.map((amenity) => (
          <div
            key={amenity}
            className="flex items-center gap-3 text-sm text-secondary"
          >
            <span className="text-xl" aria-hidden="true">
              {amenityIcons[amenity] ?? "•"}
            </span>
            <span>{amenity}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
