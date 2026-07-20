"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { Pagination } from "@/components/Pagination";

interface AppItem {
  id: string;
  title: string;
  publisher: string;
  rating: number;
  modType: string;
  iconUrl: string;
  bannerUrl: string;
  subcategory: string;
  featured: boolean;
  size?: string;
}

const GAME_SUBCATEGORIES = [
  "Acción",
  "Arcade",
  "Aventura",
  "Carreras",
  "Casual",
  "Deporte",
  "Estrategia",
  "Horror",
  "Juegos de rol",
  "Música",
  "Paid",
  "Puzzle",
  "Simulación",
  "Supervivencia",
  "Terror",
];

const APP_SUBCATEGORIES = [
  "Aplicaciones de vídeo",
  "Arte y Diseño",
  "Cómics",
  "Comunicación",
  "Edición",
  "Educación",
  "Empresa",
  "Entretenimiento",
  "Estilo de vida",
  "Fotografía",
  "Herramientas",
  "Mapas y navegación",
  "Música y audio",
  "Películas",
  "Personalización",
  "Productividad",
  "Salud y bienestar",
  "Ser padres",
  "Social",
  "Televisión",
  "Tiempo",
  "Tools",
  "Viajes y guías",
];

interface CategoryFilterProps {
  apps: AppItem[];
  type: "juegos" | "aplicaciones";
  children?: React.ReactNode;
}

function normalizeSubcategory(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "")
    .trim();
}

export function CategoryFilter({ apps, type, children }: CategoryFilterProps) {
  const [active, setActive] = useState("Todos");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;
  const scrollRef = useRef<HTMLDivElement>(null);

  const allSubcategories = type === "juegos" ? GAME_SUBCATEGORIES : APP_SUBCATEGORIES;
  const label = type === "juegos" ? "Juegos" : "Aplicaciones";

  const filtered =
    active === "Todos"
      ? apps
      : apps.filter((app) => normalizeSubcategory(app.subcategory) === normalizeSubcategory(active));

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const visibleApps = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const pills = ["Todos", ...allSubcategories];

  return (
    <>
      {/* Sticky filter bar */}
      <section className="py-4 border-b border-slate-100 dark:border-white/5 sticky top-0 md:top-14 bg-white/80 dark:bg-[#0a0f1c]/80 backdrop-blur-md z-40">
        <div className="max-w-7xl mx-auto pl-4 sm:pl-6 md:pl-8">
          <div
            ref={scrollRef}
            className="flex gap-3 md:gap-5 overflow-x-auto custom-scrollbar pb-2"
          >
            {pills.map((pill) => (
              <button
                key={pill}
                onClick={() => {
                  setActive(pill);
                  setCurrentPage(1);
                }}
                className={`shrink-0 px-6 py-2 rounded-full font-bold text-sm transition-all active:scale-95 cursor-pointer ${
                  active === pill
                    ? "bg-red-600 text-white shadow-md shadow-red-500/20"
                    : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200"
                }`}
              >
                {pill}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Render children (featured/recent carousels) ONLY when "Todos" is active */}
      {active === "Todos" && children}

      {/* Full Grid / List of Apps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-10">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <span className="w-1.5 h-7 bg-red-600 rounded-full"></span>
            {active === "Todos" ? `Todos los ${label}` : active}
            <span className="text-base font-medium text-gray-400 ml-1">
              ({filtered.length})
            </span>
          </h2>
        </div>

        {visibleApps.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {visibleApps.map((app) => (
                <Link
                  key={app.id}
                  href={`/app/${app.id}`}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800/50 rounded-2xl border border-black/5 dark:border-white/10 hover:shadow-md dark:hover:bg-slate-800 hover:border-red-200 dark:hover:border-red-500/30 transition-all duration-200 group"
                >
                  {/* Icon */}
                  <div className="relative w-[72px] h-[72px] rounded-2xl overflow-hidden shrink-0 shadow-sm border border-black/5 dark:border-white/10 bg-gray-50 dark:bg-gray-700">
                    <img
                      src={
                        app.iconUrl ||
                        `https://picsum.photos/seed/${app.id}/150/150`
                      }
                      alt={app.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-[16px] text-gray-900 dark:text-white truncate leading-tight group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                      {app.title}
                    </h3>
                    <p className="text-[13px] text-gray-500 dark:text-slate-400 mt-1 truncate">
                      {app.subcategory || (type === "juegos" ? "Juegos" : "Aplicaciones")}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="inline-flex items-center gap-1 text-[12px] font-medium text-gray-600 dark:text-slate-300">
                        {app.rating.toFixed(1)}
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                      </span>
                      {app.size && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                          <span className="text-[12px] text-gray-500 dark:text-slate-400 font-medium truncate">
                            {app.size}
                          </span>
                        </>
                      )}
                      {app.modType && (
                        <>
                          <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                          <span className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider bg-red-50 dark:bg-red-500/10 px-2 py-0.5 rounded-full">
                            {app.modType}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Obtener Button */}
                  <button className="shrink-0 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-red-600 dark:text-red-400 px-5 py-2 rounded-full font-bold text-[13px] transition-colors ml-2 hidden sm:block">
                    Obtener
                  </button>
                </Link>
              ))}
            </div>
            {/* Pagination */}
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: window.innerWidth < 768 ? 400 : 500, behavior: "smooth" });
              }}
            />
          </>
        ) : (
          <div className="text-center py-16 bg-slate-50 dark:bg-slate-800/20 border border-gray-100 dark:border-white/5 rounded-3xl">
            <p className="text-gray-500 dark:text-slate-400 text-sm">
              No hay {type} en la categoría <strong>{active}</strong>.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
