"use client";

import React from "react";
import Link from "next/link";
import { Gamepad, LayoutDashboard, Puzzle, ShieldCheck } from "lucide-react";

export function Footer() {
  const [isSeoExpanded, setIsSeoExpanded] = React.useState(false);

  return (
    <footer className="w-full bg-white dark:bg-[#070b13] border-t border-black/5 dark:border-white/5 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 pt-10 md:pt-14 pb-10">

        {/* SEO Expandable Box */}
        <div className="bg-slate-50 dark:bg-[#0f172a]/30 border border-slate-200/50 dark:border-white/5 p-5 md:p-8 rounded-[24px] mb-6 shadow-sm">
          <h3 className="text-[17px] md:text-xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
            Juegos y Aplicaciones para Android | Descargas Seguras y Actualizadas
          </h3>
          <div className="relative">
            <div className={`text-[13px] md:text-[14px] text-gray-500 dark:text-slate-450 leading-relaxed transition-all duration-300 space-y-3.5 ${!isSeoExpanded ? "line-clamp-3 md:line-clamp-2" : ""}`}>
              <p>
                Encuentra los mejores juegos y aplicaciones para Android con información detallada, novedades y guías de instalación paso a paso. Contenido actualizado, recomendaciones y análisis para que disfrutes de tus apps favoritas de forma segura. En nuestro portal nos enfocamos en ofrecer un catálogo revisado y seleccionado, destacando aquellas aplicaciones móviles y juegos que ofrecen la mejor experiencia de usuario. Descubre los títulos más populares, aplicaciones de Productividad, Redes Sociales, personalización y muchísimo más, diseñadas para potenciar al máximo el rendimiento de tu teléfono y tablet. Mantente siempre a la vanguardia descargando los últimos parches y versiones premium directamente a tu dispositivo móvil. Las descargas vienen respaldadas por nuestra comunidad para garantizar una instalación fácil, rápida y libre de malware. Explora nuestra amplia selección y lleva tu Android al siguiente nivel.
              </p>
              {isSeoExpanded && (
                <p className="border-t border-slate-200/30 dark:border-white/5 pt-3">
                  En <strong>AKDESCARGAS</strong> nos esforzamos por ser tu fuente de confianza para descargar <strong>APK gratis</strong> y <strong>APK MOD</strong> de forma totalmente segura. Nuestro catálogo incluye los mejores <strong>juegos hackeados</strong> con dinero ilimitado, aplicaciones premium desbloqueadas sin anuncios y herramientas optimizadas para tu móvil Android. Cada archivo es analizado meticulosamente para garantizar descargas libres de virus o malware. Si buscas las últimas versiones de tus redes sociales favoritas, editores de video premium o juegos de estrategia populares, aquí encontrarás guías de instalación y enlaces rápidos y estables. Explora y descarga de forma fácil y segura.
                </p>
              )}
            </div>
            <div
              role="button"
              tabIndex={0}
              onClick={() => setIsSeoExpanded(prev => !prev)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsSeoExpanded(prev => !prev);
                }
              }}
              className="mt-3 text-[13px] font-bold text-[#DC2626] hover:text-red-600 transition-colors cursor-pointer inline-block focus:outline-none select-none"
            >
              {isSeoExpanded ? "Leer menos" : "Leer más"}
            </div>
          </div>
        </div>

        {/* Telegram Banner */}
        <a
          href="https://t.me/+e4Wx4s_d0ag1MjQx"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 md:py-6 md:px-8 bg-gradient-to-r from-[#00A2FF] to-[#0088CC] rounded-[24px] mb-10 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group no-underline text-white"
        >
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className="text-white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.94-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.78-1.16 3.35-1.36 3.73-1.37.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .28z" />
              </svg>
            </div>
            <div className="text-left leading-snug">
              <h4 className="text-[17px] md:text-xl font-bold tracking-tight text-white">Nuestro Telegram</h4>
              <p className="text-[12px] md:text-sm text-white/80 mt-0.5">Mantente al día con las últimas novedades y actualizaciones</p>
            </div>
          </div>
          <span className="w-full sm:w-auto text-center bg-white text-[#0088CC] px-6 py-2.5 rounded-full font-bold text-sm hover:bg-slate-50 transition-all active:scale-95 shadow-sm block sm:inline-block shrink-0">
            Unirse ahora
          </span>
        </a>

        {/* Divider */}
        <div className="border-t border-black/5 dark:border-white/5 my-8 md:my-10" />

        {/* Footer Bottom Strip */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 py-2">
          {/* Left Side Links */}
          <div className="flex items-center gap-6 text-[14px] font-medium text-gray-500 dark:text-slate-400">
            <Link href="/contacto" className="hover:text-red-500 transition-colors">
              Contacto
            </Link>
            <Link href="/dmca" className="hover:text-red-500 transition-colors">
              DMCA
            </Link>
            <Link href="/privacidad" className="hover:text-red-500 transition-colors">
              Política de privacidad
            </Link>
          </div>

          {/* Right Side: Logo, Copyright & Scroll Button */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain drop-shadow-md" />
              <p className="text-[13px] text-gray-500 dark:text-slate-400">
                Todos los derechos reservados por <span className="font-bold text-gray-800 dark:text-slate-200 uppercase">AKDESCARGAS.STORE</span>
              </p>
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center text-gray-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none cursor-pointer border border-black/5 dark:border-white/5 active:scale-95 shadow-sm"
              aria-label="Volver arriba"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m18 15-6-6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
