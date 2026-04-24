import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GalleryGridView } from '../gallery-grid-view';
import { PixabayImage } from '@/lib/pixabay-service';

// Mock Framer Motion
vi.mock('framer-motion', () => ({
  motion: {
    figure: ({ children, ...props }: any) => <figure {...props}>{children}</figure>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>
}));

const mockImages: PixabayImage[] = [
  {
    id: 1,
    pageURL: '', type: 'photo', tags: 'tag1', previewURL: '', previewWidth: 0, previewHeight: 0,
    webformatURL: '', webformatWidth: 0, webformatHeight: 0, largeImageURL: '', imageWidth: 0,
    imageHeight: 0, imageSize: 0, views: 10, downloads: 0, collections: 0, likes: 5,
    comments: 0, user_id: 1, user: 'User1', userImageURL: ''
  },
  {
    id: 2,
    pageURL: '', type: 'photo', tags: 'tag2', previewURL: '', previewWidth: 0, previewHeight: 0,
    webformatURL: '', webformatWidth: 0, webformatHeight: 0, largeImageURL: '', imageWidth: 0,
    imageHeight: 0, imageSize: 0, views: 20, downloads: 0, collections: 0, likes: 10,
    comments: 0, user_id: 2, user: 'User2', userImageURL: ''
  }
];

describe('GalleryGridView', () => {
  it('renders loading skeletons when loading is true', () => {
    render(
      <GalleryGridView 
        images={[]} 
        loading={true} 
        error={null} 
        currentPage={1} 
        totalPages={1} 
        onPageChange={() => {}} 
        onImageClick={() => {}} 
        perPage={8} 
      />
    );
    
    // Check if skeletons are rendered (assuming they have a specific class or we can check by count)
    const skeletons = document.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders error message when error is provided', () => {
    render(
      <GalleryGridView 
        images={[]} 
        loading={false} 
        error="Test Error Message" 
        currentPage={1} 
        totalPages={1} 
        onPageChange={() => {}} 
        onImageClick={() => {}} 
        perPage={8} 
      />
    );
    
    expect(screen.getByText('System Error')).toBeInTheDocument();
    expect(screen.getByText('Test Error Message')).toBeInTheDocument();
  });

  it('renders images when provided', () => {
    render(
      <GalleryGridView 
        images={mockImages} 
        loading={false} 
        error={null} 
        currentPage={1} 
        totalPages={1} 
        onPageChange={() => {}} 
        onImageClick={() => {}} 
        perPage={8} 
      />
    );
    
    expect(screen.getByText('tag1')).toBeInTheDocument();
    expect(screen.getByText('tag2')).toBeInTheDocument();
  });

  it('renders pagination when totalPages > 1', () => {
    render(
      <GalleryGridView 
        images={mockImages} 
        loading={false} 
        error={null} 
        currentPage={1} 
        totalPages={5} 
        onPageChange={() => {}} 
        onImageClick={() => {}} 
        perPage={2} 
      />
    );
    
    expect(screen.getByText('Curated Collection')).toBeInTheDocument();
    expect(screen.getByText(/Page/)).toBeInTheDocument();
    
    // Find '5' in the pagination items
    const paginationItems = screen.getAllByText('5');
    expect(paginationItems.length).toBeGreaterThan(0);
  });

  it('renders pagination with ellipsis for large number of pages', () => {
    render(
      <GalleryGridView 
        images={mockImages} 
        loading={false} 
        error={null} 
        currentPage={5} 
        totalPages={10} 
        onPageChange={() => {}} 
        onImageClick={() => {}} 
        perPage={2} 
      />
    );
    
    // Check for ellipsis (PaginationEllipsis renders a sr-only span with 'More pages')
    const ellipses = screen.getAllByText('More pages');
    expect(ellipses.length).toBeGreaterThan(0);
    expect(screen.getAllByText('1').length).toBeGreaterThan(0);
    expect(screen.getAllByText('10').length).toBeGreaterThan(0);
  });

  it('calls onPageChange when previous/next buttons are clicked', () => {
    const handlePageChange = vi.fn();
    render(
      <GalleryGridView 
        images={mockImages} 
        loading={false} 
        error={null} 
        currentPage={2} 
        totalPages={5} 
        onPageChange={handlePageChange} 
        onImageClick={() => {}} 
        perPage={2} 
      />
    );
    
    const prevButton = screen.getByLabelText('Go to previous page');
    const nextButton = screen.getByLabelText('Go to next page');
    
    fireEvent.click(prevButton);
    expect(handlePageChange).toHaveBeenCalledWith(1);
    
    fireEvent.click(nextButton);
    expect(handlePageChange).toHaveBeenCalledWith(3);
  });
});
