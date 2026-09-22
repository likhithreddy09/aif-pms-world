import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Best PMS & AIF Investment Services in India | PMS AIF WORLD",
    template: "%s | PMS AIF WORLD",
  },
  description:
    "India’s most trusted PMS & AIF platform. Analytics-backed quality investing for HNIs, UHNIs and NRIs.",
  openGraph: {
    title: "PMS AIF WORLD",
    description:
      "Creating real stories of wealth creation through alpha-focused investments.",
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
      <body className={`${sans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
