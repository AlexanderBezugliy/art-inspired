"use client";

import React, { memo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PixabayImage } from "@/lib/pixabay-service";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

interface GalleryCardProps {
  image: PixabayImage;
  index: number;
  priority?: boolean;
}

export const GalleryCard = memo(({ 
  image, 
  index, 
  priority = false
}: GalleryCardProps) => {
  const primaryTag = image.tags.split(",")[0].trim();

  return (
    <motion.figure
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.05, 
        ease: [0.23, 1, 0.32, 1] 
      }}
      whileHover={{ y: -12 }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[2rem] border border-border/50",
        "bg-card/30 backdrop-blur-xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
        "hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] hover:border-primary/40"
      )}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={image.webformatURL}
          alt={image.tags || "Gallery image"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 group-hover:rotate-1"
          priority={priority}
          loading={priority ? undefined : "lazy"}
        />
      </div>

      <figcaption className="flex flex-col gap-6 p-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.3em] text-primary/60 font-bold">
                {image.type}
              </span>
              <h3 className="text-2xl font-serif font-medium text-foreground leading-tight group-hover:text-primary transition-colors duration-500">
                {primaryTag}
              </h3>
            </div>
            <div className="size-12 rounded-2xl border border-border/10 p-0.5 bg-background/50 flex items-center justify-center overflow-hidden rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-sm">
              {image.userImageURL ? (
                <Image 
                  src={image.userImageURL} 
                  alt={image.user} 
                  width={48} 
                  height={48} 
                  className="object-cover rounded-xl"
                />
              ) : (
                <User className="size-6 text-muted-foreground" />
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-wide uppercase text-muted-foreground/70">by {image.user}</span>
            <div className="h-px flex-1 bg-border/10" />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-1.5">
            {image.tags.split(',').slice(0, 2).map(tag => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-muted/50 text-muted-foreground/60 border border-border/5">
                #{tag.trim()}
              </span>
            ))}
          </div>
        </div>
      </figcaption>
    </motion.figure>
  );
});

GalleryCard.displayName = "GalleryCard";
