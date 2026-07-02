import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ---------------------------------------------------------------------------
// Seed data: 8 hosts, 25 properties across 8 categories, 3-5 reviews each
// ---------------------------------------------------------------------------

interface SeedHost {
  name: string;
  image: string;
  bio: string;
}

interface SeedProperty {
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
  hostIndex: number; // index into hosts array
}

const hosts: SeedHost[] = [
  {
    name: "Sophie Laurent",
    image: "https://picsum.photos/seed/host1/200/200",
    bio: "Parisian host and art curator. I love hosting travelers from around the world and sharing the best hidden gems of my city.",
  },
  {
    name: "James Cooper",
    image: "https://picsum.photos/seed/host2/200/200",
    bio: "Adventure photographer based in Vancouver. My properties are curated for those who love nature and comfort alike.",
  },
  {
    name: "Maria Rodríguez",
    image: "https://picsum.photos/seed/host3/200/200",
    bio: "Born and raised in Barcelona. I manage several vacation rentals and take pride in making every guest feel at home.",
  },
  {
    name: "Takeshi Yamamoto",
    image: "https://picsum.photos/seed/host4/200/200",
    bio: "Tokyo-based designer. My spaces blend traditional Japanese aesthetics with modern minimalism.",
  },
  {
    name: "Emily Chen",
    image: "https://picsum.photos/seed/host5/200/200",
    bio: "Digital nomad turned host. I split my time between Bali and Sydney, ensuring my properties are perfect workation spots.",
  },
  {
    name: "Carlos Mendes",
    image: "https://picsum.photos/seed/host6/200/200",
    bio: "Lisbon local and food enthusiast. My apartments are in the best neighborhoods, close to the best pastéis de nata in town.",
  },
  {
    name: "Amara Okafor",
    image: "https://picsum.photos/seed/host7/200/200",
    bio: "Lagos-born, London-based architect. Each of my properties reflects a unique design philosophy and attention to detail.",
  },
  {
    name: "Liam Murphy",
    image: "https://picsum.photos/seed/host8/200/200",
    bio: "Irish countryside enthusiast. I restored a 200-year-old farmhouse and fell in love with hosting. Now I manage several rural retreats.",
  },
];

