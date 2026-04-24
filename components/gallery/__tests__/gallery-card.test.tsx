import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GalleryCard } from '../gallery-card';
import { PixabayImage } from '@/lib/pixabay-service';

// Mock Framer Motion to avoid issues with animations in tests
vi.mock('framer-motion', () => ({
  motion: {
    figure: ({ children, ...props }: any) => <figure {...props}>{children}</figure>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>
}));

const mockImage: PixabayImage = {
  id: 123,
  pageURL: 'https://pixabay.com/photo-123',
  type: 'photo',
  tags: 'nature, landscape, mountains',
  previewURL: 'https://cdn.pixabay.com/preview.jpg',
  previewWidth: 150,
  previewHeight: 100,
  webformatURL: 'https://cdn.pixabay.com/webformat.jpg',
  webformatWidth: 640,
  webformatHeight: 480,
  largeImageURL: 'https://cdn.pixabay.com/large.jpg',
  imageWidth: 1920,
  imageHeight: 1080,
  imageSize: 500000,
  views: 1500,
  downloads: 200,
  collections: 50,
  likes: 300,
  comments: 20,
  user_id: 456,
  user: 'TestUser',
  userImageURL: 'https://cdn.pixabay.com/user.jpg'
};

describe('GalleryCard', () => {
  it('renders image information correctly', () => {
    render(<GalleryCard image={mockImage} index={0} onClick={() => {}} />);
    
    expect(screen.getByText('nature')).toBeInTheDocument();
    expect(screen.getByText('TestUser')).toBeInTheDocument();
    expect(screen.getByText('1.5k')).toBeInTheDocument(); // Formatted views
    expect(screen.getByText('300')).toBeInTheDocument(); // Likes
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<GalleryCard image={mockImage} index={0} onClick={handleClick} />);
    
    const figure = screen.getByRole('button');
    fireEvent.click(figure);
    
    expect(handleClick).toHaveBeenCalledWith(mockImage);
  });

  it('calls onClick when Enter key is pressed', () => {
    const handleClick = vi.fn();
    render(<GalleryCard image={mockImage} index={0} onClick={handleClick} />);
    
    const figure = screen.getByRole('button');
    fireEvent.keyDown(figure, { key: 'Enter' });
    
    expect(handleClick).toHaveBeenCalledWith(mockImage);
  });

  it('has correct ARIA attributes', () => {
    render(<GalleryCard image={mockImage} index={0} onClick={() => {}} />);
    
    const figure = screen.getByRole('button');
    expect(figure).toHaveAttribute('aria-label', `View full image: ${mockImage.tags} by ${mockImage.user}`);
    expect(figure).toHaveAttribute('tabindex', '0');
    expect(figure).toHaveAttribute('aria-haspopup', 'dialog');
  });
});
