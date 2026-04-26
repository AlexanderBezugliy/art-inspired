"use client";

import React from "react";
import { GalleryGridView } from "./gallery-grid-view";
import { useGallery } from "@/hooks/use-gallery";

const PER_PAGE = 8;

interface GalleryContainerProps {
  searchQuery?: string;
  category?: string;
}

export const GalleryContainer = ({ searchQuery = '', category = 'all' }: GalleryContainerProps) => {
  const {
    images,
    loading,
    error,
    currentPage,
    totalPages,
    handlePageChange,
  } = useGallery({ perPage: PER_PAGE, category, searchQuery });

  return (
    <GalleryGridView
      images={images}
      loading={loading}
      error={error}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      perPage={PER_PAGE}
    />
  );
};
