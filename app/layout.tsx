import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#0d1117",
};

export const metadata: Metadata = {
  title: "DevQuest: Multi-Track Developer Lab",
  description: "La piattaforma interattiva per padroneggiare Python, TypeScript e Git & GitHub con sfide pratiche e AI Tutor.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "DevQuest",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="dark">
      <body className="min-h-screen bg-[#0d1117] text-[#e6edf3] antialiased selection:bg-amber-500/30 selection:text-amber-200 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
