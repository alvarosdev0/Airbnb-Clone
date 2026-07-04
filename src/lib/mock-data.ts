import type { PropertyWithDetails } from "@/types";

/**
 * Standalone mock data: 25 fictitious properties across 8 categories.
 * Images from loremflickr.com — real Flickr photos themed by keyword.
 * All properties, locations, hosts, and reviews are fictitious.
 */

// ---------------------------------------------------------------------------
// Image helpers — loremflickr with lock for consistent results
// ---------------------------------------------------------------------------

const IMG = (keyword: string, lock: number) =>
  `https://loremflickr.com/800/600/${keyword.replace(/ /g, ",")}?lock=${lock}`;

const HOST = (lock: number) =>
  `https://loremflickr.com/200/200/portrait,face?lock=${lock}`;

// ---------------------------------------------------------------------------
// Hosts (fictitious)
// ---------------------------------------------------------------------------

const hostUsers = [
  {
    id: "mock-host-1",
    name: "Sophie Laurent",
    image: HOST(301),
    bio: "Parisian host and art curator. I love hosting travelers from around the world.",
  },
  {
    id: "mock-host-2",
    name: "James Cooper",
    image: HOST(302),
    bio: "Adventure photographer based in Vancouver. My properties are curated for those who love nature.",
  },
  {
    id: "mock-host-3",
    name: "Maria Rodríguez",
    image: HOST(303),
    bio: "Born and raised in Barcelona. I manage several vacation rentals.",
  },
  {
    id: "mock-host-4",
    name: "Takeshi Yamamoto",
    image: HOST(304),
    bio: "Tokyo-based designer. My spaces blend traditional Japanese aesthetics with modern minimalism.",
  },
  {
    id: "mock-host-5",
    name: "Emily Chen",
    image: HOST(305),
    bio: "Digital nomad turned host. I split my time between Bali and Sydney.",
  },
  {
    id: "mock-host-6",
    name: "Carlos Mendes",
    image: HOST(306),
    bio: "Lisbon local and food enthusiast. My apartments are in the best neighborhoods.",
  },
  {
    id: "mock-host-7",
    name: "Amara Okafor",
    image: HOST(307),
    bio: "Lagos-born, London-based architect. Each property reflects a unique design philosophy.",
  },
  {
    id: "mock-host-8",
    name: "Liam Murphy",
    image: HOST(308),
    bio: "Irish countryside enthusiast. I restored a 200-year-old farmhouse.",
  },
];

// ---------------------------------------------------------------------------
// Reviews (fictitious)
// ---------------------------------------------------------------------------

const reviewComments = [
  "Absolutely stunning place! The views were even better than the photos.",
  "Great location and very responsive host. The apartment was clean and exactly as described.",
  "Perfect getaway spot. The amenities were top-notch and the neighborhood was lovely.",
  "A wonderful experience from start to finish. The host provided excellent recommendations.",
  "Beautiful accommodation with all the comforts of home. The bed was incredibly comfortable.",
  "The location couldn't have been better. Walkable to everything we wanted to see.",
  "Our family had an amazing time. The kids loved the pool and the outdoor space.",
  "Fantastic value for money. The space was larger than expected and beautifully decorated.",
  "The host went above and beyond to make our stay special. Truly memorable experience.",
  "Impeccably clean and stylish. The photos don't do it justice — it's even more beautiful.",
];

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateMockReviews(
  propertyId: string,
  hostIndex: number,
  seed: number,
): PropertyWithDetails["reviews"] {
  const rng = seededRandom(seed);
  const count = 3 + Math.floor(rng() * 3);
  const reviews: PropertyWithDetails["reviews"] = [];

  for (let i = 0; i < count; i++) {
    let reviewerIdx = Math.floor(rng() * hostUsers.length);
    while (reviewerIdx === hostIndex) {
      reviewerIdx = Math.floor(rng() * hostUsers.length);
    }
    const reviewer = hostUsers[reviewerIdx];
    const daysAgo = Math.floor(rng() * 365) + 1;
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    reviews.push({
      id: `mock-review-${propertyId}-${i}`,
      rating: 3 + Math.floor(rng() * 3),
      comment: reviewComments[Math.floor(rng() * reviewComments.length)],
      userId: reviewer.id,
      user: {
        id: reviewer.id,
        name: reviewer.name,
        image: reviewer.image,
      },
      propertyId,
      createdAt: date,
    });
  }

  return reviews.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
  );
}

