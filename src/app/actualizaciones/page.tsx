"use client";

import React, { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AppCard } from "@/components/AppCard";
import { Pagination } from "@/components/Pagination";
import { getRecentAppsPaginated } from "@/lib/db";
import { TrendingUp, Loader2 } from "lucide-react";
import Link from "next/link";

const ITEMS_PER_PAGE = 12;

export default function ActualizacionesPage() {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function loadPage() {
      setLoading(true);
      try {
        const { data, total } = await getRecentAppsPaginated(currentPage, ITEMS_PER_PAGE);
        
        const formattedApps = data.map((app: any) => ({
          id: app.id,
          title: app.title,
          publisher: app.publisher,
          rating: app.rating,
          downloads: app.size,
          version: `v${app.version}`,
          updated: true,
          updatedAt: app.updatedAt,
          iconUrl: app.iconUrl || `https://picsum.photos/seed/${app.id}/100/100`,
          badgeType: app.badgeType,
        }));
        
        setApps(formattedApps);
        setTotalPages(Math.ceil(total / ITEMS_PER_PAGE));
      } catch (error) {
        console.error("Error loading actualizaciones:", error);
      } finally {
        setLoading(false);
      }
    }
    loadPage();
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <>
      <Header />
      <main className="flex-1 min-h-screen bg-gray-50/50 dark:bg-[#0a0f1c]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 md:pt-10 pb-16">
          <nav aria-label="breadcrumb" className="flex items-center text-[13px] md:text-[14px] text-gray-400 dark:text-slate-500 font-medium mb-6 md:mb-8">
            <Link href="/" className="hover:text-red-500 transition-colors">Inicio</Link>
            <span className="mx-1.5 text-gray-300 dark:text-slate-600">/</span>
            <span className="text-gray-900 dark:text-white font-semibold">Actualizaciones</span>
          </nav>

          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-500 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Últimas Actualizaciones</h1>
              <p className="text-[13px] md:text-[14px] text-gray-500 dark:text-slate-400 mt-1">Explora las últimas versiones añadidas</p>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(ITEMS_PER_PAGE)].map((_, i) => (
                <div key={i} className="h-[90px] bg-gray-200 dark:bg-slate-800/80 rounded-2xl animate-pulse border border-gray-100 dark:border-white/5"></div>
              ))}
            </div>
          ) : (
            <>
              {apps.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {apps.map((app) => (
                      <AppCard key={app.id} {...app} />
                    ))}
                  </div>
                  <Pagination 
                    currentPage={currentPage} 
                    totalPages={totalPages} 
                    onPageChange={setCurrentPage} 
                  />
                </>
              ) : (
                <div className="text-center py-20">
                  <p className="text-gray-500 dark:text-slate-400">No hay actualizaciones disponibles.</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
