import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Registrace na veletrh",
  description: "Registrační formulář pro veletrh",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body className="min-h-screen bg-gray-50 antialiased">{children}</body>
    </html>
  );
}
