"use client";

import { useState } from "react";
import { Star } from "lucide-react";

export function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate a network request (fake behavior)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 p-4 rounded-xl border border-green-200 dark:border-green-800/30 text-center animate-in fade-in duration-300">
        <p className="font-bold mb-1">¡Reseña enviada con éxito!</p>
        <p className="text-sm">Tu comentario está pendiente de moderación y aparecerá pronto.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label className="text-[13px] font-bold text-gray-700 dark:text-slate-300 mb-2">
          Tu calificación:
        </label>
        <div className="flex items-center gap-2 cursor-pointer">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              className={`w-6 h-6 transition-colors ${
                (hoverRating || rating) >= s
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300 dark:text-slate-600"
              }`}
              onMouseEnter={() => setHoverRating(s)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(s)}
            />
          ))}
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-[13px] font-bold text-gray-700 dark:text-slate-300 mb-1">
            Nombre
          </label>
          <input
            required
            type="text"
            className="w-full bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-slate-200 focus:outline-none focus:border-red-500"
          />
        </div>
        <div className="flex-1">
          <label className="block text-[13px] font-bold text-gray-700 dark:text-slate-300 mb-1">
            Email
          </label>
          <input
            required
            type="email"
            className="w-full bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-slate-200 focus:outline-none focus:border-red-500"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-[13px] font-bold text-gray-700 dark:text-slate-300 mb-1">
          Comentario
        </label>
        <textarea
          required
          rows={3}
          className="w-full bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-slate-200 focus:outline-none focus:border-red-500"
        ></textarea>
      </div>
      
      <div>
        <button
          type="submit"
          disabled={isSubmitting || rating === 0}
          className="bg-[#DC2626] disabled:opacity-60 disabled:cursor-not-allowed hover:bg-red-600 text-white font-bold py-2 px-6 rounded-xl text-sm transition-colors flex items-center justify-center min-w-[140px]"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            "Enviar reseña"
          )}
        </button>
        {rating === 0 && !isSubmitting && (
          <p className="text-[11px] text-gray-500 dark:text-slate-400 mt-1">
            Selecciona una calificación de estrellas para continuar.
          </p>
        )}
      </div>
    </form>
  );
}
