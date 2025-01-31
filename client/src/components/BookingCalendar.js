import React, { useState, useEffect } from 'react';
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
  MenuItem,
  FormHelperText,
  CircularProgress,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { isEmail, isMobilePhone } from 'validator';
import { format } from 'date-fns';

const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00',
  '17:00', '18:00'
];

const BookingCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: '',
    details: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const shootTypes = [
    { value: 'commercial', label: 'Commercial' },
    { value: 'editorial', label: 'Editorial' },
    { value: 'campaign', label: 'Campaign' },
    { value: 'runway', label: 'Runway Show' },
  ];

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots();
    }
  }, [selectedDate]);

  const fetchAvailableSlots = async () => {
    setLoadingSlots(true);
    try {
      const response = await fetch(`/api/bookings/slots?date=${format(selectedDate, 'yyyy-MM-dd')}`);
      if (!response.ok) throw new Error('Failed to fetch available slots');
      const data = await response.json();
      setAvailableSlots(data.availableSlots || TIME_SLOTS);
    } catch (err) {
      setError('Failed to load available time slots');
    } finally {
      setLoadingSlots(false);
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!isEmail(formData.email)) {
      errors.email = 'Invalid email address';
    }
    
    if (formData.phone && !isMobilePhone(formData.phone, 'any')) {
      errors.phone = 'Invalid phone number';
    }
    
    if (!formData.type) {
      errors.type = 'Please select a shoot type';
    }

    if (!selectedTime) {
      errors.time = 'Please select a time slot';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleDateChange = date => {
    setSelectedDate(date);
    setSelectedTime(null);
    setOpen(true);
  };

  const handleTimeChange = time => {
    setSelectedTime(time);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          date: selectedDate,
          time: format(selectedTime, 'HH:mm'),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to submit booking request');
      }

      setSuccess(true);
      setOpen(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        type: '',
        details: '',
      });
      setSelectedDate(null);
      setSelectedTime(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isDateDisabled = date => {
    return date < new Date() || date.getDay() === 0 || date.getDay() === 6;
  };

  const handleClose = () => {
    setOpen(false);
    setFormErrors({});
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
        <Typography variant="h4" gutterBottom align="center">
          Book a Shoot
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess(false)}>
            Booking request submitted successfully! We'll contact you shortly.
          </Alert>
        )}

        <Paper sx={{ p: 3 }}>
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={handleDateChange}
            shouldDisableDate={isDateDisabled}
            renderInput={params => <TextField {...params} fullWidth />}
          />
        </Paper>

        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>
            Book Shoot for {selectedDate?.toLocaleDateString()}
          </DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {loadingSlots ? (
                    <Box display="flex" justifyContent="center" p={2}>
                      <CircularProgress size={24} />
                    </Box>
                  ) : (
                    <>
                      <TimePicker
                        label="Select Time"
                        value={selectedTime}
                        onChange={handleTimeChange}
                        renderInput={params => (
                          <TextField
                            {...params}
                            fullWidth
                            error={!!formErrors.time}
                            helperText={formErrors.time}
                          />
                        )}
                        minTime={new Date().setHours(9, 0, 0)}
                        maxTime={new Date().setHours(18, 0, 0)}
                        minutesStep={60}
                      />
                      <FormHelperText>
                        Available time slots: {availableSlots.join(', ')}
                      </FormHelperText>
                    </>
                  )}
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={!!formErrors.name}
                    helperText={formErrors.name}
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
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={!!formErrors.phone}
                    helperText={formErrors.phone}
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
                    error={!!formErrors.type}
                    helperText={formErrors.type}
                  >
                    {shootTypes.map(option => (
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
              <Button onClick={handleClose}>Cancel</Button>
              <Button 
                type="submit" 
                variant="contained" 
                disabled={loading || loadingSlots}
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
