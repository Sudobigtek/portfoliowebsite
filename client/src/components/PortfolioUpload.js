import React, { useState, useCallback } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  CircularProgress, 
  Grid, 
  Alert,
  ImageList,
  ImageListItem,
  IconButton,
} from '@mui/material';
import { CloudUpload, Delete } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const PortfolioUpload = () => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const validateFile = (file) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return `${file.name} is not a supported image type`;
    }
    if (file.size > MAX_FILE_SIZE) {
      return `${file.name} is too large (max ${MAX_FILE_SIZE / 1024 / 1024}MB)`;
    }
    return null;
  };

  const onDrop = useCallback((acceptedFiles) => {
    setError('');
    setSuccess(false);

    const validFiles = [];
    const invalidFiles = [];
    const newPreviews = [];

    acceptedFiles.forEach(file => {
      const error = validateFile(file);
      if (error) {
        invalidFiles.push(error);
      } else {
        validFiles.push(file);
        newPreviews.push({
          file,
          preview: URL.createObjectURL(file)
        });
      }
    });

    if (invalidFiles.length > 0) {
      setError(invalidFiles.join('\n'));
    }

    setFiles(prevFiles => [...prevFiles, ...validFiles]);
    setPreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ACCEPTED_TYPES
    },
    maxSize: MAX_FILE_SIZE
  });

  const removeFile = (index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    setPreviews(prevPreviews => {
      // Revoke the object URL to avoid memory leaks
      URL.revokeObjectURL(prevPreviews[index].preview);
      return prevPreviews.filter((_, i) => i !== index);
    });
  };

  const handleUpload = async () => {
    if (!files.length) {
      setError('Please select files to upload');
      return;
    }

    setUploading(true);
    setError('');
    setUploadProgress({});

    try {
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append('images', file);
      });

      const response = await fetch('/api/portfolio/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      setSuccess(true);
      // Cleanup previews
      previews.forEach(preview => URL.revokeObjectURL(preview.preview));
      setFiles([]);
      setPreviews([]);
    } catch (err) {
      setError(err.message || 'Failed to upload files');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Upload Portfolio Images
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Files uploaded successfully!
        </Alert>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            {...getRootProps()}
            sx={{
              border: '2px dashed',
              borderColor: isDragActive ? 'primary.main' : 'grey.300',
              borderRadius: 1,
              p: 3,
              textAlign: 'center',
              cursor: 'pointer',
              bgcolor: isDragActive ? 'action.hover' : 'background.paper',
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <input {...getInputProps()} />
            <CloudUpload sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography>
              {isDragActive
                ? 'Drop the files here...'
                : 'Drag and drop images here, or click to select files'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Supported formats: JPG, PNG, WebP (max {MAX_FILE_SIZE / 1024 / 1024}MB)
            </Typography>
          </Box>
        </Grid>

        {previews.length > 0 && (
          <Grid item xs={12}>
            <ImageList cols={4} gap={8}>
              {previews.map((preview, index) => (
                <ImageListItem key={preview.preview}>
                  <img
                    src={preview.preview}
                    alt={`Preview ${index + 1}`}
                    loading="lazy"
                    style={{ height: '150px', objectFit: 'cover' }}
                  />
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 5,
                      right: 5,
                      bgcolor: 'background.paper',
                      '&:hover': { bgcolor: 'background.paper' },
                    }}
                    size="small"
                    onClick={() => removeFile(index)}
                  >
                    <Delete />
                  </IconButton>
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
        )}

        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={uploading || !files.length}
            fullWidth
          >
            {uploading ? (
              <>
                <CircularProgress size={24} sx={{ mr: 1 }} />
                Uploading...
              </>
            ) : (
              `Upload ${files.length ? `(${files.length} files)` : ''}`
            )}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PortfolioUpload;
