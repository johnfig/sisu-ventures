import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: ["400"],
  style: ["italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sisuventures.co"),
  title: "SISU Ventures — We acquire, we build.",
  description:
    "Sisu Ventures acquires and builds assets where we can add significant value — focused on high cash flow opportunities with asymmetric upside.",
  applicationName: "SISU Ventures",
  authors: [{ name: "John Figueiredo" }],
  keywords: [
    "SISU Ventures",
    "private investment",
    "real estate",
    "mobile home parks",
    "workforce housing",
    "value equities",
    "John Figueiredo",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://sisuventures.co",
    siteName: "SISU Ventures",
    title: "SISU Ventures — We acquire, we build.",
    description:
      "Private investment company. Real estate, equities, and operating companies — high cash flow, asymmetric upside.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SISU Ventures — We acquire, we build.",
    description:
      "Private investment company. Real estate, equities, and operating companies — high cash flow, asymmetric upside.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0420",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
