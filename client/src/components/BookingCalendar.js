// Add booking calendar for photoshoots
- Available dates selection
- Booking request form
- Automated confirmation emails
- Calendar sync with Google Calendar
- Booking management in admin dashboard 

import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Grid,
  MenuItem
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from 'axios';

const BookingCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: '',
    details: ''
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const shootTypes = [
    { value: 'commercial', label: 'Commercial' },
    { value: 'editorial', label: 'Editorial' },
    { value: 'campaign', label: 'Campaign' },
    { value: 'runway', label: 'Runway Show' }
  ];

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/bookings', {
        ...formData,
        date: selectedDate
      });

      setSuccess(true);
      setOpen(false);
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        type: '',
        details: ''
      });
      setSelectedDate(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit booking request');
    } finally {
      setLoading(false);
    }
  };

  const isDateDisabled = (date) => {
    // Example: disable weekends and past dates
    return date < new Date() || date.getDay() === 0 || date.getDay() === 6;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
        <Typography variant="h4" gutterBottom align="center">
          Book a Shoot
        </Typography>
        
        {success && (
          <Alert 
            severity="success" 
            sx={{ mb: 3 }}
            onClose={() => setSuccess(false)}
          >
            Booking request submitted successfully! We'll contact you shortly.
          </Alert>
        )}

        <Paper sx={{ p: 3 }}>
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={handleDateChange}
            shouldDisableDate={isDateDisabled}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </Paper>

        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Book Shoot for {selectedDate?.toLocaleDateString()}</DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    select
                    fullWidth
                    label="Shoot Type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                  >
                    {shootTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Additional Details"
                    name="details"
                    value={formData.details}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button 
                type="submit" 
                variant="contained"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Booking'}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};

export default BookingCalendar; 