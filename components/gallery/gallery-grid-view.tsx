"use client";

import React, { memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PixabayImage } from "@/lib/pixabay-service";
import { GalleryCard } from "./gallery-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface GalleryGridViewProps {
  images: PixabayImage[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  perPage: number;
}

export const GalleryGridView = memo(({
  images,
  loading,
  error,
  currentPage,
  totalPages,
  onPageChange,
  perPage
}: GalleryGridViewProps) => {

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              pageNumber={i}
              isActive={currentPage === i}
              className={cn(
                "transition-all duration-300",
                currentPage === i ? "bg-primary text-primary-foreground font-serif" : "hover:bg-muted"
              )}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(i);
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            href="#"
            pageNumber={1}
            isActive={currentPage === 1}
            className={cn(
              "transition-all duration-300",
              currentPage === 1 ? "bg-primary text-white font-serif" : "hover:bg-muted"
            )}
            onClick={(e) => {
              e.preventDefault();
              onPageChange(1);
            }}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (currentPage > 3) {
        items.push(<PaginationEllipsis key="ellipsis-start" />);
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              pageNumber={i}
              isActive={currentPage === i}
              className={cn(
                "transition-all duration-300",
                currentPage === i ? "bg-primary text-white font-serif" : "hover:bg-muted"
              )}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(i);
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (currentPage < totalPages - 2) {
        items.push(<PaginationEllipsis key="ellipsis-end" />);
      }

      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href="#"
            pageNumber={totalPages}
            isActive={currentPage === totalPages}
            className={cn(
              "transition-all duration-300",
              currentPage === totalPages ? "bg-primary text-primary-foreground font-serif" : "hover:bg-muted"
            )}
            onClick={(e) => {
              e.preventDefault();
              onPageChange(totalPages);
            }}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  if (error) {
    return (
      <section className="py-20 px-4 max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Alert variant="destructive" className="bg-destructive/5 border-destructive/10 backdrop-blur-xl rounded-2xl p-8">
            <AlertCircle className="h-6 w-6 text-destructive" />
            <AlertTitle className="text-2xl font-serif font-semibold tracking-tight mb-2">System Error</AlertTitle>
            <AlertDescription className="text-base opacity-80 font-medium">{error}</AlertDescription>
          </Alert>
        </motion.div>
      </section>
    );
  }

  return (
    <div className="flex flex-col gap-16 w-full max-w-[1400px] mx-auto px-4 md:px-8">
      {/* Dynamic Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 min-h-[600px]">
        <AnimatePresence mode="popLayout">
          {loading ? (
            Array.from({ length: perPage }).map((_, i) => (
              <motion.div
                key={`skeleton-${i}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex flex-col overflow-hidden rounded-[2rem] border border-border/20 bg-card/5 backdrop-blur-sm"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-muted/60 via-muted/40 to-muted/20 animate-pulse" />
                </div>
                <div className="flex flex-col gap-6 p-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2 flex-1">
                        <div className="h-3 w-20 rounded-full bg-gradient-to-r from-muted/80 to-muted/40 animate-pulse" />
                        <div className="h-8 w-3/4 rounded-xl bg-gradient-to-r from-muted/60 via-muted/50 to-muted/40 animate-pulse" />
                      </div>
                      <div className="size-12 rounded-2xl bg-gradient-to-br from-muted/60 to-muted/30 animate-pulse" />
                    </div>
                    <div className="h-4 w-1/2 rounded-full bg-gradient-to-r from-muted/50 to-muted/30 animate-pulse" />
                  </div>
                  <div className="pt-4 flex items-center justify-between">
                    <div className="flex gap-2">
                      <div className="h-5 w-16 rounded-full bg-gradient-to-r from-muted/50 to-muted/30 animate-pulse" />
                      <div className="h-5 w-16 rounded-full bg-gradient-to-r from-muted/50 to-muted/30 animate-pulse" />
                    </div>
                    <div className="h-4 w-12 rounded-full bg-gradient-to-r from-muted/50 to-muted/30 animate-pulse" />
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            images.map((image, i) => (
              <GalleryCard 
                key={image.id}
                image={image}
                index={i}
                priority={i < 4}
              />
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Pagination Section */}
      {!loading && totalPages > 1 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center gap-10 py-0 border-t border-border/10"
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground/40">
              Curated Collection
            </span>
            <p className="text-lg font-medium text-foreground tracking-tight">
              Page <span className="font-serif italic text-primary text-2xl mx-1">{currentPage}</span> of {totalPages}
            </p>
          </div>
          
          <Pagination>
            <PaginationContent className="gap-2">
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) onPageChange(currentPage - 1);
                  }}
                  className={cn(
                    "rounded-full px-6 transition-all",
                    currentPage === 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-primary hover:text-primary-foreground"
                  )}
                />
              </PaginationItem>
              
              <div className="flex items-center gap-1">
                {renderPaginationItems()}
              </div>

              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) onPageChange(currentPage + 1);
                  }}
                  className={cn(
                    "rounded-full px-6 transition-all",
                    currentPage === totalPages ? "opacity-30 cursor-not-allowed" : "hover:bg-primary hover:text-primary-foreground"
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </motion.div>
      )}
    </div>
  );
});

GalleryGridView.displayName = "GalleryGridView";
