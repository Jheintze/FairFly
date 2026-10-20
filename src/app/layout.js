
import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "FairFly — Explore the World",
  description: "Discover your next adventure with FairFly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
