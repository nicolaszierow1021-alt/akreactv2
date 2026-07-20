"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getApps } from "@/lib/db";
import { Puzzle, Star, Loader2 } from "lucide-react";

export default function MasJuegosPage() {
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const allApps = await getApps(500);
        const filteredGames = allApps
          .filter((app) => app.category === "Juegos")
          .sort((a, b) => b.rating - a.rating);
        setGames(filteredGames);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <main className="flex-1 pb-16 pt-12 flex justify-center items-center min-h-[50vh]">
          <Loader2 className="w-10 h-10 animate-spin text-red-600" />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 pb-16 pt-8 md:pt-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Page Header */}
          <div className="relative overflow-hidden flex items-center gap-3 mb-8 bg-gradient-to-r from-violet-600 to-red-600 p-[0.75rem] rounded-[1.5rem] shadow-sm border border-transparent">
            <Puzzle className="w-6 h-6 text-white shrink-0" />
            <div>
              <h1 className="text-[20px] md:text-[22px] font-extrabold tracking-tight text-white">
                Más Juegos
              </h1>
              <p className="text-white/70 text-[13px]">Descubre más juegos impresionantes</p>
            </div>
          </div>

          {games.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
              {games.map((app) => (
                <Link
                  key={app.id}
                  href={`/app/${app.id}`}
                  className="group block text-inherit no-underline"
                >
                  <div className="relative w-full aspect-square rounded-[22px] overflow-hidden bg-gray-50 dark:bg-slate-800 shadow-[0_4px_20px_rgb(0,0,0,0.06)] border border-black/5 dark:border-white/10 group-hover:shadow-[0_8px_30px_rgb(124,58,237,0.2)] transition-all duration-300">
                    <img
                      src={app.iconUrl || `https://picsum.photos/seed/${app.id}/200/200`}
                      alt={app.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <p className="mt-2 font-bold text-[13px] md:text-[14px] text-gray-900 dark:text-white truncate leading-tight group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {app.title}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-[11px] text-gray-500 dark:text-slate-400 font-medium">
                      {app.rating.toFixed(1)}
                    </span>
                    <Star className="w-3 h-3 text-amber-400 fill-current" />
                    {app.modType && (
                      <span className="ml-1 text-[9px] font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider bg-violet-50 dark:bg-violet-500/10 px-1.5 py-0.5 rounded-full truncate">
                        {app.modType}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-slate-800/20 border border-gray-100 dark:border-white/5 rounded-3xl">
              <Puzzle className="w-16 h-16 text-gray-300 dark:text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                No hay juegos disponibles
              </h3>
              <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
                Vuelve pronto, estamos agregando más contenido.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
