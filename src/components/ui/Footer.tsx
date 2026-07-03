import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-light bg-bg">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          {/* Explore */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-soft">
              Explore
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/properties" className="cursor-pointer text-sm text-gray-soft transition-colors duration-200 hover:text-primary">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/" className="cursor-pointer text-sm text-gray-soft transition-colors duration-200 hover:text-primary">
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-soft">
              About
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="cursor-pointer text-sm text-gray-soft transition-colors duration-200 hover:text-primary">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="#" className="cursor-pointer text-sm text-gray-soft transition-colors duration-200 hover:text-primary">
                  OpenStreetMap
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-soft">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="cursor-pointer text-sm text-gray-soft transition-colors duration-200 hover:text-primary">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="cursor-pointer text-sm text-gray-soft transition-colors duration-200 hover:text-primary">
                  Safety information
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-light pt-6">
          <p className="text-center text-xs text-gray-soft">
            &copy; {new Date().getFullYear()} Travelio. All rights reserved. A portfolio project powered by OpenStreetMap.
          </p>
        </div>
      </div>
    </footer>
  );
}
