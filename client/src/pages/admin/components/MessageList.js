import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Chip,
  Box,
  Collapse,
  Divider,
  Button
} from '@mui/material';
import {
  ExpandMore,
  ExpandLess,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Email as EmailIcon
} from '@mui/icons-material';
import axios from 'axios';

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/contact', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`/api/contact/${id}`, 
        { status },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      fetchMessages();
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/contact/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchMessages();
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }
  };

  const handleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'error';
      case 'read':
        return 'primary';
      case 'replied':
        return 'success';
      default:
        return 'default';
    }
  };

  if (loading) {
    return <Typography>Loading messages...</Typography>;
  }

  if (messages.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="text.secondary">No messages yet</Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={0}>
      <List>
        {messages.map((message, index) => (
          <React.Fragment key={message._id}>
            <ListItem
              alignItems="flex-start"
              secondaryAction={
                <Box>
                  <IconButton
                    size="small"
                    onClick={() => handleStatusChange(message._id, 'read')}
                    color={message.status === 'read' ? 'primary' : 'default'}
                  >
                    <CheckCircleIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleStatusChange(message._id, 'replied')}
                    color={message.status === 'replied' ? 'success' : 'default'}
                  >
                    <EmailIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(message._id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleExpand(message._id)}
                  >
                    {expandedId === message._id ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </Box>
              }
            >
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle1">
                      {message.name}
                    </Typography>
                    <Chip
                      label={message.status}
                      size="small"
                      color={getStatusColor(message.status)}
                      sx={{ ml: 1 }}
                    />
                  </Box>
                }
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      {message.subject}
                    </Typography>
                    <Typography variant="caption" display="block" color="text.secondary">
                      {new Date(message.date).toLocaleString()}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            <Collapse in={expandedId === message._id} timeout="auto" unmountOnExit>
              <Box sx={{ p: 3, bgcolor: 'grey.50' }}>
                <Typography variant="body2" paragraph>
                  {message.message}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Contact: {message.email}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    href={`mailto:${message.email}`}
                    startIcon={<EmailIcon />}
                  >
                    Reply
                  </Button>
                </Box>
              </Box>
            </Collapse>
            {index < messages.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default MessageList; 