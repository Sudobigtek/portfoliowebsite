import React, { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { Check, Close } from '@mui/icons-material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const passwordRequirements = [
    { label: 'At least 8 characters long', test: (p) => p.length >= 8 },
    { label: 'Contains uppercase letter', test: (p) => /[A-Z]/.test(p) },
    { label: 'Contains lowercase letter', test: (p) => /[a-z]/.test(p) },
    { label: 'Contains number', test: (p) => /\d/.test(p) },
    { label: 'Contains special character', test: (p) => /[!@#$%^&*(),.?":{}|<>]/.test(p) }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setStatus('mismatch');
      return;
    }

    // Check all password requirements
    const meetsAllRequirements = passwordRequirements.every(req => req.test(password));
    if (!meetsAllRequirements) {
      setStatus('invalid');
      return;
    }

    setLoading(true);
    setStatus('');

    try {
      await axios.put(`http://localhost:5000/api/auth/reset-password/${token}`, {
        password
      });
      setStatus('success');
      setTimeout(() => {
        navigate('/admin/login');
      }, 3000);
    } catch (error) {
      setStatus(error.response?.data?.message === 'Too many password reset attempts' ? 'rateLimit' : 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Set New Password
        </Typography>

        {status === 'success' && (
          <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
            Password updated successfully. Redirecting to login...
          </Alert>
        )}

        {status === 'error' && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            Invalid or expired reset token.
          </Alert>
        )}

        {status === 'mismatch' && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            Passwords do not match.
          </Alert>
        )}

        {status === 'rateLimit' && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            Too many password reset attempts. Please try again later.
          </Alert>
        )}

        {status === 'invalid' && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            Password does not meet the requirements.
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
            Password Requirements:
          </Typography>
          <List dense>
            {passwordRequirements.map((req, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  {req.test(password) ? (
                    <Check color="success" />
                  ) : (
                    <Close color="error" />
                  )}
                </ListItemIcon>
                <ListItemText primary={req.label} />
              </ListItem>
            ))}
          </List>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            Reset Password
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ResetPassword; 