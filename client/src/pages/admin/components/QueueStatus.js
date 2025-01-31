import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Chip
} from '@mui/material';
import axios from 'axios';

const QueueStatus = () => {
  const [queueStats, setQueueStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQueueStats();
    const interval = setInterval(fetchQueueStats, 5000); // Refresh every 5s
    return () => clearInterval(interval);
  }, []);

  const fetchQueueStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/queue/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setQueueStats(response.data);
    } catch (error) {
      console.error('Error fetching queue stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Email Queue Status
      </Typography>
      <List>
        <ListItem>
          <ListItemText 
            primary="Waiting" 
            secondary={queueStats?.waiting || 0}
          />
          <Chip label="Pending" color="warning" size="small" />
        </ListItem>
        <ListItem>
          <ListItemText 
            primary="Active" 
            secondary={queueStats?.active || 0}
          />
          <Chip label="Processing" color="info" size="small" />
        </ListItem>
        <ListItem>
          <ListItemText 
            primary="Completed" 
            secondary={queueStats?.completed || 0}
          />
          <Chip label="Success" color="success" size="small" />
        </ListItem>
        <ListItem>
          <ListItemText 
            primary="Failed" 
            secondary={queueStats?.failed || 0}
          />
          <Chip label="Error" color="error" size="small" />
        </ListItem>
      </List>
    </Paper>
  );
};

export default QueueStatus; 