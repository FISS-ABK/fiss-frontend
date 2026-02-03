import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Inter } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { Toast } from "radix-ui";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-suisse-intl",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Foursquare International Secondary School",
  description: "Raising Godly and Academically Excellent Leaders",
  icons: {
    icon: "https://www.figma.com/api/mcp/asset/1be565c6-7ea0-4650-8f56-ca2f051ecab4",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${inter.variable} font-suisse antialiased`}
      >
        <ReactQueryProvider>
          {children}
          <Toaster position="top-right" richColors />
        </ ReactQueryProvider>
      </body>
    </html>
  );
}
