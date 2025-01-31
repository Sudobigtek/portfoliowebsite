import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PortfolioUpload from './PortfolioUpload';

// Mock the fetch function
global.fetch = jest.fn();

// Mock URL.createObjectURL and URL.revokeObjectURL
global.URL.createObjectURL = jest.fn(() => 'mock-url');
global.URL.revokeObjectURL = jest.fn();

describe('PortfolioUpload', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    // Reset fetch mock
    fetch.mockReset();
  });

  it('renders upload component correctly', () => {
    render(<PortfolioUpload />);
    
    expect(screen.getByText('Upload Portfolio Images')).toBeInTheDocument();
    expect(screen.getByText(/Drag and drop images here/)).toBeInTheDocument();
    expect(screen.getByText(/Supported formats/)).toBeInTheDocument();
  });

  it('handles file selection correctly', async () => {
    render(<PortfolioUpload />);

    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const input = screen.getByRole('button', { name: /Drag and drop images here/ });

    await userEvent.upload(input, file);

    expect(URL.createObjectURL).toHaveBeenCalledWith(file);
    expect(screen.getByAltText('Preview 1')).toBeInTheDocument();
    expect(screen.getByText('Upload (1 files)')).toBeInTheDocument();
  });

  it('validates file type correctly', async () => {
    render(<PortfolioUpload />);

    const invalidFile = new File(['test'], 'test.txt', { type: 'text/plain' });
    const input = screen.getByRole('button', { name: /Drag and drop images here/ });

    await userEvent.upload(input, invalidFile);

    expect(screen.getByText(/not a supported image type/)).toBeInTheDocument();
  });

  it('validates file size correctly', async () => {
    render(<PortfolioUpload />);

    const largeFile = new File(['test'.repeat(1024 * 1024 * 6)], 'large.jpg', { type: 'image/jpeg' });
    const input = screen.getByRole('button', { name: /Drag and drop images here/ });

    await userEvent.upload(input, largeFile);

    expect(screen.getByText(/too large/)).toBeInTheDocument();
  });

  it('handles file removal correctly', async () => {
    render(<PortfolioUpload />);

    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const input = screen.getByRole('button', { name: /Drag and drop images here/ });

    await userEvent.upload(input, file);
    const removeButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(removeButton);

    expect(URL.revokeObjectURL).toHaveBeenCalledWith('mock-url');
    expect(screen.queryByAltText('Preview 1')).not.toBeInTheDocument();
  });

  it('handles successful upload correctly', async () => {
    fetch.mockImplementationOnce(() => Promise.resolve({ ok: true }));
    render(<PortfolioUpload />);

    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const input = screen.getByRole('button', { name: /Drag and drop images here/ });

    await userEvent.upload(input, file);
    const uploadButton = screen.getByRole('button', { name: /Upload/ });
    fireEvent.click(uploadButton);

    await waitFor(() => {
      expect(screen.getByText(/Files uploaded successfully/)).toBeInTheDocument();
    });
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('mock-url');
  });

  it('handles upload failure correctly', async () => {
    fetch.mockImplementationOnce(() => Promise.reject(new Error('Upload failed')));
    render(<PortfolioUpload />);

    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const input = screen.getByRole('button', { name: /Drag and drop images here/ });

    await userEvent.upload(input, file);
    const uploadButton = screen.getByRole('button', { name: /Upload/ });
    fireEvent.click(uploadButton);

    await waitFor(() => {
      expect(screen.getByText(/Failed to upload files/)).toBeInTheDocument();
    });
  });

  it('disables upload button when no files are selected', () => {
    render(<PortfolioUpload />);
    
    const uploadButton = screen.getByRole('button', { name: /Upload/ });
    expect(uploadButton).toBeDisabled();
  });

  it('shows loading state during upload', async () => {
    fetch.mockImplementationOnce(() => new Promise(resolve => setTimeout(resolve, 100)));
    render(<PortfolioUpload />);

    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const input = screen.getByRole('button', { name: /Drag and drop images here/ });

    await userEvent.upload(input, file);
    const uploadButton = screen.getByRole('button', { name: /Upload/ });
    fireEvent.click(uploadButton);

    expect(screen.getByText('Uploading...')).toBeInTheDocument();
    expect(uploadButton).toBeDisabled();
  });
}); 