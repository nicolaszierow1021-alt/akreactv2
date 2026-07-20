import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ExpandableDescriptionProps {
  description: string;
}

export function ExpandableDescription({ description }: ExpandableDescriptionProps) {
  if (!description) return null;

  // Replace literal '\n' and '\r' string representations with actual newlines/returns, then split
  const formattedDescription = description.replace(/\\n/g, "\n").replace(/\\r/g, "\r");
  const paragraphs = formattedDescription.split(/\r?\n/).filter((p) => p.trim() !== "");

  // Very low threshold so the button is practically always visible if there is some text.
  const showButton = paragraphs.length > 1 || formattedDescription.length > 150;

  if (!showButton) {
    return (
      <div className="relative text-[13px] md:text-[15px] text-gray-600 dark:text-slate-400 leading-relaxed space-y-3">
        {paragraphs.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>
    );
  }

  // Generamos un ID único por si hay varios componentes en la misma página
  const uniqueId = `expand-desc-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="relative">
      <style>{`
        #${uniqueId}:checked ~ .desc-container {
          max-height: 5000px;
        }
        #${uniqueId}:checked ~ .desc-container .desc-gradient {
          opacity: 0;
          pointer-events: none;
        }
        #${uniqueId}:checked ~ label .show-more {
          display: none !important;
        }
        #${uniqueId}:checked ~ label .show-less {
          display: flex !important;
        }
      `}</style>

      {/* Checkbox oculto que controla el estado NATIVAMENTE sin JavaScript */}
      <input type="checkbox" id={uniqueId} className="hidden" />

      {/* Contenedor del texto (Hermano del checkbox) */}
      <div className="desc-container relative text-[13px] md:text-[15px] text-gray-600 dark:text-slate-400 leading-relaxed space-y-3 transition-all duration-500 ease-in-out overflow-hidden max-h-[160px]">
        {paragraphs.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
        
        <div className="desc-gradient absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-red-50/90 dark:from-red-900/10 to-transparent pointer-events-none transition-opacity duration-300" />
      </div>

      {/* Label actúa como el botón. Al hacer clic, activa el checkbox (Hermano del checkbox) */}
      <label
        htmlFor={uniqueId}
        className="relative z-50 cursor-pointer mt-4 inline-flex items-center gap-1.5 text-[13px] font-bold text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors bg-red-100/50 dark:bg-red-500/10 px-4 py-2 rounded-lg select-none"
      >
        <span className="show-more flex items-center gap-1.5">
          Leer más <ChevronDown className="w-4 h-4" />
        </span>
        <span className="show-less hidden items-center gap-1.5">
          Leer menos <ChevronUp className="w-4 h-4" />
        </span>
      </label>
    </div>
  );
}
