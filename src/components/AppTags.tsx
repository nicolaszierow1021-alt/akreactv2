import React from 'react';

interface AppTagsProps {
  title: string;
  category?: string;
}

import { Tags } from 'lucide-react';

export function AppTags({ title, category }: AppTagsProps) {
  const normalizedTitle = title.toLowerCase().trim();
  const year = new Date().getFullYear();
  
  const catLower = category ? category.toLowerCase() : 'descargar';
  
  const tags = [
    `app para ${catLower} android`,
    `descargar ${normalizedTitle} premium apk`,
    `download ${normalizedTitle} premium apk`,
    `${normalizedTitle} apk`,
    `${normalizedTitle} apk download`,
    `${normalizedTitle} apk premium`,
    `${normalizedTitle} mod apk`,
    `${normalizedTitle} premium`,
    `${normalizedTitle} premium apk`,
    `${normalizedTitle} premium apk ${year}`,
    `${normalizedTitle} premium apk desbloqueado`,
    `${normalizedTitle} premium apk gratis`,
    `${normalizedTitle} premium apk mediafire`,
    `${normalizedTitle} premium gratis`,
    `${normalizedTitle} premium última versión`,
    `${normalizedTitle} pro apk`,
    `${normalizedTitle} sin anuncios`,
    `${normalizedTitle} sin anuncios apk`,
    `${normalizedTitle} vip mod apk`,
    `Tendencia`
  ];

  const uniqueTags = Array.from(new Set(tags));

  return (
    <section className="mx-5 lg:mx-0 mt-8 mb-6 bg-white dark:bg-slate-900/50 rounded-2xl p-5 md:p-7 border border-gray-100 dark:border-white/10 shadow-sm relative overflow-hidden group">
      {/* Subtle background glow effect for dark mode */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-500/5 rounded-full blur-3xl group-hover:bg-red-500/10 transition-colors duration-500 pointer-events-none"></div>
      
      <div className="flex items-center gap-2.5 mb-5 md:mb-6 relative z-10">
        <div className="p-2 bg-red-50 dark:bg-red-500/10 rounded-lg">
          <Tags className="w-4 h-4 md:w-5 md:h-5 text-[#DC2626] dark:text-red-400" />
        </div>
        <h3 className="text-[17px] md:text-[19px] font-bold text-gray-900 dark:text-white">
          Etiquetas
        </h3>
      </div>
      
      <div className="flex flex-wrap gap-2 md:gap-2.5 relative z-10">
        {uniqueTags.map((tag, index) => (
          <span 
            key={index}
            className="inline-flex items-center px-3.5 py-1.5 md:px-4 md:py-2 bg-[#DC2626] hover:bg-red-700 text-white text-[12px] md:text-[13px] font-bold rounded-xl transition-all duration-200 shadow-sm cursor-default hover:scale-105"
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}
