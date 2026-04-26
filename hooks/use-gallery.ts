import { useState, useEffect, useCallback, useMemo } from "react";
import { getImages, PixabayImage } from "@/lib/pixabay-service";

interface UseGalleryProps {
  perPage: number;
  initialPage?: number;
  category?: string;
  searchQuery?: string;
}

export const useGallery = ({ perPage, initialPage = 1, category = 'all', searchQuery = '' }: UseGalleryProps) => {
  const [images, setImages] = useState<PixabayImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalHits, setTotalHits] = useState(0);

  const fetchImages = useCallback(async (page: number, cat: string, query: string) => {
    try {
      setLoading(true);
      setError(null);
      const { hits, totalHits: total } = await getImages({ 
        page, 
        perPage, 
        category: cat, 
        searchQuery: query 
      });
      setImages(hits);
      setTotalHits(total);
    } catch (err: any) {
      setError(err.message || "Failed to load images from the gallery.");
    } finally {
      setLoading(false);
    }
  }, [perPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [category, searchQuery]);

  useEffect(() => {
    fetchImages(currentPage, category, searchQuery);
  }, [currentPage, category, searchQuery, fetchImages]);

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
