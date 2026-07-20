import * as React from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { BadgeOverlay } from "./BadgeOverlay";

interface FeaturedCardProps {
  id: string;
  title: string;
  publisher: string;
  rating: number;
  imageUrl: string;
  iconUrl: string;
  badgeType?: string;
}

export function FeaturedCard({
  id,
  title,
  publisher,
  rating,
  imageUrl,
  iconUrl,
  badgeType,
}: FeaturedCardProps) {
  return (
    <Link
      href={`/app/${id}`}
      className="block relative group rounded-2xl overflow-hidden cursor-pointer active:scale-95 transition-transform duration-200"
    >
      <div className="relative w-full aspect-video overflow-hidden bg-gray-200 dark:bg-gray-800">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="px-3 py-2.5 flex items-center gap-2.5 bg-white/30 dark:bg-black/40 backdrop-blur-md absolute bottom-0 left-0 right-0">
        <div className="relative shrink-0 overflow-hidden rounded-xl">
          <img
            src={iconUrl}
            alt={`${title} Logo`}
            className="w-10 h-10 shadow-sm object-cover bg-white block"
          />
          <BadgeOverlay badgeType={badgeType} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-[13px] text-gray-900 dark:text-white m-0 leading-tight truncate">
            {title}
          </h3>
          <p className="flex items-center gap-1 text-[11px] text-gray-700 dark:text-slate-300 mt-0.5 truncate">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 shrink-0" />
            <span className="font-semibold">{rating.toFixed(1)}</span>
            <span className="text-slate-400 dark:text-slate-500">•</span>
            <span className="truncate">{publisher}</span>
          </p>
        </div>
        <button className="shrink-0 bg-[#DC2626] hover:bg-red-600 text-white px-3.5 py-1.5 rounded-full font-bold text-[12px] shadow-md active:scale-95 transition-all outline-none whitespace-nowrap">
          Obtener
        </button>
      </div>
    </Link>
  );
}
