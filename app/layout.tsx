import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import Sparkles from "@/components/Sparkles";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RG TECH | Hyper-Futuristic Solutions",
  description: "Next-gen web development with neon aesthetics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
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
