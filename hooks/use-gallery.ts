import { useState, useEffect, useCallback, useMemo } from "react";
import { getImages, PixabayImage } from "@/lib/pixabay-service";

interface UseGalleryProps {
  perPage: number;
  initialPage?: number;
}

export const useGallery = ({ perPage, initialPage = 1 }: UseGalleryProps) => {
  const [images, setImages] = useState<PixabayImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalHits, setTotalHits] = useState(0);

  const fetchImages = useCallback(async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      const { hits, totalHits: total } = await getImages(page, perPage);
      setImages(hits);
      setTotalHits(total);
      
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err: any) {
      setError(err.message || "Failed to load images from the gallery.");
    } finally {
      setLoading(false);
    }
  }, [perPage]);

  useEffect(() => {
    fetchImages(currentPage);
  }, [currentPage, fetchImages]);

  const totalPages = useMemo(() => Math.ceil(totalHits / perPage), [totalHits, perPage]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return {
    images,
    loading,
    error,
    currentPage,
    totalPages,
    handlePageChange,
    refresh: () => fetchImages(currentPage)
  };
};
