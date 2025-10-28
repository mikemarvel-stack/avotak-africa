
import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatus = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  }[dbState];

  if (dbState === 1) {
    res.status(200).json({
      server: 'running',
      database: dbStatus,
      message: 'Avotak Africa API is healthy.',
    });
  } else {
    res.status(503).json({
      server: 'running',
      database: dbStatus,
      message: 'API is running, but database connection is not healthy.',
    });
  }
});

export default router;
