"use client";

import { useEffect, useState } from "react";
import { getAppBySlug } from "@/lib/db";
import { DownloadClient } from "./DownloadClient";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function ClientDownloadPage({ id, indexStr }: { id: string, indexStr: string }) {
  const [app, setApp] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getAppBySlug(id);
        setApp(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="flex-1 pb-16 pt-12 flex justify-center items-center min-h-[60vh]">
          <Loader2 className="w-10 h-10 animate-spin text-red-600" />
        </main>
        <Footer />
      </>
    );
  }

  if (!app) {
    return (
      <>
        <Header />
        <main className="flex-1 flex justify-center items-center min-h-[60vh]">
          <h2 className="text-xl font-bold text-gray-500">App no encontrada</h2>
        </main>
        <Footer />
      </>
    );
  }

  const linkIndex = parseInt(indexStr, 10);
  if (isNaN(linkIndex) || linkIndex < 0 || linkIndex >= app.downloadLinks.length) {
    return (
      <>
        <Header />
        <main className="flex-1 flex justify-center items-center flex-col gap-4 min-h-[60vh]">
          <h2 className="text-xl font-bold text-gray-500">Enlace no válido</h2>
          <Link href={`/app/${id}`} className="text-red-500 underline">Volver a la app</Link>
        </main>
        <Footer />
      </>
    );
  }

  const downloadLink = app.downloadLinks[linkIndex];

  return (
    <>
      <Header />
      <DownloadClient app={app} downloadLink={downloadLink} />
      <Footer />
    </>
  );
}
