import * as React from "react";
import Link from "next/link";
import { Star, RefreshCw } from "lucide-react";
import { BadgeOverlay } from "./BadgeOverlay";

interface AppCardProps {
  id: string;
  title: string;
  publisher: string;
  rating: number;
  downloads: string;
  version: string;
  updated?: boolean;
  updatedAt?: string;
  iconUrl: string;
  badgeType?: string;
}

export function AppCard({
  id,
  title,
  publisher,
  rating,
  downloads,
  version,
  updated,
  updatedAt,
  iconUrl,
  badgeType,
}: AppCardProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Recientemente";
    const d = new Date(dateString);
    return d.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  const formatShortDate = (dateString?: string) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    return d.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short"
    });
  };

  return (
    <Link 
      href={`/app/${id}`}
      className="flex gap-3 md:gap-4 items-center group bg-white dark:bg-slate-800 rounded-[20px] p-2 transition-all duration-300 hover:shadow-[0_4px_20px_rgb(0,0,0,0.06)] border border-black/5 dark:border-white/5 active:scale-[0.98]"
    >
      <div className="relative min-w-[64px] w-[64px] h-[64px] rounded-[22%] overflow-hidden shrink-0 shadow-sm border border-black/5 dark:border-white/5 bg-gray-50 dark:bg-gray-700">
        <div className="block w-full h-full">
          {/* Using img for simplicity in mock, Next/Image could be used here */}
          <img
            src={iconUrl}
            alt={`${title} Logo`}
            className="w-full h-full object-cover"
          />
        </div>
        <BadgeOverlay badgeType={badgeType} />
      </div>

      <div className="min-w-0 flex-1">
        <span
          className="font-bold text-[15px] bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 block truncate leading-tight group-hover:from-red-600 group-hover:to-red-500 transition-all"
        >
          {title}
        </span>
        <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-0.5 truncate leading-snug">
          {publisher}
        </p>

        <div className="flex items-center gap-1 sm:gap-2 mt-1.5 overflow-hidden">
          <div className="flex flex-shrink-0 items-center gap-0.5 bg-gray-100 dark:bg-slate-700/50 px-1 sm:px-1.5 py-0.5 rounded">
            <span className="text-[10px] sm:text-[11px] text-gray-600 dark:text-gray-300 font-medium">
              {rating.toFixed(1)}
            </span>
            <Star className="text-red-600 w-2.5 h-2.5 fill-current" />
          </div>
          <span className="text-[10px] sm:text-[11px] flex-shrink-0 text-gray-500 font-medium truncate">
            {downloads}
          </span>
          <span className="text-[9px] sm:text-[10px] flex-shrink-0 bg-gray-100 dark:bg-slate-700/50 text-gray-500 dark:text-gray-400 px-1 sm:px-1.5 py-0.5 rounded font-medium max-w-[65px] sm:max-w-none truncate">
            {version}
          </span>
          {(updated || updatedAt) && (
            <span
              className="hidden sm:flex flex-shrink-0 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-0.5 rounded cursor-help"
              title={`Actualizado el ${formatDate(updatedAt)}`}
            >
              <RefreshCw className="w-3 h-3" />
            </span>
          )}
        </div>
      </div>

      <span
        className="shrink-0 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 group-hover:bg-red-100 dark:group-hover:bg-red-900/40 px-3 sm:px-4 py-1.5 rounded-full font-bold text-[12px] sm:text-[13px] tracking-wide active:scale-95 transition-all outline-none"
      >
        Obtener
      </span>
    </Link>
  );
}
