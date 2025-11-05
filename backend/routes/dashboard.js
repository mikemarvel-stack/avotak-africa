import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import asyncHandler from 'express-async-handler';

const router = express.Router();

// A protected route for fetching dashboard stats
router.get(
  '/stats',
  protect, // Use the protect middleware here
  asyncHandler(async (req, res) => {
    // This is a placeholder. In the future, you can fetch real stats here.
    const stats = {
      users: 0,
      orders: 0,
      projects: 0,
    };
    res.json(stats);
  })
);

export default router;
