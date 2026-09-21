import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "PMS AIF World",
    template: "%s | PMS AIF World",
  },
  description:
    "Explore PMS and AIF investment managers, strategies and track records in one place.",
  openGraph: {
    title: "PMS AIF World",
    description:
      "Explore PMS and AIF investment managers, strategies and track records in one place.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} bg-paper font-sans text-ink antialiased`}>
        {children}
      </body>
    </html>
  );
}
