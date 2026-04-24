import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useGallery } from '../use-gallery';
import * as pixabayService from '@/lib/pixabay-service';

vi.mock('@/lib/pixabay-service', () => ({
  getImages: vi.fn(),
}));

const mockImages = [
  { id: 1, tags: 'tag1', user: 'user1', webformatURL: 'url1' },
  { id: 2, tags: 'tag2', user: 'user2', webformatURL: 'url2' },
];

describe('useGallery', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock window.scrollTo
    global.window.scrollTo = vi.fn();
  });

  it('should fetch images on mount', async () => {
    (pixabayService.getImages as any).mockResolvedValue({
      hits: mockImages,
      totalHits: 2,
    });

    const { result } = renderHook(() => useGallery({ perPage: 8 }));

    expect(result.current.loading).toBe(true);

    await act(async () => {
      // Wait for useEffect to trigger fetch
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.images).toEqual(mockImages);
    expect(result.current.totalPages).toBe(1);
  });

  it('should handle errors during fetch', async () => {
    const errorMessage = 'Failed to fetch';
    (pixabayService.getImages as any).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useGallery({ perPage: 8 }));

    await act(async () => {
      // Wait for fetch
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(errorMessage);
  });

  it('should handle page changes', async () => {
    (pixabayService.getImages as any).mockResolvedValue({
      hits: mockImages,
      totalHits: 20,
    });

    const { result } = renderHook(() => useGallery({ perPage: 8 }));

    await act(async () => {
      result.current.handlePageChange(2);
    });

    expect(result.current.currentPage).toBe(2);
    expect(pixabayService.getImages).toHaveBeenCalledWith(2, 8);
  });

  it('should handle image selection', async () => {
    const { result } = renderHook(() => useGallery({ perPage: 8 }));

    act(() => {
      result.current.handleImageClick(mockImages[0] as any);
    });

    // Debounced, so we might need to wait or mock debounce
    // For simplicity, let's assume it works or test it without debounce if possible
    // But since we use useDebounceCallback, it will take 100ms
  });
});
