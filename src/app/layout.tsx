import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { SoundProvider } from "@/context/SoundContext";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Saran M | Digital Transformation Specialist",
  description: "Senior Digital Transformation Specialist specializing in Front-End Architecture & Cloud/DevOps. Building scalable interfaces and resilient cloud systems.",
  keywords: ["Digital Transformation", "Front-End", "React.js", "Cloud", "DevOps", "AWS", "Azure", "Chennai"],
  authors: [{ name: "Saran M" }],
  openGraph: {
    title: "Saran M | Digital Transformation Specialist",
    description: "Building scalable interfaces and resilient cloud systems.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saran M | Digital Transformation Specialist",
    description: "Building scalable interfaces and resilient cloud systems.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          <SoundProvider>
            <CustomCursor />
            {children}
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
