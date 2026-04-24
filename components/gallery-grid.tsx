"use client";

import { GalleryContainer } from "./gallery/gallery-container";

/**
 * GalleryGrid - Main entry point for the gallery feature.
 * Styled with an editorial layout and sophisticated spacing.
 */
export const GalleryGrid = () => {
  return (
    <section className="relative py-32 overflow-hidden bg-background">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col gap-24">
        <header className="px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="flex flex-col gap-6 max-w-2xl">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-primary font-bold px-3 py-1 bg-primary/5 rounded-full border border-primary/10">
                  Visual Archive
                </span>
                <div className="h-px w-12 bg-primary/20" />
              </div>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light tracking-tighter text-foreground leading-[0.9]">
                Curated <br />
                <span className="italic text-primary/80">Perspective</span>
              </h2>
              <p className="text-muted-foreground text-xl max-w-lg mt-4 leading-relaxed font-medium">
                Explore a world of high-definition imagery, captured by talented creators from across the globe.
              </p>
            </div>
            
            <div className="flex flex-col gap-2 text-right">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground/40">
                Collection Volume
              </span>
              <span className="text-4xl font-serif italic text-foreground">
                2.4k+ <span className="text-sm not-italic font-sans font-bold text-primary/50 ml-1">Images</span>
              </span>
            </div>
          </div>
        </header>

        <GalleryContainer />
      </div>
    </section>
  );
};
