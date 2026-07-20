import * as React from "react";
import { getAppBySlug, getRecentApps } from "@/lib/db";
import ClientAppDetail from "./ClientPage";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://akdescargas.store";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const app = await getAppBySlug(id);
  if (!app) return {};

  const title = `${app.title} ${app.modType ? `MOD (${app.modType})` : ""} v${app.version} APK | AKDESCARGAS`;
  const description = `Descarga ${app.title} ${app.modType ? `MOD ${app.modType}` : ""} v${app.version} para Android. ${app.description.slice(0, 120)}...`;
  const url = `${SITE_URL}/app/${id}`;
  const image = app.bannerUrl || app.iconUrl || `${SITE_URL}/og-image.png`;

  return {
    title,
    description,
    keywords: [
      app.title,
      `${app.title} apk`,
      `${app.title} mod`,
      `${app.title} mod apk`,
      `descargar ${app.title}`,
      `${app.title} android`,
      app.publisher,
      app.category,
      "apk mod",
      "apk gratis",
    ],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "es_ES",
      url,
      title,
      description,
      siteName: "AKDESCARGAS",
      images: [{ url: image, width: 1200, height: 630, alt: app.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

// Ensure unknown dynamic routes don't fail at build time if not in generateStaticParams
// but we want CF Pages to handle them via Cloudflare function fallback, so we allow true/false
// Next.js static export does NOT support dynamicParams = true. It will throw error on unknown paths during build.
// But we want to let client-side router handle unknown IDs.
// Actually, if dynamicParams is false (default for export), navigating to unknown ID throws a 404 in Next.js router.
// If we set it to false, client routing to new apps fails.
// In Next.js static export, if we export an empty array from generateStaticParams, it builds nothing.
// Let's just generate the top 500 apps so they are in the build.
export async function generateStaticParams() {
  const apps = await getRecentApps(500);
  if (apps.length === 0) {
    return [{ id: "dummy-id" }];
  }
  return apps.map((app) => ({
    id: app.id,
  }));
}

export default async function AppDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ClientAppDetail id={id} />;
}