const propertyTemplates: SeedProperty[] = [
  // --- Beach (4 properties) ---
  {
    title: "Seaside Paradise Villa",
    description:
      "Wake up to the sound of waves in this stunning beachfront villa. Floor-to-ceiling windows offer panoramic ocean views, and the private terrace is perfect for sunset cocktails. Steps from the sand.",
    pricePerNight: 350,
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    address: "12 Ocean Drive",
    city: "Malibu",
    country: "United States",
    lat: 34.0259,
    lng: -118.7798,
    category: "Beach",
    amenities: ["WiFi", "Pool", "Kitchen", "Air Conditioning", "Parking", "Ocean View"],
    images: [
      "https://picsum.photos/seed/beach1a/800/600",
      "https://picsum.photos/seed/beach1b/800/600",
      "https://picsum.photos/seed/beach1c/800/600",
      "https://picsum.photos/seed/beach1d/800/600",
    ],
    hostIndex: 1,
  },
  {
    title: "Bungalow Beach Retreat",
    description:
      "Charming beach bungalow with a tropical garden and hammocks. The covered patio is ideal for al fresco dining. A short walk to the best surf breaks in town.",
    pricePerNight: 180,
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    address: "45 Coconut Lane",
    city: "Byron Bay",
    country: "Australia",
    lat: -28.6479,
    lng: 153.6022,
    category: "Beach",
    amenities: ["WiFi", "Kitchen", "Air Conditioning", "Garden", "Surfboard Storage"],
    images: [
      "https://picsum.photos/seed/beach2a/800/600",
      "https://picsum.photos/seed/beach2b/800/600",
      "https://picsum.photos/seed/beach2c/800/600",
    ],
    hostIndex: 4,
  },
  {
    title: "White Sands Studio",
    description:
      "Modern studio apartment directly on the white sands of Cancun. Rooftop pool with infinity edge overlooking the Caribbean. All-inclusive experience." ,
    pricePerNight: 220,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    address: "Blvd. Kukulcan KM 12",
    city: "Cancún",
    country: "Mexico",
    lat: 21.1209,
    lng: -86.7521,
    category: "Beach",
    amenities: ["WiFi", "Pool", "Kitchen", "Air Conditioning", "Gym", "Room Service"],
    images: [
      "https://picsum.photos/seed/beach3a/800/600",
      "https://picsum.photos/seed/beach3b/800/600",
      "https://picsum.photos/seed/beach3c/800/600",
      "https://picsum.photos/seed/beach3d/800/600",
      "https://picsum.photos/seed/beach3e/800/600",
    ],
    hostIndex: 2,
  },
  {
    title: "Coral Cove Cottage",
    description:
      "Pastel-colored cottage in one of the most photographed spots in Cartagena. Rooftop terrace with ocean breeze and a plunge pool.",
    pricePerNight: 150,
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 3,
    address: "Calle del Mar 8-15",
    city: "Cartagena",
    country: "Colombia",
    lat: 10.391,
    lng: -75.5144,
    category: "Beach",
    amenities: ["WiFi", "Pool", "Kitchen", "Air Conditioning", "Rooftop Terrace"],
    images: [
      "https://picsum.photos/seed/beach4a/800/600",
      "https://picsum.photos/seed/beach4b/800/600",
      "https://picsum.photos/seed/beach4c/800/600",
    ],
    hostIndex: 2,
  },
  // --- Mountain (4 properties) ---
  {
    title: "Alpine Chalet with View",
    description:
      "Luxurious wooden chalet nestled in the Swiss Alps. Floor-to-ceiling windows frame the Matterhorn. Hot tub on the deck, fireplace in the living room.",
    pricePerNight: 520,
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    address: "Alpenstrasse 7",
    city: "Zermatt",
    country: "Switzerland",
    lat: 46.0207,
    lng: 7.7491,
    category: "Mountain",
    amenities: ["WiFi", "Kitchen", "Fireplace", "Hot Tub", "Ski Storage", "Parking", "Heated Floors"],
    images: [
      "https://picsum.photos/seed/mtn1a/800/600",
      "https://picsum.photos/seed/mtn1b/800/600",
      "https://picsum.photos/seed/mtn1c/800/600",
      "https://picsum.photos/seed/mtn1d/800/600",
    ],
    hostIndex: 1,
  },
  {
    title: "Cozy Mountain Cabin",
    description:
      "Rustic log cabin in the Rocky Mountains with a wood-burning stove. Perfect for a romantic getaway. Hike straight from the door into national forest trails.",
    pricePerNight: 195,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    address: "850 Pine Ridge Rd",
    city: "Aspen",
    country: "United States",
    lat: 39.1911,
    lng: -106.8175,
    category: "Mountain",
    amenities: ["WiFi", "Kitchen", "Fireplace", "Parking", "Pet Friendly"],
    images: [
      "https://picsum.photos/seed/mtn2a/800/600",
      "https://picsum.photos/seed/mtn2b/800/600",
      "https://picsum.photos/seed/mtn2c/800/600",
    ],
    hostIndex: 0,
  },
  {
    title: "Andean Mountain Lodge",
    description:
      "Eco-lodge at 3,200m elevation with stunning views of the Andes. Organic breakfast included. Guided treks and stargazing available.",
    pricePerNight: 120,
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    address: "Camino del Inca 452",
    city: "Cusco",
    country: "Peru",
    lat: -13.5167,
    lng: -71.9781,
    category: "Mountain",
    amenities: ["WiFi", "Kitchen", "Breakfast Included", "Fireplace", "Guided Tours"],
    images: [
      "https://picsum.photos/seed/mtn3a/800/600",
      "https://picsum.photos/seed/mtn3b/800/600",
      "https://picsum.photos/seed/mtn3c/800/600",
      "https://picsum.photos/seed/mtn3d/800/600",
    ],
    hostIndex: 3,
  },
  {
    title: "Ski-In Ski-Out Chalet",
    description:
      "Direct slope access from your doorstep in Chamonix. Modern alpine decor with a sauna and game room. Spectacular Mont Blanc views.",
    pricePerNight: 420,
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    address: "45 Rue du Mont-Blanc",
    city: "Chamonix",
    country: "France",
    lat: 45.9237,
    lng: 6.8694,
    category: "Mountain",
    amenities: ["WiFi", "Kitchen", "Sauna", "Ski Storage", "Fireplace", "Parking", "Washer"],
    images: [
      "https://picsum.photos/seed/mtn4a/800/600",
      "https://picsum.photos/seed/mtn4b/800/600",
      "https://picsum.photos/seed/mtn4c/800/600",
    ],
    hostIndex: 7,
  },
  // --- City (4 properties) ---
  {
    title: "Manhattan Skyline Loft",
    description:
      "Industrial-chic loft in the heart of SoHo. Exposed brick walls, floor-to-ceiling windows, and a rooftop terrace with skyline views. Walk to world-class dining.",
    pricePerNight: 450,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    address: "150 Greene Street",
    city: "New York",
    country: "United States",
    lat: 40.7243,
    lng: -73.9985,
    category: "City",
    amenities: ["WiFi", "Kitchen", "Air Conditioning", "Elevator", "Rooftop", "Washer", "Dryer"],
    images: [
      "https://picsum.photos/seed/city1a/800/600",
      "https://picsum.photos/seed/city1b/800/600",
      "https://picsum.photos/seed/city1c/800/600",
      "https://picsum.photos/seed/city1d/800/600",
      "https://picsum.photos/seed/city1e/800/600",
    ],
    hostIndex: 0,
  },
  {
    title: "Tokyo Shibuya Apartment",
    description:
      "Compact, ultra-clean apartment steps from Shibuya Crossing. High-tech amenities, automated blinds, and a curated guide to hidden ramen spots.",
    pricePerNight: 160,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    address: "2-15-1 Shibuya",
    city: "Tokyo",
    country: "Japan",
    lat: 35.6595,
    lng: 139.7004,
    category: "City",
    amenities: ["WiFi", "Kitchen", "Air Conditioning", "Smart TV", "Washer", "Mini Fridge"],
    images: [
      "https://picsum.photos/seed/city2a/800/600",
      "https://picsum.photos/seed/city2b/800/600",
      "https://picsum.photos/seed/city2c/800/600",
    ],
    hostIndex: 3,
  },
  {
    title: "Parisian Apartment near Le Marais",
    description:
      "Classic Parisian flat with original mouldings, herringbone floors, and a wrought-iron balcony overlooking a quiet courtyard. Walk to Notre-Dame.",
    pricePerNight: 280,
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    address: "8 Rue des Archives",
    city: "Paris",
    country: "France",
    lat: 48.8590,
    lng: 2.3546,
    category: "City",
    amenities: ["WiFi", "Kitchen", "Air Conditioning", "Balcony", "Elevator"],
    images: [
      "https://picsum.photos/seed/city3a/800/600",
      "https://picsum.photos/seed/city3b/800/600",
      "https://picsum.photos/seed/city3c/800/600",
      "https://picsum.photos/seed/city3d/800/600",
    ],
    hostIndex: 0,
  },
  {
    title: "London Covent Garden Flat",
    description:
      "Stylish one-bedroom flat in a converted 18th-century building. Exposed beams, modern kitchen, and a cozy reading nook. Steps from the Royal Opera House.",
    pricePerNight: 310,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    address: "22 Bedford Street",
    city: "London",
    country: "United Kingdom",
    lat: 51.5115,
    lng: -0.1234,
    category: "City",
    amenities: ["WiFi", "Kitchen", "Washer", "Dryer", "Smart TV", "Elevator"],
    images: [
      "https://picsum.photos/seed/city4a/800/600",
      "https://picsum.photos/seed/city4b/800/600",
      "https://picsum.photos/seed/city4c/800/600",
    ],
    hostIndex: 7,
  },
  // --- Countryside (3 properties) ---
  {
    title: "Tuscan Farmhouse Retreat",
    description:
      "Restored 18th-century farmhouse surrounded by olive groves and vineyards. Pool with panoramic hillside views. Cooking classes available.",
    pricePerNight: 290,
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    address: "Via della Chiesa 12",
    city: "Florence",
    country: "Italy",
    lat: 43.6745,
    lng: 11.1953,
    category: "Countryside",
    amenities: ["WiFi", "Pool", "Kitchen", "Parking", "Garden", "Pet Friendly", "Cooking Class"],
    images: [
      "https://picsum.photos/seed/country1a/800/600",
      "https://picsum.photos/seed/country1b/800/600",
      "https://picsum.photos/seed/country1c/800/600",
      "https://picsum.photos/seed/country1d/800/600",
    ],
    hostIndex: 6,
  },
  {
    title: "Irish Countryside Cottage",
    description:
      "Thatched-roof cottage with a peat fireplace in County Kerry. Rolling green hills as far as the eye can see. The perfect digital detox retreat.",
    pricePerNight: 140,
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    address: "Kilmore Road",
    city: "Killarney",
    country: "Ireland",
    lat: 52.0586,
    lng: -9.5089,
    category: "Countryside",
    amenities: ["Fireplace", "Kitchen", "Garden", "Parking", "Pet Friendly"],
    images: [
      "https://picsum.photos/seed/country2a/800/600",
      "https://picsum.photos/seed/country2b/800/600",
      "https://picsum.photos/seed/country2c/800/600",
    ],
    hostIndex: 7,
  },
  {
    title: "Provence Lavender Farm",
    description:
      "Charming stone house in the heart of Provence lavender country. Outdoor dining terrace, bicycle rentals, and endless purple fields in summer.",
    pricePerNight: 230,
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    address: "Route de Gordes 55",
    city: "Aix-en-Provence",
    country: "France",
    lat: 43.7102,
    lng: 5.4446,
    category: "Countryside",
    amenities: ["WiFi", "Pool", "Kitchen", "Parking", "Garden", "Bikes Available"],
    images: [
      "https://picsum.photos/seed/country3a/800/600",
      "https://picsum.photos/seed/country3b/800/600",
      "https://picsum.photos/seed/country3c/800/600",
      "https://picsum.photos/seed/country3d/800/600",
    ],
    hostIndex: 6,
  },
  // --- Modern (3 properties) ---
  {
    title: "Barcelona Minimalist Penthouse",
    description:
      "Sleek penthouse in Barcelona's Eixample district with a private rooftop pool. Designed by a local architect. Open-plan living with city views.",
    pricePerNight: 380,
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    address: "Carrer de Pau Claris 120",
    city: "Barcelona",
    country: "Spain",
    lat: 41.3874,
    lng: 2.1686,
    category: "Modern",
    amenities: ["WiFi", "Pool", "Kitchen", "Air Conditioning", "Rooftop", "Elevator", "Smart Home"],
    images: [
      "https://picsum.photos/seed/modern1a/800/600",
      "https://picsum.photos/seed/modern1b/800/600",
      "https://picsum.photos/seed/modern1c/800/600",
      "https://picsum.photos/seed/modern1d/800/600",
    ],
    hostIndex: 2,
  },
  {
    title: "Dubai Marina Glass Apartment",
    description:
      "Floor-to-ceiling glass walls in this 48th-floor marina apartment. Smart home system, infinity pool, and valet parking. Unbeatable skyline views.",
    pricePerNight: 650,
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    address: "Dubai Marina Walk",
    city: "Dubai",
    country: "UAE",
    lat: 25.0806,
    lng: 55.1406,
    category: "Modern",
    amenities: ["WiFi", "Pool", "Kitchen", "Air Conditioning", "Gym", "Valet Parking", "Smart Home", "Concierge"],
    images: [
      "https://picsum.photos/seed/modern2a/800/600",
      "https://picsum.photos/seed/modern2b/800/600",
      "https://picsum.photos/seed/modern2c/800/600",
    ],
    hostIndex: 6,
  },
  {
    title: "Berlin Design Loft",
    description:
      "Brutalist-inspired loft in Berlin's Friedrichshain neighborhood. Minimalist furnishings, gallery-quality lighting, and a curated vinyl collection.",
    pricePerNight: 175,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    address: "Warschauer Str. 58",
    city: "Berlin",
    country: "Germany",
    lat: 52.5104,
    lng: 13.4527,
    category: "Modern",
    amenities: ["WiFi", "Kitchen", "Washer", "Smart TV", "Vinyl Player"],
    images: [
      "https://picsum.photos/seed/modern3a/800/600",
      "https://picsum.photos/seed/modern3b/800/600",
      "https://picsum.photos/seed/modern3c/800/600",
      "https://picsum.photos/seed/modern3d/800/600",
    ],
    hostIndex: 5,
  },
  // --- Lake (3 properties) ---
  {
    title: "Lake Como Elegant Villa",
    description:
      "Historic villa on the shores of Lake Como with a private dock. Frescoed ceilings, marble bathrooms, and a terraced garden with lemon trees.",
    pricePerNight: 780,
    bedrooms: 5,
    bathrooms: 4,
    maxGuests: 10,
    address: "Via Regina 40",
    city: "Bellagio",
    country: "Italy",
    lat: 45.9875,
    lng: 9.2612,
    category: "Lake",
    amenities: ["WiFi", "Pool", "Kitchen", "Parking", "Garden", "Boat Dock", "Maid Service"],
    images: [
      "https://picsum.photos/seed/lake1a/800/600",
      "https://picsum.photos/seed/lake1b/800/600",
      "https://picsum.photos/seed/lake1c/800/600",
      "https://picsum.photos/seed/lake1d/800/600",
      "https://picsum.photos/seed/lake1e/800/600",
    ],
    hostIndex: 2,
  },
  {
    title: "Lake Tahoe Cabin Retreat",
    description:
      "Modern cabin with floor-to-ceiling windows overlooking Lake Tahoe. Private hot tub, fire pit, and kayaks included. Winter ski access nearby.",
    pricePerNight: 340,
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 7,
    address: "780 Lakeshore Blvd",
    city: "South Lake Tahoe",
    country: "United States",
    lat: 38.9364,
    lng: -119.9856,
    category: "Lake",
    amenities: ["WiFi", "Kitchen", "Hot Tub", "Fireplace", "Kayaks", "Parking", "Washer", "Dryer"],
    images: [
      "https://picsum.photos/seed/lake2a/800/600",
      "https://picsum.photos/seed/lake2b/800/600",
      "https://picsum.photos/seed/lake2c/800/600",
      "https://picsum.photos/seed/lake2d/800/600",
    ],
    hostIndex: 4,
  },
  {
    title: "Swiss Lake Studio",
    description:
      "Compact studio apartment on Lake Geneva with a balcony literally over the water. Watch the Jet d'Eau from your bed. Minimalist but breathtaking.",
    pricePerNight: 260,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    address: "Quai du Mont-Blanc 5",
    city: "Geneva",
    country: "Switzerland",
    lat: 46.2083,
    lng: 6.1488,
    category: "Lake",
    amenities: ["WiFi", "Kitchen", "Lake View", "Balcony"],
    images: [
      "https://picsum.photos/seed/lake3a/800/600",
      "https://picsum.photos/seed/lake3b/800/600",
      "https://picsum.photos/seed/lake3c/800/600",
    ],
    hostIndex: 1,
  },
  // --- Cabin (3 properties) ---
  {
    title: "Redwood Forest Treehouse",
    description:
      "Handcrafted treehouse suspended among ancient redwoods. Rope bridge entrance, outdoor shower, and a skylight for stargazing from your bed.",
    pricePerNight: 310,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    address: "3300 Redwood Way",
    city: "Muir Woods",
    country: "United States",
    lat: 37.8952,
    lng: -122.5793,
    category: "Cabin",
    amenities: ["Kitchen", "Outdoor Shower", "Fire Pit", "Hiking Access"],
    images: [
      "https://picsum.photos/seed/cabin1a/800/600",
      "https://picsum.photos/seed/cabin1b/800/600",
      "https://picsum.photos/seed/cabin1c/800/600",
      "https://picsum.photos/seed/cabin1d/800/600",
    ],
    hostIndex: 4,
  },
  {
    title: "Finnish Log Cabin with Sauna",
    description:
      "Authentic Finnish log cabin on a private lake. Wood-fired sauna, ice swimming hole, and northern lights viewing deck. A true wilderness experience.",
    pricePerNight: 200,
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    address: "Järventie 15",
    city: "Rovaniemi",
    country: "Finland",
    lat: 66.5039,
    lng: 25.7294,
    category: "Cabin",
    amenities: ["WiFi", "Kitchen", "Sauna", "Fireplace", "Parking", "Lake Access"],
    images: [
      "https://picsum.photos/seed/cabin2a/800/600",
      "https://picsum.photos/seed/cabin2b/800/600",
      "https://picsum.photos/seed/cabin2c/800/600",
    ],
    hostIndex: 7,
  },
  {
    title: "Smoky Mountains A-Frame",
    description:
      "Modern A-frame cabin in the Smoky Mountains with a hot tub on the deck. Floor-to-ceiling windows, loft bedroom, and a wood-burning stove.",
    pricePerNight: 225,
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    address: "42 Mountain View Dr",
    city: "Gatlinburg",
    country: "United States",
    lat: 35.7143,
    lng: -83.5102,
    category: "Cabin",
    amenities: ["WiFi", "Kitchen", "Hot Tub", "Fireplace", "Parking", "Pet Friendly", "Mountain View"],
    images: [
      "https://picsum.photos/seed/cabin3a/800/600",
      "https://picsum.photos/seed/cabin3b/800/600",
      "https://picsum.photos/seed/cabin3c/800/600",
      "https://picsum.photos/seed/cabin3d/800/600",
    ],
    hostIndex: 1,
  },
  // --- Tropical (3 properties) ---
  {
    title: "Bali Jungle Villa",
    description:
      "Open-air villa in the Ubud jungle with a private infinity pool overlooking the rainforest. Outdoor bathroom, yoga deck, and a personal chef option.",
    pricePerNight: 190,
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    address: "Jl. Raya Ubud",
    city: "Ubud",
    country: "Indonesia",
    lat: -8.5069,
    lng: 115.2625,
    category: "Tropical",
    amenities: ["WiFi", "Pool", "Kitchen", "Air Conditioning", "Garden", "Yoga Deck", "Breakfast Included"],
    images: [
      "https://picsum.photos/seed/trop1a/800/600",
      "https://picsum.photos/seed/trop1b/800/600",
      "https://picsum.photos/seed/trop1c/800/600",
      "https://picsum.photos/seed/trop1d/800/600",
    ],
    hostIndex: 4,
  },
  {
    title: "Maldives Overwater Bungalow",
    description:
      "Classic overwater bungalow with a glass floor panel. Private sundeck with stairs into crystal-clear water. Snorkeling gear, kayak, and butler service included.",
    pricePerNight: 800,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    address: "North Male Atoll",
    city: "Malé",
    country: "Maldives",
    lat: 4.1755,
    lng: 73.5093,
    category: "Tropical",
    amenities: ["WiFi", "Pool", "Air Conditioning", "Butler Service", "Snorkeling Gear", "Kayak", "Mini Bar"],
    images: [
      "https://picsum.photos/seed/trop2a/800/600",
      "https://picsum.photos/seed/trop2b/800/600",
      "https://picsum.photos/seed/trop2c/800/600",
      "https://picsum.photos/seed/trop2d/800/600",
      "https://picsum.photos/seed/trop2e/800/600",
    ],
    hostIndex: 5,
  },
  {
    title: "Costa Rica Treehouse Lodge",
    description:
      "Sustainable treehouse in the Costa Rican rainforest. Zipline access, outdoor shower with jungle views, and howler monkeys as your morning alarm.",
    pricePerNight: 160,
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    address: "Ruta 606",
    city: "Monteverde",
    country: "Costa Rica",
    lat: 10.3084,
    lng: -84.8162,
    category: "Tropical",
    amenities: ["WiFi", "Kitchen", "Garden", "Hiking Access", "Outdoor Shower", "Bird Watching"],
    images: [
      "https://picsum.photos/seed/trop3a/800/600",
      "https://picsum.photos/seed/trop3b/800/600",
      "https://picsum.photos/seed/trop3c/800/600",
    ],
    hostIndex: 5,
  },
];

