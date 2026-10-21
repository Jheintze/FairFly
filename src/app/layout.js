import "./globals.css";
import { Fraunces, Figtree } from "next/font/google";
import { Providers } from "./providers";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata = {
  title: "FairFly — Explore the World",
  description: "Discover your next adventure with FairFly.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-paper focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink focus:shadow-lg"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
