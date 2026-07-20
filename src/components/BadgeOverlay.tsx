import React from "react";

interface BadgeOverlayProps {
  badgeType?: string;
  className?: string; // Para ajustar posiciones absolutas si es necesario
}

export function BadgeOverlay({ badgeType, className = "" }: BadgeOverlayProps) {
  if (!badgeType || badgeType.trim() === "") return null;

  const isMod = badgeType.toUpperCase() === "MOD";
  const text = badgeType.toUpperCase() === "PREMIUM" ? "PREMIUM" : badgeType.toUpperCase();
  
  return (
    <div
      className={`absolute w-[80px] text-center transform rotate-45 z-10 pointer-events-none font-black tracking-widest text-[7px] md:text-[8px] py-[1.5px] -right-[24px] top-[8px] ${
        isMod 
          ? "bg-[#DC2626] text-white shadow-sm shadow-red-900/30" 
          : "bg-gradient-to-r from-yellow-400 to-amber-500 text-white shadow-sm shadow-amber-900/30"
      } ${className}`}
      style={{
        textShadow: "0 1px 2px rgba(0,0,0,0.3)"
      }}
    >
      {text}
    </div>
  );
}
