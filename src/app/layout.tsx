import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://akdescargas.store";
const SITE_NAME = "AKDESCARGAS";
const SITE_DESCRIPTION =
  "Descarga APK de juegos y aplicaciones Android gratis. Versiones MOD, Premium desbloqueado, sin anuncios y siempre actualizadas.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - Descargar APK Juegos y Apps Android`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "descargar apk",
    "apk mod",
    "juegos android",
    "aplicaciones android",
    "apk gratis",
    "apk premium",
    "mod apk",
    "juegos mod android",
    "apps mod",
    "akdescargas",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} - Descargar APK Juegos y Apps Android`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Descargar APK`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - Descargar APK Juegos y Apps Android`,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
    creator: "@akdescargas",
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <Script src="https://pl30226645.effectivecpmnetwork.com/ec/3f/b0/ec3fb09186ab520498e7ed6e1eef4b0a.js" strategy="afterInteractive" />
      </head>
      <body
        className={`${inter.variable} font-sans min-h-screen bg-gray-50/50 dark:bg-[#0a0f1c] text-slate-900 dark:text-slate-100 antialiased selection:bg-red-500 selection:text-white flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
