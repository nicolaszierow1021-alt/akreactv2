"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-12 mb-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
        aria-label="Página anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <div className="flex items-center gap-2 font-medium text-[14px] md:text-[15px] text-gray-600 dark:text-slate-400">
        Página <span className="text-gray-900 dark:text-white font-bold">{currentPage}</span> de <span className="text-gray-900 dark:text-white font-bold">{totalPages}</span>
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
        aria-label="Página siguiente"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
