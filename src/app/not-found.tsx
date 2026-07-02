import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-4 text-7xl" aria-hidden="true">
        🔍
      </div>
      <h1 className="mb-2 text-3xl font-bold text-secondary">Page not found</h1>
      <p className="mb-6 max-w-md text-gray-soft">
        The page you are looking for does not exist or has been moved. Let&apos;s get
        you back to exploring.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-bg transition-colors hover:bg-primary-dark"
      >
        Browse properties
      </Link>
    </div>
  );
}
