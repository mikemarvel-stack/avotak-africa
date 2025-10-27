import express from 'express';
import { verifyToken } from '../utils/auth.js';
import Order from '../models/Order.js';
import Stat from '../models/Stat.js';

const router = express.Router();

// Orders CRUD
router.get('/orders', verifyToken, async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

router.post('/orders', verifyToken, async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.json(order);
});

router.put('/orders/:id', verifyToken, async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(order);
});

router.delete('/orders/:id', verifyToken, async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Stats CRUD
router.get('/stats', verifyToken, async (req, res) => {
  const stats = await Stat.find();
  res.json(stats);
});

router.post('/stats', verifyToken, async (req, res) => {
  const stat = new Stat(req.body);
  await stat.save();
  res.json(stat);
});

router.put('/stats/:id', verifyToken, async (req, res) => {
  const stat = await Stat.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(stat);
});

router.delete('/stats/:id', verifyToken, async (req, res) => {
  await Stat.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;
