"use client";

import React from "react";
import { GalleryGridView } from "./gallery-grid-view";
import { useGallery } from "@/hooks/use-gallery";

const PER_PAGE = 8;

export const GalleryContainer = () => {
  const {
    images,
    loading,
    error,
    currentPage,
    totalPages,
    handlePageChange,
  } = useGallery({ perPage: PER_PAGE });

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
