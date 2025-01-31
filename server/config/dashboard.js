const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const { ExpressAdapter } = require('@bull-board/express');

const setupDashboard = (app, queues) => {
  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/admin/queues');

  const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
    queues: queues.map(queue => new BullAdapter(queue)),
    serverAdapter
  });

  // Basic auth middleware for dashboard
  const basicAuth = (req, res, next) => {
    const auth = req.headers.authorization;
    
    if (!auth || auth.indexOf('Basic ') === -1) {
      res.setHeader('WWW-Authenticate', 'Basic realm="Queue Dashboard"');
      return res.status(401).json({ message: 'Authentication required' });
    }

    const base64Credentials = auth.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    if (username === process.env.QUEUE_DASHBOARD_USER && 
        password === process.env.QUEUE_DASHBOARD_PASS) {
      next();
    } else {
      res.setHeader('WWW-Authenticate', 'Basic realm="Queue Dashboard"');
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  };

  // Mount dashboard with auth
  app.use('/admin/queues', basicAuth, serverAdapter.getRouter());

  return {
    addQueue,
    removeQueue,
    setQueues,
    replaceQueues
  };
};

module.exports = setupDashboard; 