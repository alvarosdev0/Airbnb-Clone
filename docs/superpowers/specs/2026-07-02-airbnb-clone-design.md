# Airbnb Clone — Design Document

**Date:** 2026-07-02
**Stack:** Next.js 14+ (App Router) · Prisma ORM · PostgreSQL · MapLibre/Leaflet
**Status:** Approved

---

## 1. Purpose

Build a visual, interactive clone of Airbnb's property browsing experience as a portfolio project. Focus on the **discovery and exploration** flow: browsing properties on a grid, searching/filtering, viewing details with an image gallery, and an interactive map showing property locations.

**Out of scope (v1):** Authentication, booking/reservations, payments, host dashboards, messaging, user-generated content.

---

## 2. Architecture

### 2.1 Approach: Next.js App Router + React Server Components

- **Server Components by default** — pages fetch data directly from Prisma (no API Routes)
- **Client Components** — only for interactive elements: map, image gallery carousel, search/filter controls
- **Server Actions** — not needed in v1 (no mutations since reviews are seed-only)
- **Streaming** — Suspense boundaries around map and gallery for progressive loading

### 2.2 Project Structure

```
airbnb-clone/
├── prisma/
│   ├── schema.prisma          # Data models
│   └── seed.ts                # Seed script (~20-30 properties)
├── public/
│   └── images/                # Placeholder property images
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout (navbar, fonts, global CSS)
│   │   ├── page.tsx           # Homepage — hero search + categories + grid + map
│   │   ├── loading.tsx        # Loading skeleton
│   │   ├── error.tsx          # Error boundary
│   │   ├── not-found.tsx      # 404 page
│   │   └── properties/
│   │       ├── page.tsx       # Search results with filters + grid + map
│   │       └── [id]/page.tsx  # Property detail page
│   ├── components/
│   │   ├── map/
│   │   │   └── PropertyMap.tsx         # Client — MapLibre/Leaflet
│   │   ├── properties/
│   │   │   ├── PropertyCard.tsx        # Server — card in grid
│   │   │   ├── PropertyGrid.tsx        # Server — grid of cards
│   │   │   ├── PropertyGallery.tsx     # Client — image carousel
│   │   │   └── SearchFilters.tsx       # Client — category, price, city filters
│   │   ├── reviews/
│   │   │   └── ReviewList.tsx          # Server — show seeded reviews
│   │   ├── category/
│   │   │   ├── CategoryBar.tsx         # Client — horizontal scroll category pills
│   │   │   └── CategoryIcon.tsx        # Icon per category
│   │   └── ui/
│   │       ├── Navbar.tsx              # Server — logo + nav links
│   │       ├── Footer.tsx              # Server
│   │       ├── SearchBar.tsx           # Client — destination search
│   │       └── Skeleton.tsx            # Loading placeholders
│   ├── lib/
│   │   ├── prisma.ts          # Prisma client singleton
│   │   └── utils.ts           # Helpers (formatPrice, cn, etc.)
│   └── types/
│       └── index.ts           # Shared TypeScript types
```

---

## 3. Data Models (Prisma)

```prisma
model User {
  id         String     @id @default(cuid())
  name       String
  image      String?    // Avatar URL
  bio        String?
  properties Property[] // Hosted properties
  reviews    Review[]   // Reviews left by this user
}

model Property {
  id            String     @id @default(cuid())
  title         String
  description   String
  pricePerNight Int
  bedrooms      Int
  bathrooms     Int
  maxGuests     Int
  address       String
  city          String
  country       String
  lat           Float
  lng           Float
  category      String     // Beach, Mountain, City, Countryside, etc.
  amenities     String[]   // WiFi, Pool, Kitchen, etc.
  images        String[]   // Array of image URLs
  hostId        String
  host          User       @relation(fields: [hostId], references: [id])
  reviews       Review[]
  createdAt     DateTime   @default(now())
}

model Review {
  id         String   @id @default(cuid())
  rating     Int      // 1-5
  comment    String
  userId     String
  user       User     @relation(fields: [userId], references: [id])
  propertyId String
  property   Property @relation(fields: [propertyId], references: [id])
  createdAt  DateTime @default(now())

  @@unique([userId, propertyId]) // One review per user per property
}
```

**Design decisions:**
- `amenities` and `images` as `String[]` — PostgreSQL array type, simple and sufficient for v1
- `category` as String (not enum) — flexible, easy to add new categories without migrations
- `review @@unique` — prevents duplicate reviews from the same user on the same property

---

## 4. Component Design

### 4.1 Homepage (`/`)

