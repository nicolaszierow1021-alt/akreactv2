"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Carousel } from "@/components/Carousel";
import { FeaturedCard } from "@/components/FeaturedCard";
import { BadgeOverlay } from "@/components/BadgeOverlay";
import { CategoryFilter } from "@/components/CategoryFilter";
import { getAppsExcludingCategory } from "@/lib/db";
import { LayoutDashboard, ChevronRight, Loader2 } from "lucide-react";

export default function AplicacionesPage() {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getAppsExcludingCategory("Juegos", 200);
        setApps(data);
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
        <main className="flex-1 pb-16 pt-12 flex justify-center items-center min-h-[60vh]">
          <Loader2 className="w-10 h-10 animate-spin text-red-600" />
        </main>
        <Footer />
      </>
    );
  }

  const featuredApps = apps.filter((app) => app.featured);

  return (
    <>
      <Header />
      <main className="min-h-[60vh] bg-white dark:bg-[#0a0f1c] transition-colors duration-300 rounded-t-[30px] sm:rounded-none shadow-[0_-4px_24px_rgba(0,0,0,0.05)] sm:shadow-none mt-2 sm:mt-0 relative z-10 overflow-hidden pb-10">
        <header className="pt-6 pb-2 px-4 md:px-6 max-w-7xl mx-auto sm:pl-6 md:pl-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <Link href="/" className="hover:text-red-600 transition-colors">
              Inicio
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="font-semibold text-slate-900 dark:text-white">
              Aplicaciones
            </span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Aplicaciones
          </h1>
          <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">
            {apps.length} aplicaciones disponibles
          </p>
        </header>

        <CategoryFilter
          type="aplicaciones"
          apps={apps.map((app) => ({
            id: app.id,
            title: app.title,
            publisher: app.publisher,
            rating: app.rating,
            modType: app.modType,
            iconUrl: app.iconUrl,
            bannerUrl: app.bannerUrl,
            subcategory: app.subcategory || "",
            featured: app.featured,
            size: app.size || "",
            badgeType: app.badgeType,
          }))}
        >
          {featuredApps.length > 0 && (
            <section className="pt-8 md:pt-10 max-w-7xl mx-auto pl-4 sm:pl-6 md:pl-8">
              <div className="flex items-center mb-6 pr-4 sm:pr-6 md:pr-8">
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                  <span className="w-1.5 h-7 bg-red-600 rounded-full"></span>
                  Destacados
                </h2>
              </div>
              <div className="mb-8">
                <Carousel cellWidthClass="w-full md:w-[45%] lg:w-[32%]">
                  {featuredApps.map((app) => (
                    <FeaturedCard
                      key={app.id}
                      {...app}
                      imageUrl={app.bannerUrl || app.iconUrl}
                    />
                  ))}
                </Carousel>
              </div>
            </section>
          )}

          <section className="max-w-7xl mx-auto pl-4 sm:pl-6 md:pl-8 py-8 md:py-10">
            <div className="flex items-end justify-between mb-6 pr-4 sm:pr-6 md:pr-8">
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                <span className="w-1.5 h-7 bg-red-600 rounded-full"></span>
                Aplicaciones
              </h2>
            </div>

            <Carousel cellWidthClass="w-[30%] sm:w-[22%] md:w-[18%] lg:w-[15%]">
              {apps.slice(0, 15).map((app) => (
                <Link
                  key={app.id}
                  href={`/app/${app.id}`}
                  className="flex flex-col gap-2 group active:scale-95 transition-transform duration-200"
                >
                  <div className="aspect-square rounded-[22%] overflow-hidden bg-slate-100 dark:bg-[#151522] ring-1 ring-black/5 dark:ring-white/5 shadow-sm relative">
                    <img
                      src={
                        app.iconUrl ||
                        `https://picsum.photos/seed/${app.id}/300/300`
                      }
                      alt={app.title}
                      className="w-full h-full object-cover"
                    />
                    <BadgeOverlay badgeType={app.badgeType} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="px-0.5">
                    <h3 className="font-semibold text-[13px] leading-tight line-clamp-2 group-hover:text-red-600 dark:text-white dark:group-hover:text-red-400 transition-colors">
                      {app.title}
                    </h3>
                    <p className="text-[11px] text-gray-500 dark:text-slate-400 font-medium mt-0.5 truncate">
                      {app.rating.toFixed(1)} ★{" "}
                      {app.modType ? `• ${app.modType}` : ""}
                    </p>
                  </div>
                </Link>
              ))}
            </Carousel>
          </section>
        </CategoryFilter>
      </main>
      <Footer />
    </>
  );
}
