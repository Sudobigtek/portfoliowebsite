import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondary,
  Divider,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Image as ImageIcon,
  Mail as MailIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import SEO from '../../components/SEO';
import PortfolioUpload from './components/PortfolioUpload';
import MessageList from './components/MessageList';
import PortfolioEdit from './components/PortfolioEdit';
import axios from 'axios';
import BookingManager from './components/BookingManager';

const Dashboard = () => {
  const [tab, setTab] = useState(0);
  const [uploadOpen, setUploadOpen] = useState(false);
  const navigate = useNavigate();
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetchPortfolioItems();
  }, []);

  const fetchPortfolioItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/portfolio', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPortfolioItems(response.data);
    } catch (error) {
      console.error('Error fetching portfolio items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleEdit = item => {
    setEditItem(item);
  };

  const handleDelete = async id => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/portfolio/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchPortfolioItems();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const showNotification = (message, severity = 'success') => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const tabs = [
    { label: 'Portfolio', value: 0 },
    { label: 'Messages', value: 1 },
    { label: 'Bookings', value: 2 },
  ];

  return (
    <>
      <SEO title="Admin Dashboard" description="Portfolio Management Dashboard" />
      <Navigation />
      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Typography variant="h4" component="h1">
            Dashboard
          </Typography>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tab} onChange={handleTabChange}>
            <Tab icon={<ImageIcon />} label="Portfolio" />
            <Tab icon={<MailIcon />} label="Messages" />
            <Tab icon={<ImageIcon />} label="Bookings" />
          </Tabs>
        </Box>

        {/* Portfolio Management */}
        {tab === 0 && (
          <>
            <Box sx={{ mb: 3 }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setUploadOpen(true)}
              >
                Add New Work
              </Button>
            </Box>

            {loading ? (
              <Typography>Loading portfolio items...</Typography>
            ) : portfolioItems.length === 0 ? (
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                <Typography color="text.secondary">No portfolio items yet</Typography>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {/* Portfolio Items */}
                {portfolioItems.map(item => (
                  <Grid item xs={12} sm={6} md={4} key={item._id}>
                    <Paper
                      sx={{
                        p: 2,
                        '&:hover': {
                          boxShadow: 3,
                        },
                      }}
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        style={{
                          width: '100%',
                          height: 200,
                          objectFit: 'cover',
                          marginBottom: 16,
                        }}
                      />
                      <Typography variant="h6" gutterBottom>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.category}
                      </Typography>
                      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                        <IconButton size="small" onClick={() => handleEdit(item)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(item._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}

        {/* Messages */}
        {tab === 1 && <MessageList />}

        {/* Bookings */}
        {tab === 2 && <BookingManager />}

        {/* Edit Dialog */}
        {editItem && (
          <PortfolioEdit
            open={Boolean(editItem)}
            onClose={() => setEditItem(null)}
            item={editItem}
            onEditComplete={fetchPortfolioItems}
          />
        )}

        {/* Upload Dialog */}
        <PortfolioUpload
          open={uploadOpen}
          onClose={() => setUploadOpen(false)}
          onUploadComplete={fetchPortfolioItems}
        />

        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
        >
          <Alert onClose={handleCloseNotification} severity={notification.severity}>
            {notification.message}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default Dashboard;
