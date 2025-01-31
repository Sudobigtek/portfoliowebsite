import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  MenuItem,
  IconButton,
  Typography
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import axios from 'axios';

const categories = [
  { value: 'campaign', label: 'Campaign' },
  { value: 'editorial', label: 'Editorial' },
  { value: 'runway', label: 'Runway' },
  { value: 'commercial', label: 'Commercial' }
];

const PortfolioEdit = ({ open, onClose, item, onEditComplete }) => {
  const [formData, setFormData] = useState({
    title: item?.title || '',
    category: item?.category || '',
    photographer: item?.photographer || '',
    client: item?.client || '',
    date: item?.date ? item.date.split('T')[0] : '',
    image: null
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'image' && !formData[key]) return;
        formDataToSend.append(key, formData[key]);
      });

      const token = localStorage.getItem('token');
      await axios.put(`/api/portfolio/${item._id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      onClose();
      if (onEditComplete) {
        onEditComplete();
      }
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Edit Portfolio Item
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              required
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <TextField
              required
              select
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Photographer"
              name="photographer"
              value={formData.photographer}
              onChange={handleChange}
            />
            <TextField
              label="Client"
              name="client"
              value={formData.client}
              onChange={handleChange}
            />
            <TextField
              type="date"
              label="Date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
            <Box>
              <Typography variant="body2" gutterBottom>
                Current Image:
              </Typography>
              <img
                src={item?.imageUrl}
                alt={item?.title}
                style={{
                  width: '100%',
                  maxHeight: 200,
                  objectFit: 'cover',
                  marginBottom: 8
                }}
              />
            </Box>
            <Button
              variant="outlined"
              component="label"
            >
              Change Image
              <input
                type="file"
                hidden
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
            </Button>
            {formData.image && (
              <Typography variant="body2">
                New image selected: {formData.image.name}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button 
            type="submit" 
            variant="contained"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PortfolioEdit; 