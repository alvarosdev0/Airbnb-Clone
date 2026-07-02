import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-secondary sm:text-5xl">
          Discover your next getaway
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-soft">
          Browse unique vacation rentals, cozy cabins, beach houses, and
          mountain retreats around the world.
        </p>
        <Link
          href="/properties"
          className="inline-block rounded-lg bg-primary px-8 py-3 text-base font-semibold text-bg transition-colors hover:bg-primary-dark"
        >
          Start exploring
        </Link>
      </div>

      {/* Category preview grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={`/properties?category=${cat.name}`}
            className="group relative overflow-hidden rounded-xl border border-gray-light transition-all hover:shadow-md"
          >
            <div className="aspect-[4/3] bg-gray-light/50" />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/5 transition-colors group-hover:bg-black/10">
              <span className="mb-1 text-3xl">{cat.icon}</span>
              <span className="text-sm font-medium text-white drop-shadow-md">
                {cat.name}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Placeholder footer note */}
      <p className="mt-16 text-center text-sm text-gray-soft">
        This is a portfolio project built with Next.js, Prisma, and Tailwind
        CSS. Data is seeded and read-only.
      </p>
    </div>
  );
}

const categories = [
  { name: "Beach", icon: "🏖️" },
  { name: "Mountain", icon: "🏔️" },
  { name: "City", icon: "🏙️" },
  { name: "Countryside", icon: "🌾" },
  { name: "Modern", icon: "🏗️" },
  { name: "Lake", icon: "🏞️" },
  { name: "Cabin", icon: "🪵" },
  { name: "Tropical", icon: "🌴" },
];