const reviewComments: string[] = [
  "Absolutely stunning place! The views were even better than the photos. Would definitely come back.",
  "Great location and very responsive host. The apartment was clean and exactly as described.",
  "Perfect getaway spot. The amenities were top-notch and the neighborhood was lovely.",
  "A wonderful experience from start to finish. The host provided excellent recommendations for local activities.",
  "Beautiful accommodation with all the comforts of home. The bed was incredibly comfortable.",
  "The location couldn't have been better. Walkable to everything we wanted to see.",
  "Our family had an amazing time. The kids loved the pool and the outdoor space.",
  "Charming place with lots of character. The kitchen was well-equipped for cooking.",
  "Fantastic value for money. The space was larger than expected and beautifully decorated.",
  "The host went above and beyond to make our stay special. Truly memorable experience.",
  "Very peaceful and relaxing environment. Exactly what we needed for a weekend escape.",
  "Impeccably clean and stylish. The photos don't do it justice — it's even more beautiful in person.",
  "Great for remote work — the WiFi was fast and there was a dedicated workspace.",
  "Romantic and cozy. Perfect for couples looking for a quiet retreat.",
  "Loved the outdoor space! The garden and terrace were perfect for morning coffee.",
  "Amazing architecture and design. Every corner was Instagram-worthy.",
  "The neighborhood was vibrant and full of great restaurants. Highly recommend.",
  "Smooth check-in process and excellent communication throughout our stay.",
  "We felt right at home. The personal touches like fresh flowers and a welcome note were appreciated.",
  "Breathtaking scenery. Waking up to that view was worth every penny.",
];

