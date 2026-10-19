import "./globals.css";

export const metadata = {
  title: "FairFly — Explore the World",
  description: "Discover your next adventure with FairFly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
