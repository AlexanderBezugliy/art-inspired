"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Star, Eye, MapPin, Calendar } from "lucide-react"

interface Project {
  id: number
  title: string
  subtitle: string
  category: string
  year: string
  thumbnail: string
  hoverImage: string
  description: string
  rating: number
  views: string
  location: string
}

interface VideoCardProps {
  project: Project
  isHovered: boolean
  onHoverChange: (hovered: boolean) => void
}

export function VideoCard({ project, isHovered, onHoverChange }: VideoCardProps) {
  const [mounted, setMounted] = useState(false)
  const [imgError, setImgError] = useState(false)
  const [hoverImgError, setHoverImgError] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const fallbackImage = "/placeholder.jpg"

  return (
    <div
      className={cn(
        "group relative rounded-[2.5rem] overflow-hidden",
        "cursor-none",
        "transition-all duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
        "h-[600px] min-w-[180px]",
        "flex-1 md:flex-initial",
        isHovered ? "flex-[3] shadow-2xl shadow-white/10" : "flex-[0.8] opacity-90",
      )}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
    >
      {/* Background Layer (Thumbnail) */}
      <div className={cn("absolute inset-0 transition-opacity duration-700", isHovered ? "opacity-0" : "opacity-100")}>
        <img
          src={imgError ? fallbackImage : project.thumbnail}
          alt={project.title}
          loading="lazy"
          onError={() => setImgError(true)}
          className={cn(
            "w-full h-full object-cover transition-all duration-700",
            !isHovered && "grayscale brightness-50 md:brightness-75",
          )}
        />
      </div>

      {/* Hover Layer (High-Quality Photo) */}
      <div className={cn("absolute inset-0 transition-opacity duration-700", isHovered ? "opacity-100" : "opacity-0")}>
        {mounted && (
          <img
            src={hoverImgError ? fallbackImage : project.hoverImage}
            alt={`${project.title} details`}
            loading="lazy"
            onError={() => setHoverImgError(true)}
            className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-[1200ms] ease-out"
          />
        )}
      </div>

      {/* Content Overlay */}
      <div
        className={cn(
          "absolute inset-0 flex flex-col justify-end p-6 md:p-8 bg-gradient-to-t from-black/80 via-black/20 to-transparent",
          "transition-all duration-700",
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      >
        {/* Glassmorphic Info Card */}
        <div
          className={cn(
            "relative backdrop-blur-2xl bg-white/10 rounded-[2rem] p-6 md:p-8 border border-white/20",
            "shadow-2xl overflow-hidden",
            "transition-all duration-700 delay-100 ease-[cubic-bezier(0.23,1,0.32,1)]",
            isHovered ? "translate-y-0 opacity-100 scale-100" : "translate-y-12 opacity-0 scale-95",
          )}
        >
          {/* Decorative background element */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/5 rounded-full blur-3xl" />

          <div className="relative space-y-4">
            {/* Header: Category & Rating */}
            <div className="flex justify-between items-center">
              <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-mono tracking-widest text-white uppercase backdrop-blur-md">
                {project.category}
              </span>
              <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-mono text-white font-bold">{project.rating}</span>
              </div>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-1">
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                {project.title}
              </h3>
              <p className="text-white/60 font-mono text-xs uppercase tracking-[0.2em]">
                {project.subtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-white/80 text-sm leading-relaxed line-clamp-2 md:line-clamp-none font-light">
              {project.description}
            </p>

            {/* Footer Stats & Info */}
            <div className="pt-4 mt-4 border-t border-white/10 grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-white/60">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-mono tracking-wider uppercase">{project.location}</span>
                </div>
                <div className="flex items-center gap-2 text-white/60">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-mono tracking-wider">{project.year}</span>
                </div>
              </div>
              <div className="flex flex-col items-end justify-end">
                <div className="flex items-center gap-2 text-white/40">
                  <Eye className="w-4 h-4" />
                  <span className="text-xs font-mono tracking-tighter">{project.views} views</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Title (when not hovered) */}
      <div 
        className={cn(
          "absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-700",
          isHovered ? "opacity-0" : "opacity-100"
        )}
      >
        <span className="rotate-90 whitespace-nowrap text-white/20 font-mono text-sm tracking-[0.5em] uppercase font-bold">
          {project.title}
        </span>
      </div>
    </div>
  )
}
