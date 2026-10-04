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
  title: "Saran M | Senior Cloud & DevSecOps Engineer (AWS, GCP, Azure)",
  description: "Senior Cloud and DevSecOps Engineer with 5+ years experience in cloud infrastructure, CI/CD automation, production operations, SOC 2 / ISO 27001 readiness across AWS, GCP, and Azure.",
  keywords: [
    "Senior Cloud Engineer",
    "DevSecOps Engineer",
    "Cloud Infrastructure Engineer",
    "AWS Engineer",
    "GCP Engineer",
    "Azure Engineer",
    "DevOps Engineer",
    "Cloud Security",
    "CI/CD Automation",
    "Terraform",
    "Docker",
    "Kubernetes",
    "Jenkins",
    "GitHub Actions",
    "SOC 2 Readiness",
    "ISO 27001",
    "Chennai"
  ],
  authors: [{ name: "Saran M" }],
  openGraph: {
    title: "Saran M | Senior Cloud & DevSecOps Engineer",
    description: "Designing secure, automated and production-ready cloud infrastructure across AWS, GCP and Azure.",
    type: "website",
    url: "https://saran1305.github.io/saran",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saran M | Senior Cloud & DevSecOps Engineer",
    description: "Designing secure, automated and production-ready cloud infrastructure across AWS, GCP and Azure.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.variable} antialiased bg-background text-foreground`} suppressHydrationWarning>
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
