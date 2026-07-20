"use client";

import React, { useEffect, useState, Suspense } from "react";
import { Header } from "@/components/Header";
import { AppCard } from "@/components/AppCard";
import { searchApps } from "@/lib/db";
import { Footer } from "@/components/Footer";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('s') || "";
  
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function performSearch() {
      if (!query || query.trim() === "") {
        setResults([]);
        return;
      }
      
      setLoading(true);
      try {
        const q = query.trim().toLowerCase();
        const filteredApps = await searchApps(q);
        
        const formattedResults = filteredApps.map((app) => ({
          id: app.id,
          title: app.title,
          publisher: app.publisher,
          rating: app.rating,
          downloads: app.size,
          version: `v${app.version}`,
          updated: false,
          updatedAt: app.updatedAt,
          iconUrl: app.iconUrl || `https://picsum.photos/seed/${app.id}/100/100`,
          badgeType: app.badgeType,
        }));
        
        setResults(formattedResults);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    performSearch();
  }, [query]);

  if (!query || query.trim() === "") {
    return (
      <main className="flex-1 pb-16 pt-8 md:pt-12 flex justify-center items-center min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-xl font-bold text-gray-500 dark:text-slate-400">
            Ingresa un término en el buscador para encontrar apps y juegos.
          </h2>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 pb-16 pt-8 md:pt-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="relative overflow-hidden flex items-center justify-between mb-8 bg-[#DC2626] dark:bg-slate-800/80 p-[0.6rem] rounded-[1.5rem] shadow-sm dark:shadow-none border border-transparent dark:border-white/5 transition-colors">
          <h2 className="text-[18px] md:text-[20px] font-extrabold tracking-tight text-white dark:text-slate-100 flex items-center w-full justify-center md:justify-start md:gap-2.5 md:ml-2 relative">
            <span>Resultados de búsqueda para: &quot;{query}&quot;</span>
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[30vh]">
            <Loader2 className="w-10 h-10 animate-spin text-red-600" />
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {results.map((app) => (
              <AppCard key={app.id} {...app} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-800/20 border border-gray-100 dark:border-white/5 rounded-3xl p-6">
            <svg
              className="w-16 h-16 text-gray-300 dark:text-slate-600 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              No se encontraron resultados
            </h3>
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              Prueba a buscar con palabras clave diferentes o verifica la ortografía del término.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <>
      <Header />
      <Suspense fallback={
        <main className="flex-1 pb-16 pt-12 flex justify-center items-center min-h-[50vh]">
          <Loader2 className="w-10 h-10 animate-spin text-red-600" />
        </main>
      }>
        <SearchContent />
      </Suspense>
      <Footer />
    </>
  );
}
