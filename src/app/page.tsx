"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { AppCard } from "@/components/AppCard";
import { FeaturedCard } from "@/components/FeaturedCard";
import { Carousel } from "@/components/Carousel";
import { BadgeOverlay } from "@/components/BadgeOverlay";
import { Loader2, TrendingUp, ThumbsUp, Sparkles, Star } from "lucide-react";
import { getFeaturedApps, getRecentApps, getAppsByCategory, getAppsExcludingCategory } from "@/lib/db";
import { Footer } from "@/components/Footer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://akdescargas.store";

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AKDESCARGAS",
  url: SITE_URL,
  description:
    "Descarga APK de juegos y aplicaciones Android gratis. Versiones MOD, Premium desbloqueado, sin anuncios y siempre actualizadas.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/?s={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [
          featuredAppsData,
          recentAppsData,
          gamesData,
          appsData
        ] = await Promise.all([
          getFeaturedApps(6),
          getRecentApps(9),
          getAppsByCategory("Juegos", 9),
          getAppsExcludingCategory("Juegos", 9)
        ]);

        setData({
          featuredAppsData,
          recentAppsData,
          gamesData,
          appsData
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading || !data) {
    return (
      <>
        <Header />
        <main className="flex-1 pb-16 pt-8 max-w-7xl mx-auto w-full px-4 md:px-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-slate-800/80 animate-pulse"></div>
            <div className="h-6 w-32 bg-gray-200 dark:bg-slate-800/80 rounded-md animate-pulse"></div>
          </div>
          <div className="flex gap-4 overflow-hidden mb-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-[100%] sm:w-[85%] md:w-[45%] lg:w-[30%] h-[220px] bg-gray-200 dark:bg-slate-800/80 rounded-[26px] animate-pulse shrink-0 border border-gray-100 dark:border-white/5"></div>
            ))}
          </div>

          <div className="h-12 w-full md:w-64 bg-gray-200 dark:bg-slate-800/80 rounded-2xl animate-pulse mb-6"></div>
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-[92%] sm:w-[50%] lg:w-[32%] flex flex-col gap-3 shrink-0">
                <div className="h-[90px] bg-gray-200 dark:bg-slate-800/80 rounded-2xl animate-pulse border border-gray-100 dark:border-white/5"></div>
                <div className="h-[90px] bg-gray-200 dark:bg-slate-800/80 rounded-2xl animate-pulse border border-gray-100 dark:border-white/5"></div>
                <div className="h-[90px] bg-gray-200 dark:bg-slate-800/80 rounded-2xl animate-pulse border border-gray-100 dark:border-white/5"></div>
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const { featuredAppsData, recentAppsData, gamesData, appsData } = data;

  const recommendationsData = [
    ...featuredAppsData,
    ...recentAppsData.filter((app: any) => !app.featured),
  ].slice(0, 8);

  const featuredApps = featuredAppsData.map((app: any) => ({
    id: app.id,
    title: app.title,
    publisher: app.publisher,
    rating: app.rating,
    imageUrl: app.bannerUrl || `https://picsum.photos/seed/${app.id}/600/300`,
    iconUrl: app.iconUrl || `https://picsum.photos/seed/${app.id}-icon/100/100`,
    badgeType: app.badgeType,
  }));

  const popularApps = recentAppsData.map((app: any) => ({
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

  const recommendations = recommendationsData.map((app: any) => ({
    id: app.id,
    title: app.title,
    category: app.category,
    size: app.size,
    rating: app.rating,
    iconUrl: app.iconUrl || `https://picsum.photos/seed/${app.id}/150/150`,
    badgeType: app.badgeType,
  }));

  const gamesList = gamesData.map((app: any) => ({
    id: app.id,
    title: app.title,
    category: app.category,
    rating: app.rating,
    modType: app.modType,
    iconUrl: app.iconUrl || `https://picsum.photos/seed/${app.id}/100/100`,
    badgeType: app.badgeType,
  }));

  const appsList = appsData.map((app: any) => ({
    id: app.id,
    title: app.title,
    category: app.category,
    rating: app.rating,
    modType: app.modType,
    iconUrl: app.iconUrl || `https://picsum.photos/seed/${app.id}/100/100`,
    badgeType: app.badgeType,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Header />
      <main className="flex-1 pb-16">
        {featuredApps.length > 0 && (
          <section className="pt-8 md:pt-12">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                  <Star className="w-6 h-6 text-red-600 dark:text-red-500 fill-current" />
                  Destacados
                </h2>
              </div>
              <Carousel cellWidthClass="w-full sm:w-[85%] md:w-[45%] lg:w-[30%]">
                {featuredApps.map((app: any) => (
                  <FeaturedCard key={app.id} {...app} />
                ))}
              </Carousel>
            </div>
          </section>
        )}

        {popularApps.length > 0 && (
          <section className="mt-8 md:mt-12">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="relative overflow-hidden flex items-center justify-between mb-6 bg-[#DC2626] dark:bg-slate-800/80 p-[0.6rem] rounded-[1.5rem] shadow-sm dark:shadow-none border border-transparent dark:border-white/5 transition-colors">
                <h2 className="text-[18px] md:text-[20px] font-extrabold tracking-tight text-white dark:text-slate-100 flex items-center w-full justify-center md:justify-start md:gap-2.5 md:ml-2 relative">
                  <TrendingUp className="w-5 h-5 text-white dark:text-red-400 hidden md:block" />
                  <span>Actualizaciones</span>
                </h2>
              </div>

              <Carousel cellWidthClass="w-[92%] sm:w-[50%] lg:w-[32%]">
                {(() => {
                  const chunks = [];
                  for (let i = 0; i < popularApps.length; i += 3) {
                    chunks.push(popularApps.slice(i, i + 3));
                  }
                  return chunks.map((chunk, ci) => (
                    <div key={ci} className="flex flex-col gap-3">
                      {chunk.map((app: any) => (
                        <AppCard key={app.id} {...app} />
                      ))}
                    </div>
                  ));
                })()}
              </Carousel>
            </div>
          </section>
        )}

        {recommendations.length > 0 && (
          <section className="mt-12 md:mt-16">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                  <ThumbsUp className="w-6 h-6 text-red-600 dark:text-red-500 fill-red-600/20" />
                  Recomendaciones
                </h2>
              </div>
              <Carousel cellWidthClass="w-[156px] md:w-[178px]">
                {recommendations.map((app: any) => (
                  <Link
                    key={app.id}
                    href={`/app/${app.id}`}
                    className="block group shrink-0 text-inherit no-underline transition-transform duration-300 active:scale-95"
                  >
                    <div className="relative w-[140px] h-[140px] md:w-[162px] md:h-[162px] rounded-[22px] md:rounded-[26px] overflow-hidden bg-gray-50 dark:bg-slate-800 shadow-[0_4px_20px_rgb(0,0,0,0.06)] border border-black/5 dark:border-white/10 group-hover:shadow-[0_8px_30px_rgb(0,122,255,0.15)] transition-all duration-300">
                      <img
                        src={app.iconUrl}
                        alt={app.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <BadgeOverlay badgeType={app.badgeType} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <p className="mt-[10px] font-bold text-[14px] md:text-[15px] text-gray-900 dark:text-white block truncate leading-tight group-hover:text-red-600 dark:group-hover:text-red-500 transition-all max-w-[140px] md:max-w-[162px]">
                      {app.title}
                    </p>
                    <p className="text-[11px] md:text-[12.5px] text-gray-500 dark:text-slate-400 mt-1 mb-2 line-clamp-1 max-w-[140px] md:max-w-[162px]">
                      {app.category} &middot; {app.size}
                    </p>
                    <div className="mt-1">
                      <span className="inline-flex items-center gap-1 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 px-2.5 py-0.5 rounded-full text-[11px] font-medium border border-gray-200 dark:border-white/5">
                        {app.rating.toFixed(1)} <Star className="w-3 h-3 text-red-600 dark:text-red-400 fill-current" />
                      </span>
                    </div>
                  </Link>
                ))}
              </Carousel>
            </div>
          </section>
        )}

        {gamesList.length > 0 && (
          <section className="mt-12 md:mt-16">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="flex items-end justify-between mb-5 border-b border-black/5 dark:border-white/10 pb-3">
                <div>
                  <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-red-600 dark:text-red-500" />
                    Juegos
                  </h2>
                  <p className="text-[13px] text-gray-500 dark:text-slate-400 mt-1">Explora lo mejor de Juegos</p>
                </div>
                <Link href="/juegos" className="text-[14px] font-bold text-red-600 dark:text-red-500 hover:underline">
                  Ver más
                </Link>
              </div>
              <Carousel cellWidthClass="w-[92%] sm:w-[50%] lg:w-[32%]">
                {(() => {
                  const chunks = [];
                  for (let i = 0; i < gamesList.length; i += 3) {
                    chunks.push(gamesList.slice(i, i + 3));
                  }
                  return chunks.map((chunk, ci) => (
                    <div key={ci} className="flex flex-col gap-4">
                      {chunk.map((app: any) => (
                        <Link
                          key={app.id}
                          href={`/app/${app.id}`}
                          className="flex items-center gap-3 py-3 border-b border-black/5 dark:border-white/5 last:border-0 group cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 -mx-2 px-2 rounded-xl"
                        >
                          <div className="relative w-[60px] h-[60px] rounded-[16px] overflow-hidden shrink-0 shadow-sm border border-black/5 dark:border-white/10 bg-gray-50 dark:bg-gray-700">
                            <img src={app.iconUrl} className="w-full h-full object-cover" alt={app.title} />
                            <BadgeOverlay badgeType={app.badgeType} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-bold text-[15px] text-gray-900 dark:text-white block truncate leading-tight group-hover:text-red-600 dark:group-hover:text-red-500 transition-all">
                              {app.title}
                            </h3>
                            <p className="text-[13px] text-gray-500 dark:text-slate-400 mt-[2px] line-clamp-1">
                              {app.category}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center gap-0.5 text-[11px] text-gray-500 font-medium">
                                {app.rating.toFixed(1)} <Star className="w-3 h-3 text-gray-400 fill-current" />
                              </div>
                              {app.modType && (
                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider ml-1 truncate max-w-[80px] inline-block">
                                  {app.modType}
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ));
                })()}
              </Carousel>
            </div>
          </section>
        )}

        {appsList.length > 0 && (
          <section className="mt-12 md:mt-16 mb-8">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="flex items-end justify-between mb-5 border-b border-black/5 dark:border-white/10 pb-3">
                <div>
                  <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-red-600 dark:text-red-500" />
                    Aplicaciones
                  </h2>
                  <p className="text-[13px] text-gray-500 dark:text-slate-400 mt-1">Explora lo mejor de Aplicaciones</p>
                </div>
                <Link href="/aplicaciones" className="text-[14px] font-bold text-red-600 dark:text-red-500 hover:underline">
                  Ver más
                </Link>
              </div>
              <Carousel cellWidthClass="w-[92%] sm:w-[50%] lg:w-[32%]">
                {(() => {
                  const chunks = [];
                  for (let i = 0; i < appsList.length; i += 3) {
                    chunks.push(appsList.slice(i, i + 3));
                  }
                  return chunks.map((chunk, ci) => (
                    <div key={ci} className="flex flex-col gap-4">
                      {chunk.map((app: any) => (
                        <Link
                          key={app.id}
                          href={`/app/${app.id}`}
                          className="flex items-center gap-3 py-3 border-b border-black/5 dark:border-white/5 last:border-0 group cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 -mx-2 px-2 rounded-xl"
                        >
                          <div className="relative w-[60px] h-[60px] rounded-[16px] overflow-hidden shrink-0 shadow-sm border border-black/5 dark:border-white/10 bg-gray-50 dark:bg-gray-700">
                            <img src={app.iconUrl} className="w-full h-full object-cover" alt={app.title} />
                            <BadgeOverlay badgeType={app.badgeType} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-bold text-[15px] text-gray-900 dark:text-white block truncate leading-tight group-hover:text-red-600 dark:group-hover:text-red-500 transition-all">
                              {app.title}
                            </h3>
                            <p className="text-[13px] text-gray-500 dark:text-slate-400 mt-[2px] line-clamp-1">
                              {app.category}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center gap-0.5 text-[11px] text-gray-500 font-medium">
                                {app.rating.toFixed(1)} <Star className="w-3 h-3 text-gray-400 fill-current" />
                              </div>
                              {app.modType && (
                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider ml-1 truncate max-w-[80px] inline-block">
                                  {app.modType}
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ));
                })()}
              </Carousel>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