// ---------------------------------------------------------------------------
// Property templates (ALL FICTITIOUS)
// ---------------------------------------------------------------------------

interface MockPropertyTemplate {
  title: string;
  description: string;
  pricePerNight: number;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  address: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  category: string;
  amenities: string[];
  images: string[];
  hostIndex: number;
}

const propertyTemplates: MockPropertyTemplate[] = [
  // =========================================================================
  // BEACH
  // =========================================================================
  {
    title: "Seaside Paradise Villa",
    description: "Wake up to the sound of waves in this stunning beachfront villa. Floor-to-ceiling windows offer panoramic ocean views, and the private terrace is perfect for sunset cocktails. Steps from the sand.",
    pricePerNight: 350, bedrooms: 3, bathrooms: 2, maxGuests: 6,
    address: "12 Ocean Drive", city: "Malibu", country: "United States",
    lat: 34.0259, lng: -118.7798, category: "Beach",
    amenities: ["WiFi", "Pool", "Kitchen", "Air Conditioning", "Parking", "Ocean View"],
    images: [
      IMG("beach house ocean malibu", 11),
      IMG("beach villa luxury ocean", 12),
      IMG("tropical beach paradise", 13),
      IMG("ocean view beach house", 14),
    ],
    hostIndex: 1,
  },
  {
    title: "Bungalow Beach Retreat",
    description: "Charming beach bungalow with a tropical garden and hammocks. The covered patio is ideal for al fresco dining. A short walk to the best surf breaks.",
    pricePerNight: 180, bedrooms: 2, bathrooms: 1, maxGuests: 4,
    address: "45 Coconut Lane", city: "Byron Bay", country: "Australia",
    lat: -28.6479, lng: 153.6022, category: "Beach",
    amenities: ["WiFi", "Kitchen", "Air Conditioning", "Garden", "Surfboard Storage"],
    images: [
      IMG("beach bungalow tropical", 21),
      IMG("surf beach australia coast", 22),
      IMG("beach garden tropical", 23),
    ],
    hostIndex: 4,
  },
  {
    title: "White Sands Studio",
    description: "Modern studio apartment directly on the white sands of Cancun. Rooftop pool with infinity edge overlooking the Caribbean.",
    pricePerNight: 220, bedrooms: 1, bathrooms: 1, maxGuests: 2,
    address: "Blvd. Kukulcan KM 12", city: "Cancún", country: "Mexico",
    lat: 21.1209, lng: -86.7521, category: "Beach",
    amenities: ["WiFi", "Pool", "Kitchen", "Air Conditioning", "Gym", "Room Service"],
    images: [
      IMG("white sand beach cancun", 31),
      IMG("beach resort pool luxury", 32),
      IMG("modern studio apartment beach", 33),
      IMG("infinity pool beach resort", 34),
      IMG("ocean front villa modern", 35),
    ],
    hostIndex: 2,
  },
  {
    title: "Coral Cove Cottage",
    description: "Pastel-colored cottage in one of the most photographed spots in Cartagena. Rooftop terrace with ocean breeze and a plunge pool.",
    pricePerNight: 150, bedrooms: 2, bathrooms: 1, maxGuests: 3,
    address: "Calle del Mar 8-15", city: "Cartagena", country: "Colombia",
    lat: 10.391, lng: -75.5144, category: "Beach",
    amenities: ["WiFi", "Pool", "Kitchen", "Air Conditioning", "Rooftop Terrace"],
    images: [
      IMG("cartagena colorful colonial", 41),
      IMG("caribbean cottage colorful", 42),
      IMG("rooftop terrace ocean view", 43),
    ],
    hostIndex: 2,
  },

  // =========================================================================
  // MOUNTAIN
  // =========================================================================
  {
    title: "Alpine Chalet with View",
    description: "Luxurious wooden chalet nestled in the Swiss Alps. Floor-to-ceiling windows frame the Matterhorn. Hot tub on the deck, fireplace in the living room.",
    pricePerNight: 520, bedrooms: 4, bathrooms: 3, maxGuests: 8,
    address: "Alpenstrasse 7", city: "Zermatt", country: "Switzerland",
    lat: 46.0207, lng: 7.7491, category: "Mountain",
    amenities: ["WiFi", "Kitchen", "Fireplace", "Hot Tub", "Ski Storage", "Parking", "Heated Floors"],
    images: [
      IMG("swiss alps chalet zermatt", 51),
      IMG("mountain chalet luxury alps", 52),
      IMG("snow mountain alps switzerland", 53),
      IMG("mountain cabin winter snow", 54),
    ],
    hostIndex: 1,
  },
  {
    title: "Cozy Mountain Cabin",
    description: "Rustic log cabin in the Rocky Mountains with a wood-burning stove. Perfect for a romantic getaway. Hike straight from the door.",
    pricePerNight: 195, bedrooms: 1, bathrooms: 1, maxGuests: 2,
    address: "850 Pine Ridge Rd", city: "Aspen", country: "United States",
    lat: 39.1911, lng: -106.8175, category: "Mountain",
    amenities: ["WiFi", "Kitchen", "Fireplace", "Parking", "Pet Friendly"],
    images: [
      IMG("snowy mountain cabin aspen", 61),
      IMG("rocky mountains cabin forest", 62),
      IMG("aspen mountain cabin cozy", 63),
    ],
    hostIndex: 0,
  },
  {
    title: "Andean Mountain Lodge",
    description: "Eco-lodge at 3,200m elevation with stunning views of the Andes. Organic breakfast included. Guided treks and stargazing available.",
    pricePerNight: 120, bedrooms: 2, bathrooms: 1, maxGuests: 4,
    address: "Camino del Inca 452", city: "Cusco", country: "Peru",
    lat: -13.5167, lng: -71.9781, category: "Mountain",
    amenities: ["WiFi", "Kitchen", "Breakfast Included", "Fireplace", "Guided Tours"],
    images: [
      IMG("andes mountains peru cusco", 71),
      IMG("mountain lodge view nature", 72),
      IMG("peru cusco mountain landscape", 73),
      IMG("andean mountains valley lodge", 74),
    ],
    hostIndex: 3,
  },
  {
    title: "Ski-In Ski-Out Chalet",
    description: "Direct slope access from your doorstep in Chamonix. Modern alpine decor with a sauna and game room. Spectacular Mont Blanc views.",
    pricePerNight: 420, bedrooms: 3, bathrooms: 2, maxGuests: 6,
    address: "45 Rue du Mont-Blanc", city: "Chamonix", country: "France",
    lat: 45.9237, lng: 6.8694, category: "Mountain",
    amenities: ["WiFi", "Kitchen", "Sauna", "Ski Storage", "Fireplace", "Parking", "Washer"],
    images: [
      IMG("ski chalet mountain chamonix", 81),
      IMG("mont blanc france alps", 82),
      IMG("chamonix winter alps ski", 83),
    ],
    hostIndex: 7,
  },

  // =========================================================================
  // CITY
  // =========================================================================
  {
    title: "Manhattan Skyline Loft",
    description: "Industrial-chic loft in the heart of SoHo. Exposed brick walls, floor-to-ceiling windows, and a rooftop terrace with skyline views. Walk to world-class dining.",
    pricePerNight: 450, bedrooms: 1, bathrooms: 1, maxGuests: 2,
    address: "150 Greene Street", city: "New York", country: "United States",
    lat: 40.7243, lng: -73.9985, category: "City",
    amenities: ["WiFi", "Kitchen", "Air Conditioning", "Elevator", "Rooftop", "Washer", "Dryer"],
    images: [
      IMG("manhattan loft apartment nyc", 91),
      IMG("nyc skyline apartment view", 92),
      IMG("modern loft interior design", 93),
      IMG("urban apartment city view", 94),
      IMG("new york apartment soho loft", 95),
    ],
    hostIndex: 0,
  },
  {
    title: "Tokyo Shibuya Apartment",
    description: "Compact, ultra-clean apartment steps from Shibuya Crossing. High-tech amenities, automated blinds, and a curated guide to hidden ramen spots.",
    pricePerNight: 160, bedrooms: 1, bathrooms: 1, maxGuests: 2,
    address: "2-15-1 Shibuya", city: "Tokyo", country: "Japan",
    lat: 35.6595, lng: 139.7004, category: "City",
    amenities: ["WiFi", "Kitchen", "Air Conditioning", "Smart TV", "Washer", "Mini Fridge"],
    images: [
      IMG("tokyo shibuya street japan", 101),
      IMG("japanese apartment modern interior", 102),
      IMG("tokyo apartment minimalist", 103),
    ],
    hostIndex: 3,
  },
  {
    title: "Parisian Apartment near Le Marais",
    description: "Classic Parisian flat with original mouldings, herringbone floors, and a wrought-iron balcony overlooking a quiet courtyard.",
    pricePerNight: 280, bedrooms: 2, bathrooms: 1, maxGuests: 4,
    address: "8 Rue des Archives", city: "Paris", country: "France",
    lat: 48.8590, lng: 2.3546, category: "City",
    amenities: ["WiFi", "Kitchen", "Air Conditioning", "Balcony", "Elevator"],
    images: [
      IMG("paris apartment balcony marais", 111),
      IMG("parisian flat interior classic", 112),
      IMG("paris marais street france", 113),
      IMG("french apartment classic paris", 114),
    ],
    hostIndex: 0,
  },
  {
    title: "London Covent Garden Flat",
    description: "Stylish one-bedroom flat in a converted 18th-century building. Exposed beams, modern kitchen, and a cozy reading nook.",
    pricePerNight: 310, bedrooms: 1, bathrooms: 1, maxGuests: 2,
    address: "22 Bedford Street", city: "London", country: "United Kingdom",
    lat: 51.5115, lng: -0.1234, category: "City",
    amenities: ["WiFi", "Kitchen", "Washer", "Dryer", "Smart TV", "Elevator"],
    images: [
      IMG("london covent garden street", 121),
      IMG("london flat interior design", 122),
      IMG("london building street facade", 123),
    ],
    hostIndex: 7,
  },

  // =========================================================================
  // COUNTRYSIDE
  // =========================================================================
  {
    title: "Tuscan Farmhouse Retreat",
    description: "Restored 18th-century farmhouse surrounded by olive groves and vineyards. Pool with panoramic hillside views. Cooking classes available.",
    pricePerNight: 290, bedrooms: 3, bathrooms: 2, maxGuests: 6,
    address: "Via della Chiesa 12", city: "Florence", country: "Italy",
    lat: 43.6745, lng: 11.1953, category: "Countryside",
    amenities: ["WiFi", "Pool", "Kitchen", "Parking", "Garden", "Pet Friendly", "Cooking Class"],
    images: [
      IMG("tuscany farmhouse italy countryside", 131),
      IMG("italian villa countryside tuscany", 132),
      IMG("tuscany landscape olive grove", 133),
      IMG("italian garden villa pool", 134),
    ],
    hostIndex: 6,
  },
  {
    title: "Irish Countryside Cottage",
    description: "Thatched-roof cottage with a peat fireplace in County Kerry. Rolling green hills as far as the eye can see. The perfect digital detox retreat.",
    pricePerNight: 140, bedrooms: 2, bathrooms: 1, maxGuests: 4,
    address: "Kilmore Road", city: "Killarney", country: "Ireland",
    lat: 52.0586, lng: -9.5089, category: "Countryside",
    amenities: ["Fireplace", "Kitchen", "Garden", "Parking", "Pet Friendly"],
    images: [
      IMG("ireland countryside green hills", 141),
      IMG("irish cottage stone thatched", 142),
      IMG("ireland hills sheep landscape", 143),
    ],
    hostIndex: 7,
  },
  {
    title: "Provence Lavender Farm",
    description: "Charming stone house in the heart of Provence lavender country. Outdoor dining terrace, bicycle rentals, and endless purple fields in summer.",
    pricePerNight: 230, bedrooms: 2, bathrooms: 1, maxGuests: 4,
    address: "Route de Gordes 55", city: "Aix-en-Provence", country: "France",
    lat: 43.7102, lng: 5.4446, category: "Countryside",
    amenities: ["WiFi", "Pool", "Kitchen", "Parking", "Garden", "Bikes Available"],
    images: [
      IMG("lavender field provence france", 151),
      IMG("french countryside stone house", 152),
      IMG("provence stone house garden", 153),
      IMG("french farmhouse garden provence", 154),
    ],
    hostIndex: 6,
  },

  // =========================================================================
  // MODERN
  // =========================================================================
  {
    title: "Barcelona Minimalist Penthouse",
    description: "Sleek penthouse in Barcelona's Eixample district with a private rooftop pool. Designed by a local architect. Open-plan living with city views.",
    pricePerNight: 380, bedrooms: 2, bathrooms: 2, maxGuests: 4,
    address: "Carrer de Pau Claris 120", city: "Barcelona", country: "Spain",
    lat: 41.3874, lng: 2.1686, category: "Modern",
    amenities: ["WiFi", "Pool", "Kitchen", "Air Conditioning", "Rooftop", "Elevator", "Smart Home"],
    images: [
      IMG("barcelona modern penthouse rooftop", 161),
      IMG("modern apartment rooftop terrace", 162),
      IMG("rooftop pool city barcelona", 163),
      IMG("modern interior design apartment", 164),
    ],
    hostIndex: 2,
  },
  {
    title: "Dubai Marina Glass Apartment",
    description: "Floor-to-ceiling glass walls in this 48th-floor marina apartment. Smart home system, infinity pool, and valet parking.",
    pricePerNight: 650, bedrooms: 2, bathrooms: 2, maxGuests: 4,
    address: "Dubai Marina Walk", city: "Dubai", country: "UAE",
    lat: 25.0806, lng: 55.1406, category: "Modern",
    amenities: ["WiFi", "Pool", "Kitchen", "Air Conditioning", "Gym", "Valet Parking", "Smart Home", "Concierge"],
    images: [
      IMG("dubai marina skyline apartment", 171),
      IMG("dubai glass apartment luxury", 172),
      IMG("luxury apartment modern dubai", 173),
    ],
    hostIndex: 6,
  },
  {
    title: "Berlin Design Loft",
    description: "Brutalist-inspired loft in Berlin's Friedrichshain neighborhood. Minimalist furnishings, gallery-quality lighting, and a curated vinyl collection.",
    pricePerNight: 175, bedrooms: 1, bathrooms: 1, maxGuests: 2,
    address: "Warschauer Str. 58", city: "Berlin", country: "Germany",
    lat: 52.5104, lng: 13.4527, category: "Modern",
    amenities: ["WiFi", "Kitchen", "Washer", "Smart TV", "Vinyl Player"],
    images: [
      IMG("berlin loft industrial design", 181),
      IMG("industrial loft interior berlin", 182),
      IMG("design loft minimal berlin", 183),
      IMG("berlin apartment modern interior", 184),
    ],
    hostIndex: 5,
  },

  // =========================================================================
  // LAKE
  // =========================================================================
  {
    title: "Lake Como Elegant Villa",
    description: "Historic villa on the shores of Lake Como with a private dock. Frescoed ceilings, marble bathrooms, and a terraced garden with lemon trees.",
    pricePerNight: 780, bedrooms: 5, bathrooms: 4, maxGuests: 10,
    address: "Via Regina 40", city: "Bellagio", country: "Italy",
    lat: 45.9875, lng: 9.2612, category: "Lake",
    amenities: ["WiFi", "Pool", "Kitchen", "Parking", "Garden", "Boat Dock", "Maid Service"],
    images: [
      IMG("lake como villa italy", 191),
      IMG("italian villa garden lake como", 192),
      IMG("lake villa luxury italian", 193),
      IMG("italian garden pool villa lake", 194),
      IMG("lake view villa italian", 195),
    ],
    hostIndex: 2,
  },
  {
    title: "Lake Tahoe Cabin Retreat",
    description: "Modern cabin with floor-to-ceiling windows overlooking Lake Tahoe. Private hot tub, fire pit, and kayaks included. Winter ski access nearby.",
    pricePerNight: 340, bedrooms: 3, bathrooms: 2, maxGuests: 7,
    address: "780 Lakeshore Blvd", city: "South Lake Tahoe", country: "United States",
    lat: 38.9364, lng: -119.9856, category: "Lake",
    amenities: ["WiFi", "Kitchen", "Hot Tub", "Fireplace", "Kayaks", "Parking", "Washer", "Dryer"],
    images: [
      IMG("lake tahoe cabin mountain lake", 201),
      IMG("mountain lake cabin forest", 202),
      IMG("lake cabin forest retreat", 203),
      IMG("lake view mountain cabin", 204),
    ],
    hostIndex: 4,
  },
  {
    title: "Swiss Lake Studio",
    description: "Compact studio apartment on Lake Geneva with a balcony literally over the water. Watch the Jet d'Eau from your bed.",
    pricePerNight: 260, bedrooms: 1, bathrooms: 1, maxGuests: 2,
    address: "Quai du Mont-Blanc 5", city: "Geneva", country: "Switzerland",
    lat: 46.2083, lng: 6.1488, category: "Lake",
    amenities: ["WiFi", "Kitchen", "Lake View", "Balcony"],
    images: [
      IMG("lake geneva swiss switzerland", 211),
      IMG("swiss lake studio apartment", 212),
      IMG("lake balcony view geneva", 213),
    ],
    hostIndex: 1,
  },

  // =========================================================================
  // CABIN
  // =========================================================================
  {
    title: "Redwood Forest Treehouse",
    description: "Handcrafted treehouse suspended among ancient redwoods. Rope bridge entrance, outdoor shower, and a skylight for stargazing from your bed.",
    pricePerNight: 310, bedrooms: 1, bathrooms: 1, maxGuests: 2,
    address: "3300 Redwood Way", city: "Muir Woods", country: "United States",
    lat: 37.8952, lng: -122.5793, category: "Cabin",
    amenities: ["Kitchen", "Outdoor Shower", "Fire Pit", "Hiking Access"],
    images: [
      IMG("treehouse forest redwood cabin", 221),
      IMG("cabin forest woods nature", 222),
      IMG("treehouse cabin nature retreat", 223),
      IMG("forest cabin retreat redwood", 224),
    ],
    hostIndex: 4,
  },
  {
    title: "Finnish Log Cabin with Sauna",
    description: "Authentic Finnish log cabin on a private lake. Wood-fired sauna, ice swimming hole, and northern lights viewing deck.",
    pricePerNight: 200, bedrooms: 2, bathrooms: 1, maxGuests: 4,
    address: "Järventie 15", city: "Rovaniemi", country: "Finland",
    lat: 66.5039, lng: 25.7294, category: "Cabin",
    amenities: ["WiFi", "Kitchen", "Sauna", "Fireplace", "Parking", "Lake Access"],
    images: [
      IMG("log cabin finland lapland", 231),
      IMG("nordic cabin winter snow finland", 232),
      IMG("cabin snow sauna finland", 233),
    ],
    hostIndex: 7,
  },
  {
    title: "Smoky Mountains A-Frame",
    description: "Modern A-frame cabin in the Smoky Mountains with a hot tub on the deck. Floor-to-ceiling windows, loft bedroom, and a wood-burning stove.",
    pricePerNight: 225, bedrooms: 2, bathrooms: 1, maxGuests: 4,
    address: "42 Mountain View Dr", city: "Gatlinburg", country: "United States",
    lat: 35.7143, lng: -83.5102, category: "Cabin",
    amenities: ["WiFi", "Kitchen", "Hot Tub", "Fireplace", "Parking", "Pet Friendly", "Mountain View"],
    images: [
      IMG("aframe cabin mountain smoky", 241),
      IMG("smoky mountains cabin forest", 242),
      IMG("mountain cabin modern aframe", 243),
      IMG("cabin interior cozy mountain", 244),
    ],
    hostIndex: 1,
  },

  // =========================================================================
  // TROPICAL
  // =========================================================================
  {
    title: "Bali Jungle Villa",
    description: "Open-air villa in the Ubud jungle with a private infinity pool overlooking the rainforest. Outdoor bathroom, yoga deck, and a personal chef option.",
    pricePerNight: 190, bedrooms: 2, bathrooms: 2, maxGuests: 4,
    address: "Jl. Raya Ubud", city: "Ubud", country: "Indonesia",
    lat: -8.5069, lng: 115.2625, category: "Tropical",
    amenities: ["WiFi", "Pool", "Kitchen", "Air Conditioning", "Garden", "Yoga Deck", "Breakfast Included"],
    images: [
      IMG("bali villa jungle ubud", 251),
      IMG("bali rice terrace tropical", 252),
      IMG("tropical pool villa bali", 253),
      IMG("bali interior villa design", 254),
    ],
    hostIndex: 4,
  },
  {
    title: "Maldives Overwater Bungalow",
    description: "Classic overwater bungalow with a glass floor panel. Private sundeck with stairs into crystal-clear water. Snorkeling gear included.",
    pricePerNight: 800, bedrooms: 1, bathrooms: 1, maxGuests: 2,
    address: "North Male Atoll", city: "Malé", country: "Maldives",
    lat: 4.1755, lng: 73.5093, category: "Tropical",
    amenities: ["WiFi", "Pool", "Air Conditioning", "Butler Service", "Snorkeling Gear", "Kayak", "Mini Bar"],
    images: [
      IMG("maldives overwater bungalow ocean", 261),
      IMG("overwater villa maldives tropical", 262),
      IMG("maldives beach water paradise", 263),
      IMG("tropical paradise beach maldives", 264),
      IMG("overwater bungalow luxury maldives", 265),
    ],
    hostIndex: 5,
  },
  {
    title: "Costa Rica Treehouse Lodge",
    description: "Sustainable treehouse in the Costa Rican rainforest. Zipline access, outdoor shower with jungle views, and howler monkeys as your morning alarm.",
    pricePerNight: 160, bedrooms: 1, bathrooms: 1, maxGuests: 2,
    address: "Ruta 606", city: "Monteverde", country: "Costa Rica",
    lat: 10.3084, lng: -84.8162, category: "Tropical",
    amenities: ["WiFi", "Kitchen", "Garden", "Hiking Access", "Outdoor Shower", "Bird Watching"],
    images: [
      IMG("costa rica rainforest jungle", 271),
      IMG("jungle treehouse cabin tropical", 272),
      IMG("rainforest lodge cabin tropical", 273),
    ],
    hostIndex: 5,
  },
];

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Build the full mock property list with reviews attached. */
export function getMockProperties(): PropertyWithDetails[] {
  return propertyTemplates.map((t, idx) => {
    const host = hostUsers[t.hostIndex];
    const id = `mock-prop-${idx + 1}`;
    const reviews = generateMockReviews(id, t.hostIndex, idx * 37 + 42);

    return {
      id,
      title: t.title,
      description: t.description,
      pricePerNight: t.pricePerNight,
      bedrooms: t.bedrooms,
      bathrooms: t.bathrooms,
      maxGuests: t.maxGuests,
      address: t.address,
      city: t.city,
      country: t.country,
      lat: t.lat,
      lng: t.lng,
      category: t.category,
      amenities: t.amenities,
      images: t.images,
      hostId: host.id,
      host: {
        id: host.id,
        name: host.name,
        image: host.image,
        bio: host.bio,
      },
      reviews,
      createdAt: new Date(2025, 0, idx + 1),
    };
  });
}

/** Fetch a single mock property by ID. Returns undefined if not found. */
export function getMockPropertyById(
  id: string,
): PropertyWithDetails | undefined {
  return getMockProperties().find((p) => p.id === id);
}

/** Filter mock properties by search params. */
export function filterMockProperties(params: {
  category?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
}): PropertyWithDetails[] {
  let properties = getMockProperties();

  if (params.category) {
    const validCategories = [
      "Beach", "Mountain", "City", "Countryside",
      "Modern", "Lake", "Cabin", "Tropical",
    ];
    if (validCategories.includes(params.category)) {
      properties = properties.filter(
        (p) => p.category === params.category,
      );
    }
  }

  if (params.city) {
    const searchCity = params.city.toLowerCase();
    properties = properties.filter((p) =>
      p.city.toLowerCase().includes(searchCity),
    );
  }

  if (params.minPrice !== undefined) {
    properties = properties.filter(
      (p) => p.pricePerNight >= params.minPrice!,
    );
  }

  if (params.maxPrice !== undefined) {
    properties = properties.filter(
      (p) => p.pricePerNight <= params.maxPrice!,
    );
  }

  return properties;
}
