import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-4" aria-hidden="true">
        <svg className="h-16 w-16 text-gray-soft/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </div>
      <h1 className="mb-2 text-3xl font-bold text-text-primary">Page not found</h1>
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
