"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAppBySlug, getSuggestions } from "@/lib/db";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ExpandableDescription } from "@/components/ExpandableDescription";
import {
  CheckCircle2,
  HardDrive,
  Star,
  UserPlus,
  LayoutGrid,
  Zap,
  Hash,
  Users,
  Monitor,
  ChevronRight,
  Info,
  ShieldCheck,
  ChevronDown,
  Download,
  Package,
  Cpu,
  MessageSquare,
  ArrowRight,
  AlertTriangle,
  Calendar,
  Loader2,
} from "lucide-react";
import { BadgeOverlay } from "@/components/BadgeOverlay";
import { AppTags } from "@/components/AppTags";
import { ReviewForm } from "@/components/ReviewForm";

function generateReviewCount(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return (Math.abs(hash) % 490000) + 12000;
}

function formatDate(dateString: string) {
  if (!dateString) return "Desconocido";
  const d = new Date(dateString);
  return d.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

export default function ClientAppDetail({ id }: { id: string }) {
  const [appData, setAppData] = useState<any>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getAppBySlug(id);
        if (data) {
          setAppData(data);
          const suggs = await getSuggestions(id, 4);
          setSuggestions(suggs);
        }
      } catch (error) {
        console.error(error);
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
        <div className="min-h-screen bg-gray-50/50 dark:bg-[#0a0f1c]">
          <main className="w-full max-w-7xl mx-auto min-h-screen bg-white dark:bg-transparent pb-10 md:pt-8 flex-1">
            <div className="lg:flex lg:gap-10 lg:px-5">
              <div className="lg:flex-1 lg:min-w-0">
                <header className="px-5 lg:px-0 pt-6 md:pt-0 pb-4">
                  <div className="h-4 w-48 bg-gray-200 dark:bg-slate-800/80 rounded animate-pulse mb-6"></div>
                  <div className="flex gap-4 md:gap-6 items-center">
                    <div className="w-[100px] h-[100px] md:w-[130px] md:h-[130px] bg-gray-200 dark:bg-slate-800/80 rounded-[22%] animate-pulse border border-gray-100 dark:border-white/5 shrink-0"></div>
                    <div className="flex-1">
                      <div className="h-8 md:h-10 w-3/4 bg-gray-200 dark:bg-slate-800/80 rounded-lg animate-pulse mb-3"></div>
                      <div className="h-4 md:h-5 w-1/3 bg-gray-200 dark:bg-slate-800/80 rounded md:rounded-md animate-pulse mb-2"></div>
                      <div className="h-4 w-2/3 bg-gray-200 dark:bg-slate-800/80 rounded md:rounded-md animate-pulse"></div>
                    </div>
                  </div>
                  <div className="mt-5 md:mt-6 flex gap-3">
                    <div className="h-9 md:h-10 w-28 md:w-32 bg-gray-200 dark:bg-slate-800/80 rounded-full animate-pulse border border-gray-100 dark:border-white/5"></div>
                    <div className="h-9 md:h-10 w-28 md:w-32 bg-gray-200 dark:bg-slate-800/80 rounded-full animate-pulse border border-gray-100 dark:border-white/5"></div>
                  </div>
                </header>
                <div className="mx-5 lg:mx-0 h-24 md:h-28 bg-gray-200 dark:bg-slate-800/80 rounded-2xl animate-pulse mt-3 md:mt-4 border border-gray-100 dark:border-white/5"></div>
                <div className="mx-5 lg:mx-0 h-40 md:h-48 bg-gray-200 dark:bg-slate-800/80 rounded-2xl animate-pulse mt-6 md:mt-8 border border-gray-100 dark:border-white/5"></div>
              </div>
              <div className="hidden lg:block lg:w-[320px] xl:w-[350px] lg:shrink-0 mt-8 lg:mt-0">
                 <div className="h-8 w-40 bg-gray-200 dark:bg-slate-800/80 rounded-lg animate-pulse mb-6"></div>
                 <div className="space-y-4">
                   {[1, 2, 3, 4].map(i => (
                     <div key={i} className="flex gap-4 bg-gray-200 dark:bg-slate-800/80 p-4 rounded-2xl animate-pulse border border-gray-100 dark:border-white/5 h-[90px]"></div>
                   ))}
                 </div>
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </>
    );
  }

  if (!appData) {
    return (
      <>
        <Header />
        <main className="flex-1 pb-16 pt-12 flex justify-center items-center min-h-[60vh]">
          <h2 className="text-xl font-bold">App no encontrada</h2>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50/50 dark:bg-[#0a0f1c] text-slate-900 dark:text-slate-100 antialiased selection:bg-blue-500 selection:text-white flex flex-col">
        <main className="w-full max-w-7xl mx-auto min-h-screen bg-white dark:bg-transparent pb-10 md:pt-8 flex-1">
          <div className="lg:flex lg:gap-10 lg:px-5">
            <div className="lg:flex-1 lg:min-w-0">
              <header className="px-5 lg:px-0 pt-6 md:pt-0 pb-4">
                <nav aria-label="breadcrumb" className="flex flex-wrap items-center text-[13px] md:text-[14px] text-gray-400 dark:text-slate-500 font-medium mb-6">
                  <Link href="/" className="hover:text-red-500 cursor-pointer transition-colors">Inicio</Link>
                  <span className="mx-1.5 text-gray-300 dark:text-slate-600">/</span>
                  <Link href={appData.category === "Juegos" ? "/juegos" : "/aplicaciones"} className="hover:text-red-500 cursor-pointer transition-colors">{appData.category}</Link>
                  <span className="mx-1.5 text-gray-300 dark:text-slate-600">/</span>
                  <span className="text-red-500 font-semibold truncate max-w-[150px] sm:max-w-none">{appData.title}</span>
                </nav>

                <div className="flex gap-4 md:gap-6 items-center">
                  <div className="relative min-w-[100px] w-[100px] h-[100px] md:min-w-[130px] md:w-[130px] md:h-[130px] bg-[#DC2626] rounded-[22%] overflow-hidden flex items-center justify-center shrink-0 shadow-md">
                    <img src={appData.iconUrl} alt={appData.title} className="w-full h-full object-cover rounded-[22%]" />
                    <BadgeOverlay badgeType={appData.badgeType} />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h1 className="text-[23px] md:text-3xl lg:text-4xl xl:text-[40px] font-bold leading-tight text-gray-900 dark:text-white tracking-tight mb-1">
                      {appData.title}
                    </h1>
                    <div className="flex flex-col gap-0.5 mt-0.5 md:mt-1">
                      <span className="text-[14px] md:text-[16px] text-[#DC2626] font-medium tracking-tight">
                        {appData.publisher}
                      </span>
                      <div className="flex flex-wrap items-center gap-2 text-[13px] md:text-[15px] text-gray-500 dark:text-slate-400 mt-0.5 md:mt-1">
                        <span>{appData.category}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-slate-600"></span>
                        <span className="flex items-center gap-1.5">
                          <HardDrive className="w-3.5 h-3.5 opacity-70" />
                          {appData.size}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-slate-600"></span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 opacity-70" />
                          Actualizado el {formatDate(appData.updatedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 md:mt-6 flex flex-wrap items-center justify-start gap-3">
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <span className="flex items-center gap-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-2.5 md:px-3 py-1.5 md:py-2 rounded-full text-[11px] md:text-[12px] font-bold border border-green-100 dark:border-green-500/20">
                      <CheckCircle2 className="w-3 h-3 md:w-3.5 md:h-3.5" /> Verificado
                    </span>
                    <span className="bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 px-2.5 md:px-3 py-1.5 md:py-2 rounded-full text-[11px] md:text-[12px] font-bold border border-purple-100 dark:border-purple-500/20">
                      v{appData.version}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 md:gap-4">
                    <a href="#download" className="flex items-center justify-center bg-[#DC2626] hover:bg-red-600 text-white px-8 md:px-10 h-[36px] md:h-[40px] rounded-full font-bold text-[15px] md:text-[16px] shadow-sm active:scale-95 transition-all outline-none cursor-pointer">
                      Obtener
                    </a>
                    <a href="https://t.me/+e4Wx4s_d0ag1MjQx" target="_blank" rel="noopener noreferrer" className="flex items-center bg-[#0088cc] hover:bg-[#0077b3] text-white pl-1.5 pr-4 h-[36px] md:h-[40px] rounded-full font-black text-[13px] md:text-[14px] shadow-sm active:scale-95 transition-all outline-none gap-2 cursor-pointer uppercase tracking-wider">
                      <div className="w-6 h-6 md:w-7 md:h-7 bg-white rounded-full flex items-center justify-center shrink-0">
                        <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#0088cc] ml-[-2px]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.665 3.316l-18.06 6.963c-1.335.536-1.328 1.282-.246 1.614l4.636 1.447 10.72-6.758c.505-.308.97-.142.593.193l-8.685 7.842-3.35 10.638c1.173 0 1.547-.53 2.146-1.114l3.14-3.05 6.536 4.828c1.204.664 2.07.322 2.373-1.11l4.298-20.25c.427-1.684-.633-2.443-2.096-1.883z"/>
                        </svg>
                      </div>
                      TELEGRAM
                    </a>
                  </div>
                </div>
              </header>

              <section className="mx-5 lg:mx-0 py-4 md:py-5 px-3 md:px-6 bg-gray-50 dark:bg-slate-800/80 rounded-2xl mt-2 md:mt-4 border border-gray-100 dark:border-white/5">
                <div className="flex items-stretch gap-4 overflow-x-auto pb-2 md:pb-3 custom-scrollbar">
                  <div className="w-[125px] min-w-[125px] max-w-[125px] px-1 shrink-0 flex flex-col items-center justify-start text-center overflow-hidden">
                    <div className="flex items-center justify-center gap-1 text-yellow-400 mb-2 w-full">
                      <Star className="w-4 h-4 fill-current shrink-0" />
                      <span className="text-[10px] text-gray-400 dark:text-slate-500 font-bold uppercase truncate">Calif.</span>
                    </div>
                    <p className="text-[15px] font-bold text-gray-800 dark:text-slate-200 leading-tight truncate w-full mt-auto">{appData.rating}</p>
                  </div>
                  <div className="w-px bg-gray-200 dark:bg-slate-700 shrink-0"></div>
                  <div className="w-[125px] min-w-[125px] max-w-[125px] px-1 shrink-0 flex flex-col items-center justify-start text-center overflow-hidden">
                    <div className="flex items-center justify-center gap-1 text-green-400 mb-2 w-full">
                      <UserPlus className="w-4 h-4 shrink-0" />
                      <span className="text-[10px] text-gray-400 dark:text-slate-500 font-bold uppercase truncate">Edad</span>
                    </div>
                    <p className="text-[15px] font-bold text-gray-800 dark:text-slate-200 leading-tight truncate w-full mt-auto">{appData.ageRating}</p>
                  </div>
                  <div className="w-px bg-gray-200 dark:bg-slate-700 shrink-0"></div>
                  <div className="w-[125px] min-w-[125px] max-w-[125px] px-1 shrink-0 flex flex-col items-center justify-start text-center overflow-hidden">
                    <div className="flex items-center justify-center gap-1 text-violet-400 mb-2 w-full">
                      <LayoutGrid className="w-4 h-4 shrink-0" />
                      <span className="text-[10px] text-gray-400 dark:text-slate-500 font-bold uppercase truncate">Categoría</span>
                    </div>
                    <p className="text-[15px] font-bold text-gray-800 dark:text-slate-200 leading-tight truncate w-full mt-auto">{appData.category}</p>
                  </div>
                  <div className="w-px bg-gray-200 dark:bg-slate-700 shrink-0"></div>
                  {appData.modType && (
                    <>
                      <div className="w-[125px] min-w-[125px] max-w-[125px] px-1 shrink-0 flex flex-col items-center justify-start text-center overflow-hidden">
                        <div className="flex items-center justify-center gap-1 text-purple-500 mb-2 w-full">
                          <Zap className="w-4 h-4 shrink-0" />
                          <span className="text-[10px] text-gray-400 dark:text-slate-500 font-bold uppercase truncate">MOD</span>
                        </div>
                        <p className="text-[15px] font-bold text-gray-800 dark:text-slate-200 leading-tight truncate w-full mt-auto">{appData.modType}</p>
                      </div>
                      <div className="w-px bg-gray-200 dark:bg-slate-700 shrink-0"></div>
                    </>
                  )}
                  <div className="w-[125px] min-w-[125px] max-w-[125px] px-1 shrink-0 flex flex-col items-center justify-start text-center overflow-hidden">
                    <div className="flex items-center justify-center gap-1 text-red-400 mb-2 w-full">
                      <Hash className="w-4 h-4 shrink-0" />
                      <span className="text-[10px] text-gray-400 dark:text-slate-500 font-bold uppercase truncate">Versión</span>
                    </div>
                    <p className="text-[15px] font-bold text-gray-800 dark:text-slate-200 leading-tight truncate w-full mt-auto">{appData.version}</p>
                  </div>
                  <div className="w-px bg-gray-200 dark:bg-slate-700 shrink-0"></div>
                  <div className="w-[125px] min-w-[125px] max-w-[125px] px-1 shrink-0 flex flex-col items-center justify-start text-center overflow-hidden">
                    <div className="flex items-center justify-center gap-1 text-orange-400 mb-2 w-full">
                      <HardDrive className="w-4 h-4 shrink-0" />
                      <span className="text-[10px] text-gray-400 dark:text-slate-500 font-bold uppercase truncate">Tamaño</span>
                    </div>
                    <p className="text-[15px] font-bold text-gray-800 dark:text-slate-200 leading-tight truncate w-full mt-auto">{appData.size}</p>
                  </div>
                  <div className="w-px bg-gray-200 dark:bg-slate-700 shrink-0"></div>
                  <div className="w-[125px] min-w-[125px] max-w-[125px] px-1 shrink-0 flex flex-col items-center justify-start text-center overflow-hidden">
                    <div className="flex items-center justify-center gap-1 text-red-500 mb-2 w-full">
                      <Users className="w-4 h-4 shrink-0" />
                      <span className="text-[10px] text-gray-400 dark:text-slate-500 font-bold uppercase truncate">Creador</span>
                    </div>
                    <p className="text-[15px] font-bold text-gray-800 dark:text-slate-200 leading-tight truncate w-full mt-auto">{appData.publisher}</p>
                  </div>
                  <div className="w-px bg-gray-200 dark:bg-slate-700 shrink-0"></div>
                  <div className="w-[125px] min-w-[125px] max-w-[125px] px-1 shrink-0 flex flex-col items-center justify-start text-center overflow-hidden">
                    <div className="flex items-center justify-center gap-1 text-red-500 mb-2 w-full">
                      <Monitor className="w-4 h-4 shrink-0" />
                      <span className="text-[10px] text-gray-400 dark:text-slate-500 font-bold uppercase truncate">Sistema</span>
                    </div>
                    <p className="text-[15px] font-bold text-gray-800 dark:text-slate-200 leading-tight truncate w-full mt-auto">ANDROID</p>
                  </div>
                </div>
              </section>

              {appData.screenshots && appData.screenshots.length > 0 && (
                <section className="mx-5 lg:mx-0 mt-8 relative group">
                  <div className="flex overflow-x-auto gap-4 pb-4 snap-x custom-scrollbar">
                    {appData.screenshots.map((img: string, i: number) => (
                      <div key={i} className="relative h-[260px] sm:h-[350px] md:h-[380px] w-[146px] sm:w-[197px] md:w-[214px] rounded-2xl overflow-hidden shadow-md flex-shrink-0 hover:scale-[1.02] hover:shadow-xl transition-all duration-300 ease-out cursor-pointer">
                        <img src={img} alt="Screenshot" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section className="mx-5 lg:mx-0 mt-6 md:mt-8 bg-red-50/50 dark:bg-red-900/10 rounded-2xl p-5 md:p-8 relative border border-red-100 dark:border-red-500/20 shadow-sm group transition-colors">
                <div className="flex items-center gap-3 md:gap-4 relative z-10 mb-3 md:mb-4">
                  <div className="p-2.5 md:p-3 bg-[#DC2626] rounded-xl shadow-md shrink-0">
                    <Info className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-[17px] md:text-[20px] text-gray-900 dark:text-white">Acerca de {appData.title}</h4>
                </div>
                <div className="relative z-10">
                  <ExpandableDescription description={appData.description} />
                </div>
                <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 opacity-[0.06] pointer-events-none group-hover:scale-110 transition-transform duration-500 overflow-hidden rounded-2xl">
                  <ShieldCheck className="w-24 h-24 md:w-32 md:h-32 text-red-900" />
                </div>
              </section>

              {appData.downloadLinks && appData.downloadLinks.length > 0 && (
                <section id="download" className="mx-5 lg:mx-0 mt-4 md:mt-8 bg-red-50 dark:bg-red-900/20 lg:bg-white dark:bg-[#0f172a] rounded-2xl p-4 md:p-6 border border-red-100 dark:border-red-500/20 lg:border-gray-200 dark:border-white/10 lg:shadow-sm hover:border-red-200 transition-colors">
                  <div className="mb-3 md:mb-5">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="hidden lg:flex p-2 bg-red-100 dark:bg-red-900/40 rounded-lg">
                        <Download className="w-5 h-5 text-[#DC2626]" />
                      </div>
                      <Download className="w-5 h-5 md:w-6 md:h-6 text-[#DC2626] lg:hidden" />
                      <h4 className="font-bold text-[14px] md:text-[18px] leading-tight text-gray-900 dark:text-white">{appData.title}</h4>
                    </div>
                    {appData.modType && (
                      <p className="text-[9px] md:text-[12px] text-purple-600 dark:text-purple-400 font-bold mt-1.5 md:mt-2 uppercase tracking-wider bg-purple-100 dark:bg-purple-900/30 lg:bg-purple-50 dark:bg-purple-900/20 inline-block px-2 md:px-3 text-center py-0.5 md:py-1 rounded-full">
                        {appData.modType}
                      </p>
                    )}
                  </div>

                  <div className="bg-black/5 dark:bg-slate-800/60 rounded-xl md:rounded-2xl p-2 md:p-5 border border-black/5 dark:border-white/5 space-y-2 md:space-y-3">
                    {appData.downloadLinks.map((link: any, i: number) => (
                      <Link
                        key={i}
                        href={`/app/${appData.id}/download/${i}`}
                        className="flex items-center justify-between gap-2.5 md:gap-3 bg-white dark:bg-[#0f172a] p-2.5 md:p-4 rounded-lg md:rounded-xl border border-white/50 md:border-gray-100 lg:border-white/10 shadow-sm md:shadow-none hover:border-red-300 dark:hover:border-red-500/50 transition-colors group cursor-pointer"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4 md:w-5 md:h-5 text-gray-400 dark:text-slate-500 group-hover:text-red-500 shrink-0" />
                            <h5 className="text-[13px] md:text-[15px] font-bold text-gray-900 dark:text-white truncate">{link.name}</h5>
                          </div>
                          {link.description && (
                            <p className="text-[10px] md:text-[12px] text-gray-500 dark:text-slate-400 line-clamp-1 mt-0.5 ml-6 md:ml-7">{link.description}</p>
                          )}
                        </div>
                        <div className="flex items-center justify-end gap-2 md:gap-4 shrink-0">
                          {link.size && (
                            <span className="text-[11px] md:text-[12px] font-bold text-gray-500 dark:text-slate-400 md:bg-gray-100 md:dark:bg-slate-800 px-1 md:px-2.5 py-0.5 md:py-1 rounded-md">{link.size}</span>
                          )}
                          <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#DC2626]/10 text-[#DC2626] flex items-center justify-center group-hover:bg-[#DC2626] group-hover:text-white transition-colors">
                            <Download className="w-3.5 h-3.5 md:w-4 md:h-4" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {appData.modInfo && appData.modInfo.length > 0 && (
                    <div className="mt-3 md:mt-4 bg-purple-50/50 dark:bg-purple-900/10 rounded-xl p-3 md:p-4 border border-purple-100 dark:border-purple-500/20">
                      <h5 className="text-[12px] md:text-[13px] font-bold text-purple-900 dark:text-purple-300 flex items-center gap-1.5 mb-1 md:mb-1.5">
                        <Cpu className="w-3.5 h-3.5 md:w-4 md:h-4" /> MOD info:
                      </h5>
                      <div className="text-[11px] md:text-[12px] leading-relaxed space-y-1.5">
                        {appData.modInfo.map((info: string, i: number) => {
                          const isNota = info.trim().toUpperCase().startsWith("NOTA");
                          if (isNota) {
                            return (
                              <p key={i} className="text-[#DC2626] dark:text-red-400 font-bold bg-red-100/50 dark:bg-red-900/20 p-2 md:p-2.5 rounded-lg border border-red-200 dark:border-red-500/20 mt-2 mb-1 flex items-start gap-1.5">
                                <AlertTriangle className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0 mt-0.5" />
                                <span>{info}</span>
                              </p>
                            );
                          }
                          return (
                            <p key={i} className="text-gray-600 dark:text-slate-400">✿ {info}</p>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {appData.installationInstructions && (
                    <div className="mt-3 md:mt-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-xl p-3 md:p-4 border border-blue-100 dark:border-blue-500/20">
                      <h5 className="text-[12px] md:text-[13px] font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5 mb-1 md:mb-1.5">
                        <Info className="w-3.5 h-3.5 md:w-4 md:h-4" /> Instrucciones de Instalación:
                      </h5>
                      <div className="text-[11px] md:text-[12px] text-gray-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">
                        {appData.installationInstructions}
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex justify-center">
                    <a
                      href="https://t.me/+e4Wx4s_d0ag1MjQx"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[12px] md:text-[13px] font-bold text-gray-400 hover:text-red-500 flex items-center gap-1.5 transition-colors group"
                    >
                      <AlertTriangle className="w-3.5 h-3.5 group-hover:animate-pulse" />
                      ¿Enlace caído o desactualizado? Repórtalo aquí
                    </a>
                  </div>
                </section>
              )}

              <AppTags title={appData.title} category={appData.category} />

            </div>

            {suggestions.length > 0 && (
              <div className="hidden lg:flex lg:w-[320px] xl:w-[350px] lg:shrink-0 lg:flex-col lg:gap-8">
                <section className="mt-8 lg:mt-0">
                  <div className="flex items-center justify-between mb-5 md:mb-6">
                    <h3 className="text-[19px] md:text-[22px] font-bold text-gray-900 dark:text-white">Sugerencias</h3>
                  </div>
                  <div className="space-y-4">
                    {suggestions.map((s) => (
                      <Link key={s.id} href={`/app/${s.id}`} className="flex items-center gap-4 bg-gray-50 dark:bg-slate-800/80 hover:bg-gray-100 dark:hover:bg-slate-800 p-3 md:p-4 rounded-2xl border border-gray-100 dark:border-white/5 transition-colors group cursor-pointer">
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden shadow-sm group-hover:shadow transition-shadow">
                          <img src={s.iconUrl} className="w-full h-full object-cover" alt={s.title} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[15px] md:text-[16px] font-bold text-gray-900 dark:text-white truncate">{s.title}</h4>
                          <p className="text-[12px] md:text-[13px] text-gray-500 dark:text-slate-400 truncate">v{s.version}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
