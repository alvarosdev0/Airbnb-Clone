import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Airbnb Clone — Discover Places to Stay",
  description:
    "Browse vacation rentals, cabins, beach houses, and more. Your next getaway starts here.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
        lang="en"
        className={`${inter.variable} ${playfairDisplay.variable} h-full antialiased`}
        suppressHydrationWarning
      >
        <head>
          <meta name="theme-color" content="#FFFFFF" media="(prefers-color-scheme: light)" />
          <meta name="theme-color" content="#1A1A1A" media="(prefers-color-scheme: dark)" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  try {
                    var theme = localStorage.getItem('airbnb-theme');
                    if (theme === 'dark') {
                      document.documentElement.classList.add('dark');
                    } else {
                      document.documentElement.classList.remove('dark');
                    }
                  } catch (e) {}
                })();
              `,
            }}
          />
        </head>
        <body className="flex min-h-full flex-col">
          <ThemeProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
  );
}