async function main() {
  console.log("🌱 Seeding database...");

  // Clean existing data
  await prisma.review.deleteMany();
  await prisma.property.deleteMany();
  await prisma.user.deleteMany();

  // Create hosts (users)
  const createdUsers = await Promise.all(
    hosts.map((host) =>
      prisma.user.create({
        data: {
          name: host.name,
          image: host.image,
          bio: host.bio,
        },
      }),
    ),
  );
  console.log(`✅ Created ${createdUsers.length} hosts`);

  // Create properties
  const createdProperties = await Promise.all(
    propertyTemplates.map((prop) =>
      prisma.property.create({
        data: {
          title: prop.title,
          description: prop.description,
          pricePerNight: prop.pricePerNight,
          bedrooms: prop.bedrooms,
          bathrooms: prop.bathrooms,
          maxGuests: prop.maxGuests,
          address: prop.address,
          city: prop.city,
          country: prop.country,
          lat: prop.lat,
          lng: prop.lng,
          category: prop.category,
          amenities: prop.amenities,
          images: prop.images,
          hostId: createdUsers[prop.hostIndex].id,
        },
      }),
    ),
  );
  console.log(`✅ Created ${createdProperties.length} properties`);

  // Create reviews (3-5 per property, from other hosts)
  let reviewCount = 0;
  for (let propIdx = 0; propIdx < createdProperties.length; propIdx++) {
    const property = createdProperties[propIdx];
    const numReviews = 3 + Math.floor(Math.random() * 3); // 3-5 reviews
    const hostIdx = propertyTemplates[propIdx].hostIndex;
    const usedReviewerIndices = new Set<number>();

    for (let i = 0; i < numReviews; i++) {
      let reviewerIdx: number;
      do {
        reviewerIdx = Math.floor(Math.random() * createdUsers.length);
      } while (reviewerIdx === hostIdx || usedReviewerIndices.has(reviewerIdx));
      usedReviewerIndices.add(reviewerIdx);

      const rating = 3 + Math.floor(Math.random() * 3); // 3-5
      const comment =
        reviewComments[Math.floor(Math.random() * reviewComments.length)];

      await prisma.review.create({
        data: {
          rating,
          comment,
          userId: createdUsers[reviewerIdx].id,
          propertyId: property.id,
        },
      });
      reviewCount++;
    }
  }
  console.log(`✅ Created ${reviewCount} reviews`);
  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
