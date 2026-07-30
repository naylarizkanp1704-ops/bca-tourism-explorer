import React from "react";

export function GlassCard({
  children,
  className = "",
  as: As = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  return (
    <As className={`bg-white/90 backdrop-blur-md rounded-card border border-bca-border shadow-sm ${className}`}>
      {children}
    </As>
  );
}
