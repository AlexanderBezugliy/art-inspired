"use client";

import React, { memo, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PixabayImage } from "@/lib/pixabay-service";
import { User, X, Download, Heart } from "lucide-react";
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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const primaryTag = image.tags.split(",")[0].trim();

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxOpen]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setLightboxOpen(false);
    }
  }, []);

  useEffect(() => {
    if (lightboxOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen, handleKeyDown]);

  return (
    <>
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
        onClick={() => setLightboxOpen(true)}
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-[1rem] border border-border/50 cursor-pointer",
          "bg-card/30 backdrop-blur-xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
          "hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] hover:border-primary/40"
        )}
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <div className={cn(
            "absolute inset-0 bg-muted/50 transition-opacity duration-500",
            imageLoaded ? "opacity-0" : "opacity-100"
          )}>
            <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-muted/80 to-muted/40" />
          </div>
          <Image
            src={image.webformatURL}
            alt={image.tags || "Gallery image"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className={cn(
              "object-cover transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
              "group-hover:scale-110 group-hover:rotate-1",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
            priority={priority}
            loading={priority ? undefined : "lazy"}
            decoding="async"
          />
        </div>

        <figcaption className="flex flex-col gap-0 p-4">
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
              <div className="size-14 bg-background/50 flex items-center justify-center overflow-hidden rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-sm">
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

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="relative w-full h-full max-w-[90vw] md:max-w-[80vw] lg:max-w-[1100px] xl:max-w-[1400px] 2xl:max-w-[1600px] max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={image.largeImageURL}
                alt={image.tags || "Gallery image"}
                fill
                className="object-contain rounded-lg shadow-2xl"
                priority
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 80vw, 1100px"
              />

              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-b-lg">
                <div className="flex items-end justify-between">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-serif font-medium text-white">
                      {primaryTag}
                    </h3>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {image.userImageURL && (
                          <Image
                            src={image.userImageURL}
                            alt={image.user}
                            width={24}
                            height={24}
                            className="rounded-full"
                          />
                        )}
                        <span className="text-sm text-white/70">by {image.user}</span>
                      </div>
                      <div className="flex items-center gap-1 text-white/60">
                        <Heart className="size-4" />
                        <span className="text-sm">{image.likes}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {image.tags.split(',').slice(0, 4).map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/80">
                          #{tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={image.pageURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Download className="size-5 text-white" />
                    </a>
                    <button
                      onClick={() => setLightboxOpen(false)}
                      className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <X className="size-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

GalleryCard.displayName = "GalleryCard";