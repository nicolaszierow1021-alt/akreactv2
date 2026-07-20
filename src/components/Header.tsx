"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Search, Sun, Moon, Menu, X, Gamepad, LayoutDashboard, Puzzle, Rocket } from "lucide-react";

export function Header() {
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [scrolled, setScrolled] = React.useState(false);
  const [isAnnouncementVisible, setIsAnnouncementVisible] = React.useState(false);

  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
    if (!localStorage.getItem("announcement_dismissed")) {
      setIsAnnouncementVisible(true);
    }
  }, []);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dismissAnnouncement = () => {
    setIsAnnouncementVisible(false);
    localStorage.setItem("announcement_dismissed", "true");
  };

  return (
    <>
      {/* Floating pill wrapper — fixed, centered, with horizontal padding */}
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center px-3 pt-3 md:px-6 md:pt-4 pointer-events-none gap-2 md:gap-3">
        


        <header
          className={`
            pointer-events-auto w-full max-w-4xl relative
            rounded-2xl md:rounded-full
            transition-all duration-300 ease-in-out
            ${scrolled
              ? "bg-white/80 dark:bg-[#0a0f1c]/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-black/8 dark:border-white/10"
              : "bg-white/60 dark:bg-[#0a0f1c]/60 backdrop-blur-xl shadow-[0_4px_16px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)] border border-black/5 dark:border-white/8"
            }
          `}
        >
          <div className="relative h-12 md:h-13 flex items-center px-3 md:px-4 gap-2">

            {/* ── Logo + Mobile Hamburger ── */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden w-8 h-8 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/10 active:scale-90 transition-all duration-150 focus:outline-none cursor-pointer"
              >
                <Menu className="w-5 h-5" />
              </button>

              <Link
                href="/"
                className="hidden md:flex items-center focus:outline-none rounded-full shrink-0"
              >
                <span className="font-black text-[17px] md:text-[18px] tracking-tight bg-gradient-to-r from-red-600 to-violet-600 bg-clip-text text-transparent select-none">
                  AKDESCARGAS
                </span>
              </Link>
            </div>

            {/* ── Mobile Logo (centered) ── */}
            <Link
              href="/"
              className="md:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 focus:outline-none rounded-full"
            >
              <span className="font-black text-[17px] tracking-tight bg-gradient-to-r from-red-600 to-violet-600 bg-clip-text text-transparent select-none">
                AKDESCARGAS
              </span>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden md:flex flex-1 justify-center items-center gap-0.5 text-[14px] font-medium">
              <Link
                href="/juegos"
                className="px-3.5 py-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 whitespace-nowrap transition-all duration-150 active:scale-95 focus:outline-none flex items-center gap-1.5"
              >
                <Gamepad className="w-3.5 h-3.5" /> Juegos
              </Link>
              <Link
                href="/aplicaciones"
                className="px-3.5 py-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 whitespace-nowrap transition-all duration-150 active:scale-95 focus:outline-none flex items-center gap-1.5"
              >
                <LayoutDashboard className="w-3.5 h-3.5" /> Aplicaciones
              </Link>
              <Link
                href="/mas-juegos"
                className="px-3.5 py-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 whitespace-nowrap transition-all duration-150 active:scale-95 focus:outline-none flex items-center gap-1.5"
              >
                <Puzzle className="w-3.5 h-3.5" /> Más juegos
              </Link>
            </nav>

            {/* ── Right Actions ── */}
            <div className="flex items-center gap-1 shrink-0 ml-auto md:ml-0">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/10 active:scale-90 transition-all duration-150 focus:outline-none cursor-pointer"
              >
                <Search className="w-[18px] h-[18px]" />
              </button>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-8 h-8 cursor-pointer rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/10 active:scale-90 transition-all duration-150 focus:outline-none"
              >
                {mounted && theme === "dark" ? (
                  <Moon className="w-[18px] h-[18px] text-indigo-400" />
                ) : (
                  <Sun className="w-[18px] h-[18px] text-amber-500" />
                )}
              </button>
            </div>

            {/* ── Search Overlay (inside pill) ── */}
            <div
              className={`absolute inset-0 px-3 flex items-center rounded-2xl md:rounded-full overflow-hidden transition-all duration-200
                bg-white/95 dark:bg-[#0a0f1c]/95 backdrop-blur-2xl z-10
                ${isSearchOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
              `}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    router.push(`/buscar?s=${encodeURIComponent(searchQuery.trim())}`);
                    setIsSearchOpen(false);
                  }
                }}
                className="w-full flex items-center gap-3"
              >
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar juegos, aplicaciones..."
                  className="flex-1 bg-transparent text-[14px] text-slate-900 dark:text-white outline-none placeholder:text-slate-400 min-w-0"
                  autoFocus={isSearchOpen}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="w-5 h-5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-full flex items-center justify-center text-slate-500 transition-colors shrink-0"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                  className="shrink-0 text-[14px] font-semibold text-red-600 dark:text-red-400 hover:text-red-700 transition-colors bg-transparent border-none p-0 cursor-pointer"
                >
                  Cancelar
                </button>
              </form>
            </div>
          </div>
        </header>

        {/* Announcement Bar */}
        {isAnnouncementVisible && (
          <div className="pointer-events-auto w-full max-w-4xl bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-xl md:rounded-2xl shadow-lg p-2.5 md:px-4 md:py-3 flex items-center justify-between animate-in slide-in-from-top-4 fade-in duration-300">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-2.5 text-[12px] md:text-[14px] leading-tight flex-1 mr-4">
              <div className="flex items-center gap-1.5 shrink-0 bg-white/20 px-2 py-0.5 rounded-full font-bold">
                <Rocket className="w-3.5 h-3.5" />
                <span>NUEVO</span>
              </div>
              <span>
                <strong>¡Bienvenidos a AKDESCARGAS!</strong> Estamos subiendo juegos y apps actualizadas <strong>todos los días</strong>.
              </span>
            </div>
            <button 
              onClick={dismissAnnouncement} 
              className="shrink-0 p-1.5 hover:bg-black/20 rounded-full transition-colors cursor-pointer text-white/90 hover:text-white"
              aria-label="Cerrar anuncio"
            >
              <X className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Spacer to push page content below the floating header */}
      <div className={`transition-all duration-300 ${isAnnouncementVisible ? "h-[120px] md:h-[130px]" : "h-[68px] md:h-[72px]"}`} />

      {/* Mobile Menu Backdrop */}
      <div
        className={`fixed inset-0 bg-slate-900/50 dark:bg-black/60 backdrop-blur-sm z-[100] md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Offcanvas */}
      <div
        className={`fixed top-0 left-0 h-full w-[280px] bg-white dark:bg-[#0f172a] shadow-2xl z-[110] transform transition-transform duration-300 ease-in-out flex flex-col md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-5 py-4 border-b border-gray-100 dark:border-white/10 flex items-center justify-between">
          <span className="font-black text-xl tracking-tight bg-gradient-to-r from-red-600 to-violet-600 bg-clip-text text-transparent">
            AKDESCARGAS
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1 font-medium">
          <Link
            href="/juegos"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-200 text-[15px] transition-colors"
          >
            <Gamepad className="w-5 h-5 text-red-500" /> Juegos
          </Link>
          <Link
            href="/aplicaciones"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-200 text-[15px] transition-colors"
          >
            <LayoutDashboard className="w-5 h-5 text-violet-500" /> Aplicaciones
          </Link>
          <Link
            href="/mas-juegos"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-200 text-[15px] transition-colors"
          >
            <Puzzle className="w-5 h-5 text-indigo-500" /> Más juegos
          </Link>
        </nav>
      </div>
    </>
  );
}
