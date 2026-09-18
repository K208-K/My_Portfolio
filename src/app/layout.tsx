import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/global/SmoothScroll";
import Navbar from "@/components/global/Navbar";
import FullPageScrollCanvas from "@/components/global/FullPageScrollCanvas";
import GlobalSearch from "@/components/global/GlobalSearch";
import PageBackground from "@/components/global/PageBackground";
import { siteConfig } from "@/config/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#08090b",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-background text-neutral-100 min-h-screen antialiased selection:bg-violet-600 selection:text-white flex flex-col">
        <PageBackground />
        <SmoothScroll>
          <FullPageScrollCanvas />
          <Navbar />
          <GlobalSearch />
          <div className="flex-1 w-full relative z-10">{children}</div>
        </SmoothScroll>
      </body>
    </html>
  );
}
