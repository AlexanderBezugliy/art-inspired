"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  icon: Icon, 
  label, 
  value,
  className 
}) => {
  return (
    <div 
      className={`flex flex-col gap-1.5 p-4 rounded-2xl bg-muted/30 border border-border/5 group hover:bg-muted/50 transition-colors ${className}`}
      role="group"
      aria-label={`${label}: ${value}`}
    >
      <div className="flex items-center gap-2 text-muted-foreground text-[10px] uppercase tracking-widest font-bold group-hover:text-primary transition-colors">
        <Icon className="size-3.5" aria-hidden="true" />
        <span>{label}</span>
      </div>
      <span className="text-base font-bold tracking-tight">{value}</span>
    </div>
  );
};
