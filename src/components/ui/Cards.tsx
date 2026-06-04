import React from "react";
import type { CardsProps } from "../../types/tasks";
function Cards({
  title,
  description,
  className,
  children,
  contentClassName,
}: CardsProps) {
  return (
    <div
      className={`bg-linear-to-b from-blue-950/60 to-[#060e1e]/80 rounded-2xl overflow-hidden border border-blue-800/25 shadow-2xl shadow-blue-950/60 backdrop-blur-sm ${className}`}
    >
      <div className="px-6 pt-6 pb-2">
        <div className="flex items-center gap-2 mb-1">
          <div className="bg-[#60A5FA] w-1.5 h-1.5 rounded-full" />
          <h2 className="text-xs-custom font-bold text-blue-400/80 uppercase tracking-widest">
            {title}
          </h2>
        </div>
        <p className="pl-3.5 text-blue-500/40 mb-5 text-[11px]">
          {description}
        </p>
      </div>
      <div className={`px-6 pb-6 ${contentClassName}`}>{children}</div>
    </div>
  );
}

export default Cards;
