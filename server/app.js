const { serverAdapter } = require('./services/emailQueueService');

// Add basic auth for queue dashboard
app.use('/admin/queues', 
  basicAuth({
    users: { 
      [process.env.QUEUE_DASHBOARD_USER]: process.env.QUEUE_DASHBOARD_PASS 
    }
  }),
  serverAdapter.getRouter()
); 