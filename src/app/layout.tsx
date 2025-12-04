import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets:['latin']
})

export const metadata: Metadata = {
  title: "BudgetBuddy",
  description: "Budget app to for personal finance management",
  icons: {
    icon: [
      { url: "/favicons/favicon.ico", type: "image/x-icon" },
      { url: "/favicons/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicons/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [
      { url: "/favicons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicons/favicon.ico"],
    other: [
      {
        rel: "manifest",
        url: "/favicons/site.webmanifest",
      },
      {
        rel: "icon",
        url: "/favicons/android-chrome-192x192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        rel: "icon",
        url: "/favicons/android-chrome-512x512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
  },
};

/**
 * Root layout component that applies global fonts and wraps page content.
 *
 * @returns An `<html lang="se">` element whose `<body>` has the global font classes and contains `children`.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="se">
      <body
        className={`${inter.variable} ${geistMono.variable} ${geistSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}