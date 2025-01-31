import { render, screen, fireEvent } from '@testing-library/react';
import ImageGallery from '../ImageGallery';

describe('ImageGallery', () => {
  const mockImages = [
    { id: 1, url: 'test1.jpg', title: 'Test 1' },
    { id: 2, url: 'test2.jpg', title: 'Test 2' },
  ];

  it('renders all images', () => {
    render(<ImageGallery images={mockImages} />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(mockImages.length);
  });

  it('opens lightbox on image click', () => {
    render(<ImageGallery images={mockImages} />);
    const firstImage = screen.getAllByRole('img')[0];
    fireEvent.click(firstImage);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