```
Navbar (Server)
├── Logo → /
├── SearchBar (Client) — destination quick-search
└── Navigation links

Main Content
├── CategoryBar (Client) — horizontal scroll: Beach, Mountain, City, Countryside, Modern, Lake, Cabin, Tropical
│   └── Each pill: icon + label, clickable → /properties?category=Beach
├── PropertyGrid (Server)
│   └── PropertyCard × N — title, price, rating, thumbnail, host avatar
│       └── Each card links to /properties/[id]
└── PropertyMap (Client) — full-width map with pins at property locations
    └── Pin click → card popup with link to detail
```

**Data flow (Homepage):**
1. `page.tsx` (Server) — fetches all properties with `prisma.property.findMany({ include: { host: true, reviews: true } })`
2. Passes properties to `PropertyGrid` (Server Component) and serializes props for `PropertyMap` (Client Component via props)
3. `CategoryBar` updates URL search params → Server re-fetches filtered data

### 4.2 Search Results (`/properties?category=X&city=Y&minPrice=Z&maxPrice=W`)

- Server Component reads `searchParams` → builds Prisma `where` clause
- Returns filtered `PropertyGrid` and updated `PropertyMap`
- `SearchFilters` (Client) controls the filter panel

### 4.3 Property Detail (`/properties/[id]`)

```
PropertyGallery (Client) — image carousel with thumbnails
Property Info Section
├── Title, location, price
├── Host info card (avatar, name, bio)
├── Description
├── Amenities grid
└── Rating summary (average from reviews)
ReviewList (Server) — seeded reviews with user avatar, name, date, rating, comment
PropertyMap (Client) — single pin at property location (small map)
```

**Data flow (Detail):**
1. `page.tsx` fetches `prisma.property.findUnique({ where: { id }, include: { host: true, reviews: { include: { user: true } } } })`
2. Server components render most of the page
3. Gallery and Map receive data as props for client-side rendering

---

## 5. Map Integration

**Library:** Leaflet (via `react-leaflet`) with OpenStreetMap tiles

**Why Leaflet over Mapbox/Google Maps:**
- No API key required — fully free
- Lightweight
- `react-leaflet` has great React/Next.js support
- For a portfolio project, it demonstrates geo-integration without recurring costs

**Next.js compatibility:**
- Leaflet uses browser APIs (`window`, `document`) — must be imported with `next/dynamic` + `{ ssr: false }`
- Extract map into a Client Component wrapper, then dynamically import it in the Server page

**Map features:**
- Homepage: full-width map with pins at all property locations
- Pin click → popup with property title, price, thumbnail, link to detail
- Detail page: small map centered on property location
- Responsive: collapses below grid on mobile (stacked layout)

---

## 6. Styling Strategy

**Approach:** Tailwind CSS (utility-first, ships with Next.js 14+)

- Global theme variables in `globals.css` (Airbnb-inspired: red/coral primary, neutral grays)
- Responsive design: mobile-first (single column → 2 cols → 4 cols grid)
- Airbnb visual language: rounded cards, clean typography, generous whitespace
- Dark mode: optional (can be added later)

**Key design tokens:**
- Primary: `#FF385C` (Airbnb red/coral)
- Background: white
- Text: `#222222` (primary), `#717171` (secondary)
- Border radius: `xl` (cards), `full` (avatars)
- Shadows: subtle (card hover elevation)

---

## 7. Seed Data Strategy

Create a `prisma/seed.ts` with:

- **Users (hosts):** 5-8 fictional hosts with names, avatars (via `picsum.photos` or `ui-avatars.com`), and bios
- **Properties:** 20-30 properties across 5-8 categories, in different cities
  - Images: placeholder service (`picsum.photos` or `unsplash.it`)
  - Prices: realistic range ($50-$800/night)
  - Locations: real lat/lng coordinates of actual Airbnb-popular places
- **Reviews:** 3-5 reviews per property from fictional guests
  - Ratings evenly distributed (mostly 4-5 stars, occasional 3)
  - Realistic comments

---

## 8. Categories

1. Beach
2. Mountain
3. City
4. Countryside
5. Modern
6. Lake
7. Cabin
8. Tropical

Each category gets an SVG icon component for the `CategoryBar`.

---

## 9. Performance Considerations

- **Streaming:** `PropertyGrid` and `PropertyMap` wrapped in `<Suspense>` with skeletons
- **Image optimization:** Next.js `<Image>` with remote patterns configured
- **Prisma:** Selective includes (no over-fetching), `select` used where possible
- **CSS:** Tailwind purges unused styles in production

---

## 10. Implementation Order

1. Project scaffolding — Next.js init, Prisma setup, Tailwind, folder structure
2. Prisma schema + migrations + seed script
3. UI primitives — Navbar, Footer, Skeleton, layout
4. Property grid — Card, Grid, Homepage
5. Category bar — icons, filtering by category
6. Search/filter — SearchBar, SearchFilters, search params
7. Property detail — Gallery, host card, reviews, info sections
8. Map integration — full-page map + detail map
9. Refinement — responsive polish, loading states, error boundaries
10. Final seed — populate with realistic data
