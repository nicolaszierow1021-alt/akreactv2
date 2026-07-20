import { getRecentApps } from "@/lib/db";
import ClientDownloadPage from "./ClientDownloadPage";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  }
};

import { supabase } from "@/lib/supabase";

export async function generateStaticParams() {
  const { data: apps, error } = await supabase
    .from("apps")
    .select("id, downloadLinks")
    .order("createdAt", { ascending: false })
    .limit(500);

  if (error || !apps || apps.length === 0) {
    return [{ id: "dummy-id", index: "0" }];
  }

  const params = [];
  for (const app of apps) {
    if (app.downloadLinks && Array.isArray(app.downloadLinks)) {
      for (let i = 0; i < app.downloadLinks.length; i++) {
        params.push({ id: app.id, index: i.toString() });
      }
    }
  }

  if (params.length === 0) {
    return [{ id: "dummy-id", index: "0" }];
  }
  return params;
}

export default async function DownloadPage({
  params,
}: {
  params: Promise<{ id: string; index: string }>;
}) {
  const { id, index } = await params;
  return <ClientDownloadPage id={id} indexStr={index} />;
}
