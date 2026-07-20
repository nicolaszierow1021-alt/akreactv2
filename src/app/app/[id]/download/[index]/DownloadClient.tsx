"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface DownloadLink {
  name: string;
  description: string;
  size: string;
  url: string;
}

interface AppData {
  id: string;
  title: string;
  publisher: string;
  category: string;
  version: string;
  size: string;
  iconUrl: string;
  installationInstructions?: string;
}

interface DownloadClientProps {
  app: AppData;
  downloadLink: DownloadLink;
}

export function DownloadClient({ app, downloadLink }: DownloadClientProps) {
  const totalDuration = 15000; // 15 seconds
  const intervalTime = 100; // update every 100ms
  const [progress, setProgress] = useState(0);
  const [downloadReady, setDownloadReady] = useState(false);

  useEffect(() => {
    if (progress >= 100) {
      setDownloadReady(true);
      return;
    }

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (intervalTime / totalDuration) * 100;
        return next >= 100 ? 100 : next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [progress]);

  const handleDownload = () => {
    if (downloadLink.url) {
      window.open(downloadLink.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="min-h-[85vh] bg-gray-50/50 dark:bg-[#0a0f1c] text-slate-900 dark:text-slate-100 antialiased selection:bg-red-500 selection:text-white py-6 px-4 md:px-0">
      <div className="max-w-7xl mx-auto px-4 flex flex-col gap-6 md:gap-8">
        {/* Navigation Breadcrumbs */}
        <nav className="flex flex-wrap items-center text-[13px] md:text-[14px] text-gray-400 dark:text-slate-500 font-medium">
          <Link href="/" className="hover:text-red-500 cursor-pointer transition-colors">
            Inicio
          </Link>
          <span className="mx-1.5 text-gray-300 dark:text-slate-600">/</span>
          <Link href="/" className="hover:text-red-500 cursor-pointer transition-colors">
            {app.category}
          </Link>
          <span className="mx-1.5 text-gray-300 dark:text-slate-600">/</span>
          <Link href={`/app/${app.id}`} className="hover:text-red-500 cursor-pointer transition-colors">
            {app.title}
          </Link>
          <span className="mx-1.5 text-gray-300 dark:text-slate-600">/</span>
          <span className="text-red-500 font-semibold">Descargar</span>
        </nav>

        {/* Confetti and Success Badge Area */}
        <div className="text-center">
          <style>{`
            @keyframes flickerConfetti {
              0% { transform: scale(0.8) translateY(0); opacity: 0.4; }
              20% { transform: scale(1.5) translateY(-4px); opacity: 1; box-shadow: 0 0 8px currentColor; }
              40% { transform: scale(0.9) translateY(2px); opacity: 0.7; box-shadow: none; }
              60% { transform: scale(1.3) translateY(-2px); opacity: 1; box-shadow: 0 0 6px currentColor; }
              80% { transform: scale(0.95) translateY(1px); opacity: 0.6; box-shadow: none; }
              100% { transform: scale(0.8) translateY(0); opacity: 0.4; }
            }
            .confetti-dot {
              animation: flickerConfetti 2.5s ease-in-out infinite;
            }
          `}</style>
          <div className="relative inline-block">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto shadow-md shadow-red-500/10 backdrop-blur-md bg-red-500/10 border border-white/60">
              <svg className="w-8 h-8 md:w-10 md:h-10 text-red-600 drop-shadow-sm" viewBox="0 0 28 28">
                <path
                  d="M6 14L11 19L22 8"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                ></path>
              </svg>
            </div>
            {/* Confetti Sparkles */}
            <div
              className="absolute -top-1 -right-3 w-2 h-2 bg-yellow-400 text-yellow-400 rounded-full confetti-dot"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="absolute -bottom-1 -left-4 w-1.5 h-1.5 bg-red-400 text-red-400 rounded-full confetti-dot"
              style={{ animationDelay: "0.4s" }}
            ></div>
            <div
              className="absolute top-2 -left-5 w-1 h-1 bg-orange-400 text-orange-400 rounded-full confetti-dot"
              style={{ animationDelay: "0.9s" }}
            ></div>
            <div
              className="absolute top-0 -right-6 w-1 h-1 bg-green-400 text-green-400 rounded-full confetti-dot"
              style={{ animationDelay: "1.5s" }}
            ></div>
          </div>
        </div>

        {/* Title and Subtitle */}
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            ¡Tu <span className="text-red-600">descarga</span> está lista!
          </h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-slate-300 leading-relaxed max-w-lg mx-auto">
            Todo listo para que obtengas{" "}
            <span className="text-red-600 font-medium">{app.title}</span> de forma segura y
            rápida.
          </p>
        </div>

        {/* App Card */}
        <div className="bg-white dark:bg-[#0f172a] rounded-2xl p-3 md:p-6 flex flex-row items-center gap-3 md:gap-6 shadow-sm border border-gray-100 dark:border-white/5 w-full transition hover:shadow-md">
          <div className="w-[72px] h-[72px] sm:w-20 sm:h-20 md:w-24 md:h-24 bg-red-700 rounded-[16px] md:rounded-[22px] flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
            <img src={app.iconUrl} alt={app.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 text-left min-w-0">
            <div className="text-[17px] sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-0.5 md:mb-1 truncate leading-tight">
              {app.title}
            </div>
            <div className="text-[11px] sm:text-sm md:text-base text-gray-500 dark:text-slate-400 mb-1.5 md:mb-3 truncate">
              {downloadLink.description || "Premium"}
            </div>
            <div className="flex flex-wrap justify-start gap-1.5 items-center">
              <span className="bg-green-100 text-green-800 text-[9px] md:text-xs font-semibold px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-full flex items-center gap-1 md:gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#2c8a12"
                  viewBox="0 0 24 24"
                >
                  <path d="m20.42 6.11-7.97-4c-.28-.14-.62-.14-.9 0l-7.97 4c-.31.15-.51.45-.55.79-.01.11-.96 10.77 8.55 15.01a.98.98 0 0 0 .82 0C21.91 17.66 20.97 7 20.95 6.9a.98.98 0 0 0-.55-.79ZM11 15.42l-2.71-2.71L9.7 11.3l1.29 1.29 3.29-3.29 1.41 1.41-4.71 4.71Z"></path>
                </svg>
                Última <span className="hidden sm:inline">versión</span>
              </span>
              <span className="bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400 text-[9px] md:text-xs font-semibold px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-full">
                v{app.version}
              </span>
            </div>
          </div>
          <div className="flex flex-col bg-green-50 dark:bg-green-900/20 rounded-[10px] md:rounded-xl py-3 md:py-4 px-2 text-center justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-green-600 dark:text-green-400"
            >
              <path d="M21.5599 10.7405L20.1999 9.16055C19.9399 8.86055 19.7299 8.30055 19.7299 7.90055V6.20055C19.7299 5.14055 18.8599 4.27055 17.7999 4.27055H16.0999C15.7099 4.27055 15.1399 4.06055 14.8399 3.80055L13.2599 2.44055C12.5699 1.85055 11.4399 1.85055 10.7399 2.44055L9.16988 3.81055C8.86988 4.06055 8.29988 4.27055 7.90988 4.27055H6.17988C5.11988 4.27055 4.24988 5.14055 4.24988 6.20055V7.91055C4.24988 8.30055 4.03988 8.86055 3.78988 9.16055L2.43988 10.7505C1.85988 11.4405 1.85988 12.5605 2.43988 13.2505L3.78988 14.8405C4.03988 15.1405 4.24988 15.7005 4.24988 16.0905V17.8005C4.24988 18.8605 5.11988 19.7305 6.17988 19.7305H7.90988C8.29988 19.7305 8.86988 19.9405 9.16988 20.2005L10.7499 21.5605C11.4399 22.1505 12.5699 22.1505 13.2699 21.5605L14.8499 20.2005C15.1499 19.9405 15.7099 19.7305 16.1099 19.7305H17.8099C18.8699 19.7305 19.7399 18.8605 19.7399 17.8005V16.1005C19.7399 15.7105 19.9499 15.1405 20.2099 14.8405L21.5699 13.2605C22.1499 12.5705 22.1499 11.4305 21.5599 10.7405ZM16.1599 10.1105L11.3299 14.9405C11.1899 15.0805 10.9999 15.1605 10.7999 15.1605C10.5999 15.1605 10.4099 15.0805 10.2699 14.9405L7.84988 12.5205C7.55988 12.2305 7.55988 11.7505 7.84988 11.4605C8.13988 11.1705 8.61988 11.1705 8.90988 11.4605L10.7999 13.3505L15.0999 9.05055C15.3899 8.76055 15.8699 8.76055 16.1599 9.05055C16.4499 9.34055 16.4499 9.82055 16.1599 10.1105Z"></path>
            </svg>
            <span className="text-[11px] md:text-sm font-bold text-green-600 dark:text-green-400 mt-1 md:mt-1.5 leading-tight">
              Verificado
            </span>
          </div>
        </div>

        {/* Info Chips */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-3 md:gap-4 w-full">
          {/* Chip 1: Formato */}
          <div className="bg-white dark:bg-[#0f172a] rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-4 shadow-sm border border-gray-100 dark:border-white/5 flex flex-col md:flex-row items-center text-center md:text-left justify-center md:justify-start gap-1 sm:gap-2 md:gap-4 transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex-shrink-0 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6"
              >
                <path
                  d="M2 9.75C1.59 9.75 1.25 9.41 1.25 9V6.5C1.25 3.6 3.61 1.25 6.5 1.25H9C9.41 1.25 9.75 1.59 9.75 2C9.75 2.41 9.41 2.75 9 2.75H6.5C4.43 2.75 2.75 4.43 2.75 6.5V9C2.75 9.41 2.41 9.75 2 9.75Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M22 9.75C21.59 9.75 21.25 9.41 21.25 9V6.5C21.25 4.43 19.57 2.75 17.5 2.75H15C14.59 2.75 14.25 2.41 14.25 2C14.25 1.59 14.59 1.25 15 1.25H17.5C20.39 1.25 22.75 3.6 22.75 6.5V9C22.75 9.41 22.41 9.75 22 9.75Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M17.5 22.75H16C15.59 22.75 15.25 22.41 15.25 22C15.25 21.59 15.59 21.25 16 21.25H17.5C19.57 21.25 21.25 19.57 21.25 17.5V16C21.25 15.59 21.59 15.25 22 15.25C22.41 15.25 22.75 15.59 22.75 16V17.5C22.75 20.4 20.39 22.75 17.5 22.75Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M9 22.75H6.5C3.61 22.75 1.25 20.4 1.25 17.5V15C1.25 14.59 1.59 14.25 2 14.25C2.41 14.25 2.75 14.59 2.75 15V17.5C2.75 19.57 4.43 21.25 6.5 21.25H9C9.41 21.25 9.75 21.59 9.75 22C9.75 22.41 9.41 22.75 9 22.75Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M9 5.25H7C5.86 5.25 5.25 5.85 5.25 7V9C5.25 10.15 5.86 10.75 7 10.75H9C10.14 10.75 10.75 10.15 10.75 9V7C10.75 5.85 10.14 5.25 9 5.25Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M17 5.25H15C13.86 5.25 13.25 5.85 13.25 7V9C13.25 10.15 13.86 10.75 15 10.75H17C18.14 10.75 18.75 10.15 18.75 9V7C18.75 5.85 18.14 5.25 17 5.25Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M9 13.25H7C5.86 13.25 5.25 13.85 5.25 15V17C5.25 18.15 5.86 18.75 7 18.75H9C10.14 18.75 10.75 18.15 10.75 17V15C10.75 13.85 10.14 13.25 9 13.25Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M17 13.25H15C13.86 13.25 13.25 13.85 13.25 15V17C13.25 18.15 13.86 18.75 15 18.75H17C18.14 18.75 18.75 18.15 18.75 17V15C18.75 13.85 18.14 13.25 17 13.25Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <div className="flex flex-col text-center md:text-left">
              <span className="text-[11px] md:text-md font-medium text-gray-500 dark:text-slate-400 leading-tight">
                Formato
              </span>
              <span className="text-[11px] md:text-sm font-bold text-gray-900 dark:text-white mt-0.5">
                APK
              </span>
            </div>
          </div>

          {/* Chip 2: Tamaño */}
          <div className="bg-white dark:bg-[#0f172a] rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-4 shadow-sm border border-gray-100 dark:border-white/5 flex flex-col md:flex-row items-center text-center md:text-left justify-center md:justify-start gap-1 sm:gap-2 md:gap-4 transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex-shrink-0 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6"
              >
                <path
                  d="M21.6699 6.94942C21.0299 4.77942 19.2199 2.96942 17.0499 2.32942C15.3999 1.84942 14.2599 1.88942 13.4699 2.47942C12.5199 3.18942 12.4099 4.46942 12.4099 5.37942V7.86942C12.4099 10.3294 13.5299 11.5794 15.7299 11.5794H18.5999C19.4999 11.5794 20.7899 11.4694 21.4999 10.5194C22.1099 9.73942 22.1599 8.59942 21.6699 6.94942Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M18.9099 13.3592C18.6499 13.0592 18.2699 12.8892 17.8799 12.8892H14.2999C12.5399 12.8892 11.1099 11.4592 11.1099 9.69917V6.11917C11.1099 5.72917 10.9399 5.34917 10.6399 5.08917C10.3499 4.82917 9.9499 4.70917 9.5699 4.75917C7.2199 5.05917 5.0599 6.34917 3.6499 8.28917C2.2299 10.2392 1.7099 12.6192 2.1599 14.9992C2.8099 18.4392 5.5599 21.1892 9.0099 21.8392C9.5599 21.9492 10.1099 21.9992 10.6599 21.9992C12.4699 21.9992 14.2199 21.4392 15.7099 20.3492C17.6499 18.9392 18.9399 16.7792 19.2399 14.4292C19.2899 14.0392 19.1699 13.6492 18.9099 13.3592Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <div className="flex flex-col text-center md:text-left">
              <span className="text-[11px] md:text-md font-medium text-gray-500 dark:text-slate-400 leading-tight">
                Tamaño
              </span>
              <span className="text-[11px] md:text-sm font-bold text-gray-900 dark:text-white mt-0.5 truncate max-w-[80px] sm:max-w-none">
                {downloadLink.size || app.size || "Optimizado"}
              </span>
            </div>
          </div>

          {/* Chip 3: Instalación */}
          <div className="bg-white dark:bg-[#0f172a] rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-4 shadow-sm border border-gray-100 dark:border-white/5 flex flex-col md:flex-row items-center text-center md:text-left justify-center md:justify-start gap-1 sm:gap-2 md:gap-4 transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-500 dark:text-yellow-400 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex-shrink-0 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6"
              >
                <path
                  d="M17.91 10.7209H14.82V3.52087C14.82 1.84087 13.91 1.50087 12.8 2.76087L12 3.67087L5.23001 11.3709C4.30001 12.4209 4.69001 13.2809 6.09001 13.2809H9.18001V20.4809C9.18001 22.1609 10.09 22.5009 11.2 21.2409L12 20.3309L18.77 12.6309C19.7 11.5809 19.31 10.7209 17.91 10.7209Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <div className="flex flex-col text-center md:text-left">
              <span className="text-[11px] md:text-md font-medium text-gray-500 dark:text-slate-400 leading-tight">
                Instalación
              </span>
              <span className="text-[11px] md:text-sm font-bold text-gray-900 dark:text-white mt-0.5">
                Rápida<span className="hidden md:inline"> y segura</span>
              </span>
            </div>
          </div>
        </div>

        {/* Download Action Area */}
        <div className="w-full text-center">
          {!downloadReady ? (
            /* Progress Bar Panel */
            <div
              id="progress-container"
              className="bg-red-50 dark:bg-[#0f172a] border border-red-100 dark:border-white/5 rounded-xl md:rounded-2xl p-5 md:p-6 shadow-sm flex flex-col items-center justify-center gap-3 md:gap-4 transition-all duration-300 w-full"
            >
              <div className="flex items-center gap-2">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 md:h-5 md:w-5 text-[#DC2626]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <div
                  className="text-[15px] md:text-[17px] font-bold text-gray-900 dark:text-white"
                  id="progress-text"
                >
                  Preparando enlace... {Math.round(progress)}%
                </div>
              </div>
              <div className="w-full h-2.5 md:h-3 bg-red-200/50 dark:bg-red-950/40 rounded-full overflow-hidden">
                <div
                  id="progress-bar"
                  className="h-full bg-[#DC2626] rounded-full transition-all duration-100 ease-out relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-white dark:bg-[#0f172a]/20 animate-pulse"></div>
                </div>
              </div>
              <div className="text-[11px] md:text-xs text-red-600/80 dark:text-red-400 font-bold tracking-wider uppercase">
                GENERANDO DESCARGA SEGURA
              </div>
            </div>
          ) : (
            /* Download Button Panel (Fades in) */
            <div id="download-button-container" className="animate-fade-in w-full">
              <button
                onClick={handleDownload}
                className="bg-[#DC2626] hover:bg-red-600 text-white rounded-xl md:rounded-2xl p-4 md:p-5 flex flex-row items-center justify-center gap-3 md:gap-4 cursor-pointer hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 text-white outline-none w-full"
              >
                <div className="flex items-center gap-2">
                  <svg width="22" height="22" viewBox="0 0 18 18" className="md:w-6 md:h-6">
                    <path
                      d="M9 2L9 12M5 8.5L9 12L13 8.5"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    ></path>
                    <path
                      d="M2 15H16"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                  <span className="text-base md:text-xl border-white font-bold tracking-wide">
                    Descargar APK
                  </span>
                </div>
                <div className="hidden md:block opacity-50">|</div>
                <span className="bg-white/20 text-white text-xs md:text-sm font-bold px-3 py-1 md:px-4 md:py-1.5 rounded-full">
                  {downloadLink.size || app.size || "120M"}
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Alert / Notice */}
        <div className="bg-red-50 dark:bg-[#0f172a] text-red-400 border border-red-100 dark:border-white/5 rounded-xl p-3 md:p-4 flex gap-2 md:gap-3 items-center w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="currentColor"
            className="text-red-500 shrink-0"
            viewBox="0 0 24 24"
          >
            <path d="M12 22c5.51 0 10-4.49 10-10S17.51 2 12 2 2 6.49 2 12s4.49 10 10 10M11 7h2v2h-2zm0 4h2v6h-2z"></path>
          </svg>
          <p className="text-[11px] md:text-sm text-gray-600 dark:text-slate-300 m-0 leading-relaxed text-left">
            Antes de iniciar la descarga, puede aparecer un anuncio breve.{" "}
            <strong className="text-gray-900 dark:text-white">Ciérralo y</strong> la descarga
            comenzará automáticamente.
          </p>
        </div>

        {/* Installation Instructions */}
        {app.installationInstructions && (
          <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-500/20 rounded-xl p-4 md:p-5 flex flex-col gap-2 w-full">
            <h5 className="text-[14px] md:text-[16px] font-bold text-blue-900 dark:text-blue-300 flex items-center gap-2 m-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              Instrucciones de Instalación
            </h5>
            <div className="text-[12px] md:text-[14px] text-gray-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
              {app.installationInstructions}
            </div>
          </div>
        )}

        {/* Trust Badges Grid (Bottom Section) */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-3 md:gap-4 w-full">
          {/* Badge 1: 100% Seguro */}
          <div className="bg-white dark:bg-[#0f172a] rounded-xl text-red-500 md:rounded-2xl p-2 sm:p-3 md:p-5 text-center shadow-sm border border-gray-100 dark:border-white/5 flex flex-col justify-center items-center hover:shadow-md transition-shadow">
            <svg
              className="p-2 bg-red-50 dark:bg-red-900/20 rounded-full"
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="m20.42 6.11-7.97-4c-.28-.14-.62-.14-.9 0l-7.97 4c-.31.15-.51.45-.55.79-.01.11-.96 10.77 8.55 15.01a.98.98 0 0 0 .82 0C21.91 17.66 20.97 7 20.95 6.9a.98.98 0 0 0-.55-.79ZM11 15.42l-2.71-2.71L9.7 11.3l1.29 1.29 3.29-3.29 1.41 1.41-4.71 4.71Z"></path>
            </svg>
            <div className="text-[9px] sm:text-[11px] md:text-sm font-bold text-gray-900 dark:text-white mb-0.5 md:mb-1 leading-tight mt-2">
              100% Seguro
            </div>
            <div className="text-[8px] sm:text-[9px] md:text-xs text-gray-500 dark:text-slate-400 leading-tight">
              Archivo verificado
            </div>
          </div>

          {/* Badge 2: Descarga Rápida */}
          <div className="bg-white dark:bg-[#0f172a] rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-5 text-center shadow-sm border border-gray-100 dark:border-white/5 flex flex-col justify-center items-center hover:shadow-md transition-shadow">
            <svg
              className="text-red-500 bg-red-50 dark:bg-red-900/20 rounded-full p-2"
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20 9h-8V2c0-.45-.3-.85-.74-.97s-.9.07-1.12.46l-7 12.01c-.18.31-.18.69 0 1s.51.5.87.5h8v7c0 .45.3.85.74.97.09.02.17.03.26.03.35 0 .68-.18.86-.5l7-12c.18-.31.18-.69 0-1S20.36 9 20 9"></path>
            </svg>
            <div className="mt-2 text-[9px] sm:text-[11px] md:text-sm font-bold text-gray-900 dark:text-white mb-0.5 md:mb-1 leading-tight">
              Descarga Rápida
            </div>
            <div className="text-[8px] sm:text-[9px] md:text-xs text-gray-500 dark:text-slate-400 leading-tight truncate w-full">
              Optimizado
            </div>
          </div>

          {/* Badge 3: Siempre Actual */}
          <div className="bg-white dark:bg-[#0f172a] rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-5 text-center shadow-sm border border-gray-100 dark:border-white/5 flex flex-col justify-center items-center hover:shadow-md transition-shadow">
            <svg
              className="text-violet-500 bg-violet-50 dark:bg-violet-900/20 rounded-full p-2"
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14 7 9 3v3H8c-3.31 0-6 2.69-6 6s2.69 6 6 6v-2c-2.21 0-4-1.79-4-4s1.79-4 4-4h1v3zm2-1v2c2.21 0 4 1.79 4 4s-1.79 4-4 4h-1v-3l-5 4 5 4v-3h1c3.31 0 6-2.69 6-6s-2.69-6-6-6"></path>
            </svg>
            <div className="mt-2 text-[9px] sm:text-[11px] md:text-sm font-bold text-gray-900 dark:text-white mb-0.5 md:mb-1 leading-tight w-full truncate">
              Siempre Actual
            </div>
            <div className="text-[8px] sm:text-[9px] md:text-xs text-gray-500 dark:text-slate-400 leading-tight">
              Última versión
            </div>
          </div>
        </div>

        {/* Telegram Banner */}
        <a
          href="https://t.me/+e4Wx4s_d0ag1MjQx"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white dark:bg-[#0f172a] rounded-xl md:rounded-2xl p-3 md:p-5 flex items-center gap-3 md:gap-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 border border-gray-100 dark:border-white/5 mx-auto group cursor-pointer no-underline w-full"
        >
          <div className="w-10 h-10 md:w-14 md:h-14 bg-[#2CA5E0] rounded-full flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <svg width="24" height="22" viewBox="0 0 20 18" className="translate-x-[-1px] md:w-6 md:h-6">
              <path d="M1 8L19 1L13 17L9 11L1 8Z" fill="white"></path>
              <path d="M9 11L13 17L15 12L9 11Z" fill="#c8e6f5"></path>
            </svg>
          </div>
          <div className="flex-1 text-gray-900 dark:text-white leading-snug group-hover:text-[#2CA5E0] transition-colors text-left">
            <strong className="text-xs md:text-base">Únete a nuestro Telegram</strong>
            <br />
            <span className="text-[10px] md:text-sm text-gray-500 dark:text-slate-400">
              Recibe novedades, apps exclusivas y enlaces directos antes que nadie.
            </span>
          </div>
          <div className="bg-[#DC2626] group-hover:bg-[#2CA5E0] text-white text-[11px] md:text-sm font-bold px-3 py-1.5 md:px-5 md:py-2.5 rounded-full whitespace-nowrap flex items-center gap-1.5 md:gap-2 transition-colors shadow-sm">
            Unirme <span className="hidden sm:inline">ahora</span>
            <svg
              width="12" height="12"
              viewBox="0 0 10 10"
              className="group-hover:translate-x-0.5 transition-transform text-white md:w-3.5 md:h-3.5"
            >
              <path
                d="M2 5H8M6 3L8 5L6 7"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              ></path>
            </svg>
          </div>
        </a>

        {/* Security Disclaimer */}
        <div className="text-center px-4 mx-auto pt-6 pb-2 border-t border-gray-200 dark:border-white/10 w-full mt-2">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 mb-2 text-gray-400 dark:text-slate-500">
            <div className="flex items-center justify-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 11 11" className="md:w-3.5 md:h-3.5">
                <rect
                  x="1"
                  y="4"
                  width="9"
                  height="7"
                  rx="1.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  fill="none"
                ></rect>
                <path
                  d="M3.5 4V3C3.5 1.9 4.3 1 5.5 1C6.7 1 7.5 1.9 7.5 3V4"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  fill="none"
                ></path>
              </svg>
              <span className="text-[10px] md:text-xs">
                AKDESCARGAS garantiza la seguridad de todos los archivos.
              </span>
            </div>
          </div>
          <span className="text-[10px] md:text-xs text-gray-400 dark:text-slate-500 block">
            Sin virus, sin malware.
          </span>
        </div>

        {/* Back Link */}
        <div className="mt-2 flex justify-center pb-8">
          <Link
            href={`/app/${app.id}`}
            className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 dark:text-slate-400 hover:text-red-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Volver a {app.title}
          </Link>
        </div>
      </div>
    </div>
  );
}
