import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Paper,
  CircularProgress
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import axios from 'axios';
import Navigation from '../components/Navigation';
import SEO from '../components/SEO';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const savedForm = localStorage.getItem('contactForm');
    if (savedForm) {
      try {
        const parsed = JSON.parse(savedForm);
        setFormData(parsed);
        setCharCount(parsed.message.length);
      } catch (error) {
        console.error('Error parsing saved form:', error);
        localStorage.removeItem('contactForm');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contactForm', JSON.stringify(formData));
    setCharCount(formData.message.length);
  }, [formData]);

  useEffect(() => {
    let timeoutId;
    if (status.message && status.type === 'success') {
      timeoutId = setTimeout(() => {
        setStatus({ type: '', message: '' });
      }, 5000);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [status]);

  const clearSavedForm = () => {
    localStorage.removeItem('contactForm');
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    } else if (formData.message.length > 1000) {
      newErrors.message = 'Message must not exceed 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await axios.post('/api/contact', formData);
      setStatus({
        type: 'success',
        message: 'Message sent successfully! We will get back to you soon.'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      clearSavedForm();
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Failed to send message. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title="Contact" 
        description="Get in touch for bookings, collaborations, and inquiries."
      />
      <Navigation />
      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
        <Grid container spacing={6}>
          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h3" component="h1" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body1" paragraph>
              Available for fashion shows, photo shoots, and brand campaigns.
            </Typography>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Agency Representation
              </Typography>
              <Typography variant="body2" color="text.secondary">
                New York<br />
                Agency Name<br />
                +1 (212) 555-0123<br />
                agency@example.com
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              For all other inquiries, please use the contact form.
            </Typography>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <Paper elevation={0} sx={{ p: 4, bgcolor: 'grey.50' }}>
              {status.message && (
                <Alert 
                  severity={status.type} 
                  sx={{ mb: 3 }}
                  onClose={() => setStatus({ type: '', message: '' })}
                >
                  {status.message}
                </Alert>
              )}
              
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={Boolean(errors.name)}
                      helperText={errors.name}
                      disabled={loading}
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
                      onChange={handleChange}
                      error={Boolean(errors.email)}
                      helperText={errors.email}
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      error={Boolean(errors.subject)}
                      helperText={errors.subject}
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      multiline
                      rows={4}
                      label="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      error={Boolean(errors.message)}
                      helperText={
                        <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>{errors.message}</span>
                          <span style={{ color: charCount > 1000 ? 'error.main' : 'text.secondary' }}>
                            {charCount}/1000
                          </span>
                        </Box>
                      }
                      disabled={loading}
                      inputProps={{
                        maxLength: 1000
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={loading}
                      endIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Contact; 