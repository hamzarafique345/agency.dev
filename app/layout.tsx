import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Background3D } from "@/components/ui/Background3D";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AGENCY.dev | Digital Excellence",
  description: "We build high-performance websites, AI-driven solutions, and cutting-edge digital experiences. Elevate your brand with our expert development services.",
  keywords: ["web development", "AI solutions", "digital agency", "Next.js", "React", "UI/UX design"],
  authors: [{ name: "AGENCY.dev" }],
  openGraph: {
    title: "AGENCY.dev | Digital Excellence",
    description: "We build high-performance websites and AI-driven solutions",
    type: "website",
    siteName: "AGENCY.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "AGENCY.dev | Digital Excellence",
    description: "We build high-performance websites and AI-driven solutions",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground selection:bg-primary/30 selection:text-white`}
      >
        {/* 3D Background */}
        <Background3D />

        <div className="relative z-0 flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}