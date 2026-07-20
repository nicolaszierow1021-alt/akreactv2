"use client";

import * as React from "react";

export function Carousel({ children, cellWidthClass }: { children: React.ReactNode; cellWidthClass?: string }) {
  const widthClass = cellWidthClass || "min-w-[85%] sm:min-w-[45%] lg:min-w-[32%]";

  return (
    <div className="w-full overflow-hidden">
      <div 
        className="flex overflow-x-auto no-scrollbar sm:custom-scrollbar scroll-smooth snap-x snap-mandatory -ml-4 pb-4"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {React.Children.map(children, (child) => (
          <div className={`pl-4 shrink-0 snap-start ${widthClass}`}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}


