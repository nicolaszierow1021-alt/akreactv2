import { getRecentApps } from "@/lib/db";
import ClientDownloadPage from "./ClientDownloadPage";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  }
};

export async function generateStaticParams() {
  const apps = await getRecentApps(100);
  if (apps.length === 0) {
    return [{ id: "dummy-id", index: "0" }];
  }
  const params = [];
  for (const app of apps) {
    for (let i = 0; i < (app.downloadLinks?.length || 0); i++) {
      params.push({ id: app.id, index: i.toString() });
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
