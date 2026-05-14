import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import Sparkles from "@/components/Sparkles";
import Loader from "@/components/Loader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://rg-tech.vercel.app"),
  title: {
    default: "RG TECH | Best Software Solution in Odisha & India",
    template: "%s | RG TECH",
  },
  description: "RG TECH is the premier software development company in Odisha, India. We deliver high-performance web applications, scalable android systems, custom CRM/ERP solutions, and enterprise software.",
  keywords: [
    "best software solution in Odisha",
    "software development company India",
    "top web developers in Odisha",
    "android app development company India",
    "custom CRM ERP development",
    "enterprise software solutions Odisha",
    "IT company in Bhubaneswar Odisha",
    "RG TECH Odisha",
    "modded software provider",
    "academic B.Tech project support",
    "ecommerce website development India"
  ],
  authors: [{ name: "RG TECH", url: "https://rg-tech.vercel.app" }],
  creator: "RG TECH",
  publisher: "RG TECH",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "RG TECH | Best Software Solution in Odisha & India",
    description: "Pioneering software development studio in Odisha, India specializing in Web, Android, and Enterprise solutions.",
    url: "https://rg-tech.vercel.app",
    siteName: "RG TECH",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/icon.svg",
        width: 800,
        height: 600,
        alt: "RG TECH Software Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RG TECH | Software Development Studio",
    description: "High-performance software solutions engineered in Odisha, India.",
    images: ["/icon.svg"],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  verification: {
    google: "add-your-google-site-verification-code-here",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "RG TECH",
    "image": "https://rg-tech.vercel.app/icon.svg",
    "@id": "https://rg-tech.vercel.app",
    "url": "https://rg-tech.vercel.app",
    "telephone": "+916370810878",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bhubaneswar",
      "addressRegion": "Odisha",
      "postalCode": "751001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 20.2961,
      "longitude": 85.8245
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://twitter.com/rgtech",
      "https://github.com/rgtech",
      "https://linkedin.com/company/rgtech"
    ]
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <Loader />
        <div className="mesh-bg" />
        <div className="noise" />
        <Sparkles />
        <Cursor />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
