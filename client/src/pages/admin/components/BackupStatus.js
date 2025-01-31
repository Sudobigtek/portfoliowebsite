import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Button,
  Box
} from '@mui/material';
import { Refresh as RefreshIcon, Backup as BackupIcon } from '@mui/icons-material';
import axios from 'axios';
import { useNotification } from '../../../components/NotificationProvider';

const BackupStatus = () => {
  const [backups, setBackups] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showNotification } = useNotification();

  const fetchBackups = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/backups', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBackups(response.data);
    } catch (error) {
      showNotification('Failed to fetch backups', 'error');
    } finally {
      setLoading(false);
    }
  };

  const triggerBackup = async (type) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/backups', 
        { type },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      showNotification(`${type} backup initiated`, 'success');
      fetchBackups();
    } catch (error) {
      showNotification('Failed to initiate backup', 'error');
    }
  };

  useEffect(() => {
    fetchBackups();
  }, []);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Backup Status
        <IconButton size="small" onClick={fetchBackups} disabled={loading}>
          <RefreshIcon />
        </IconButton>
      </Typography>

      <List>
        {backups.map((backup) => (
          <ListItem key={backup._id}>
            <ListItemText
              primary={backup.type}
              secondary={new Date(backup.createdAt).toLocaleString()}
            />
            <ListItemSecondaryAction>
              <Chip
                label={backup.status}
                color={backup.status === 'success' ? 'success' : 'error'}
                size="small"
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
        <Button
          startIcon={<BackupIcon />}
          onClick={() => triggerBackup('database')}
          variant="outlined"
        >
          Backup Database
        </Button>
        <Button
          startIcon={<BackupIcon />}
          onClick={() => triggerBackup('media')}
          variant="outlined"
        >
          Backup Media
        </Button>
      </Box>
    </Paper>
  );
};

export default BackupStatus; 