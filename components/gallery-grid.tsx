"use client";

import { useState } from "react";
import { GalleryContainer } from "./gallery/gallery-container";

const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'nature', label: 'Nature' },
  { value: 'architecture', label: 'Architecture' },
  { value: 'travel', label: 'Travel' },
  { value: 'food', label: 'Food' },
  { value: 'people', label: 'People' },
  { value: 'animals', label: 'Animals' },
  { value: 'technology', label: 'Technology' },
];

export const GalleryGrid = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <section className="relative py-32 overflow-hidden bg-background">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col gap-10">
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
              <span className="text-5xl font-serif italic text-foreground">
                2.4k+ <span className="text-sm not-italic font-sans font-bold text-primary/50 ml-1">Images</span>
              </span>
            </div>
          </div>

          <div className="mt-16 flex flex-col justify-end sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <button
                  type="button"
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`
                    relative px-5 py-2 text-xs font-mono uppercase tracking-[0.2em] whitespace-nowrap
                    transition-all duration-150 ease-out
                    ${selectedCategory === cat.value
                      ? 'text-primary bg-primary/10 border border-primary/30'
                      : 'text-muted-foreground/60 hover:text-foreground bg-transparent border border-transparent hover:border-border'
                    }
                  `}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="relative flex-shrink-0 sm:w-80">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  className={`w-4 h-4 transition-colors duration-150 ${isSearchFocused ? 'text-primary' : 'text-muted-foreground/40'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={`
                  w-full pl-11 pr-4 py-3 
                  bg-background border rounded-none
                  text-sm text-foreground placeholder:text-muted-foreground/40
                  font-mono tracking-wide
                  transition-all duration-150 ease-out
                  focus:outline-none focus:ring-1
                  ${isSearchFocused
                    ? 'border-primary/50 bg-primary/5 focus:ring-primary/30'
                    : 'border-border/50 hover:border-border'
                  }
                `}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground/40 hover:text-foreground transition-colors duration-150"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </header>

        <GalleryContainer searchQuery={searchQuery} category={selectedCategory} />
      </div>
    </section>
  );
};
